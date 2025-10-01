/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConflictException, Inject, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { $Enums, Prisma } from '../prisma/@prisma/eventcenters';
import { CreateEventCenterDto, EventCenterDto, ManyEventCentersDto, ServiceStatus, UpdateEventCenterDto } from '@shared/contracts/eventcenters';
import { NOTIFICATIONPATTERN } from '@shared/contracts/notifications';
import { UserDto, USERPATTERN } from '@shared/contracts/users';
import { DatabaseService } from '../database/database.service';
import { NOTIFICATION_CLIENT, USER_CLIENT } from '@shared/contracts';
import { ClientProxy } from '@nestjs/microservices';
import {firstValueFrom } from 'rxjs';

@Injectable()
export class EventcentersService {
    constructor(
        @Inject(NOTIFICATION_CLIENT) private readonly notificationClient: ClientProxy,
        @Inject(USER_CLIENT) private readonly userClient: ClientProxy,
        private readonly databaseService: DatabaseService
    ) { }

    async create(createEventCenterDto: CreateEventCenterDto): Promise<EventCenterDto> {

        const newEventCenterInput: Prisma.EventCenterCreateInput = {
            serviceProviderId: createEventCenterDto.serviceProviderId,
            name: createEventCenterDto.name,
            eventTypes: createEventCenterDto.eventTypes,
            discountPercentage: createEventCenterDto.discountPercentage || 0,
            depositPercentage: createEventCenterDto.depositPercentage,
            description: createEventCenterDto.description,
            pricingPerSlot: createEventCenterDto.pricingPerSlot,
            sittingCapacity: createEventCenterDto.sittingCapacity,
            venueLayout: createEventCenterDto.venueLayout,
            amenities: createEventCenterDto.amenities as $Enums.Amenities[],
            images: createEventCenterDto.images,
            termsOfUse: createEventCenterDto.termsOfUse,
            cancellationPolicy: createEventCenterDto.cancellationPolicy,
            streetAddress: createEventCenterDto.streetAddress,
            streetAddress2: createEventCenterDto.streetAddress2,
            city: createEventCenterDto.city,
            location: createEventCenterDto.location,
            postal: createEventCenterDto.postal,
            contact: createEventCenterDto.contact,
            status: createEventCenterDto.status as $Enums.ServiceStatus
        }
        // validate service provider
        const serviceProvider = await firstValueFrom(this.userClient.send<UserDto, string>(USERPATTERN.FINDBYID, newEventCenterInput.serviceProviderId));
        if (!serviceProvider) {
            throw new NotFoundException("could not verify service provider account")
        }

        if (serviceProvider?.status !== "ACTIVE") {
            throw new UnauthorizedException("service provider account is not active")
        }

        try {
            // Start a transaction - for an all or fail process
            const neweventCenter = await  this.databaseService.eventCenter.create({ data: newEventCenterInput });
            console.log({neweventCenter})

            //  emit a email notification - notification event
            this.notificationClient.emit(NOTIFICATIONPATTERN.SEND, {
                type: 'EMAIL',
                recipientId: serviceProvider,
                data: {
                    subject: 'New Event Venue!',
                    message: `you successfully added a new event venue`,
                    recipientEmail: serviceProvider.email,
                },
            });
            const eventCenterDto: EventCenterDto = {
                ...neweventCenter,
                pricingPerSlot: Number(neweventCenter.pricingPerSlot),
                rating: neweventCenter.rating as unknown as number,
                status: neweventCenter.status as unknown as ServiceStatus,
            };
            return eventCenterDto;
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException(error, {
                cause: new Error(),
                description: 'new event Center creation failed, please try again'
            });
        }
        
    }

    async findAll(
        limit?: number,
        offset?: number,
        serviceProvider?: string,
        city?: string,
        search?: string,
    ): Promise<ManyEventCentersDto> {
        if (serviceProvider) {
            const eventCenters = await this.databaseService.eventCenter.findMany({
                where: { serviceProviderId: serviceProvider, deletedAt: null },
                ...(limit ? { take: limit, skip: offset ? offset : 0 } : {})
            });

            const count = await this.databaseService.eventCenter.count({
                where: { serviceProviderId: serviceProvider, deletedAt: null },
            });

            return {
                count,
                data: eventCenters.map(eventCenter => this.mapToEventCenterDto(eventCenter))
            };
        }

        // find state or country

        const whereClause: any = { deletedAt: null };
        if (city) whereClause.city = { equals: city, mode: "insensitive" };
        const amenityValues = Object.values($Enums.Amenities);
        // Only build the condition if it’s a valid enum
        const amenitiesFilter = amenityValues.includes(search.toUpperCase() as any)
        ? { amenities: { has: search as any } }
        : undefined;
        if (search) {
            whereClause.OR = [
                { name: { contains: search, mode: "insensitive" } },
                { eventTypes: { has: search} },
                { description: { contains: search, mode: "insensitive" } },
                { venueLayout: { contains: search, mode: "insensitive" } },
                amenitiesFilter,
                { city: { contains: search, mode: "insensitive" } },
            ].filter(Boolean)
        }
        if (Object.keys(whereClause).length > 0) {
            const eventCenters = await this.databaseService.eventCenter.findMany({
                where: whereClause,
                take: limit,
                skip: offset,
            });

            const count = await this.databaseService.eventCenter.count({ where: whereClause });

            return {
                count,
                data: eventCenters.map(eventCenter => this.mapToEventCenterDto(eventCenter))
            };
        }

        const eventCenters = await this.databaseService.eventCenter.findMany({
            take: limit,
            skip: offset,
        });

        const count = await this.databaseService.eventCenter.count();

        return {
            count,
            data: eventCenters.map(eventCenter => this.mapToEventCenterDto(eventCenter))
        };
    }

    async findOne(id: string): Promise<EventCenterDto> {
       
        const eventCenter = await this.databaseService.eventCenter.findUnique({
            where: {
                id: id,
                deletedAt: null
            }
        });
        if (!eventCenter) {
            throw new NotFoundException("Event center not found or has been deleted")
        }
        const eventCenterDto: EventCenterDto = {
            ...eventCenter,
            pricingPerSlot: Number(eventCenter.pricingPerSlot),
            rating: eventCenter.rating as unknown as number,
            status: eventCenter.status as unknown as ServiceStatus,
        };
        return eventCenterDto;
    }

    async update(id: string, updateEventcenterDto: UpdateEventCenterDto): Promise<EventCenterDto> {
        try {
            const updateEventCenterInput: Prisma.EventCenterUpdateInput = {
                ...updateEventcenterDto,
                amenities: updateEventcenterDto.amenities ? { set: updateEventcenterDto.amenities as $Enums.Amenities[] } : undefined,
                status: updateEventcenterDto.status ? updateEventcenterDto.status as $Enums.ServiceStatus  : undefined
            };
            const eventCenter = await this.databaseService.eventCenter.update({
                where: { id },
                data: updateEventCenterInput
            });
            const eventCenterDto: EventCenterDto = {
                ...eventCenter,
                pricingPerSlot: Number(eventCenter.pricingPerSlot),
                rating: eventCenter.rating as unknown as number,
                status: eventCenter.status as unknown as ServiceStatus,
            };
            return eventCenterDto;
        } catch (error) {
            throw new ConflictException(error);
        }
    }

    async remove(id: string, updaterId: string): Promise<EventCenterDto> {
        const eventCenter = await this.databaseService.eventCenter.update({
            where: { id },
            data: {
                deletedAt: new Date(),
                deletedBy: updaterId
            }
        });
        const eventCenterDto: EventCenterDto = {
            ...eventCenter,
            pricingPerSlot: Number(eventCenter.pricingPerSlot),
            rating: eventCenter.rating as unknown as number,
            status: eventCenter.status as unknown as ServiceStatus,
        };
        return eventCenterDto;
    }

 
    async deleteall(id: string, updaterId: string): Promise<any> {
        const eventCenter = await this.databaseService.eventCenter.deleteMany();
       
        return eventCenter;
    }
    /**
     * 
     * Maps a raw event center from the database to EventCenterDto.
     */
    private mapToEventCenterDto(eventCenter: any): EventCenterDto {
        return {
            ...eventCenter,
            rating: eventCenter.rating as unknown as number,
            status: eventCenter.status as unknown as ServiceStatus,
        };
    }
}
