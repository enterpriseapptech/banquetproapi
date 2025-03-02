import { ConflictException, Inject, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { $Enums, Prisma } from '@prisma/eventcenters';
import { CreateEventCenterDto, NOTIFICATIONPATTERN, EventCenterDto, UserDto, USERPATTERN, ManyEventCentersDto, UpdateEventCenterDto } from '@shared/contracts';
import { DatabaseService } from '../database/database.service';
import { NOTIFICATION_CLIENT, USER_CLIENT } from './constants';
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

        // check sitting capacity to flag event center
        // check location 

        const newEventCenterInput: Prisma.EventCenterCreateInput = {
            serviceProviderId: createEventCenterDto.serviceProviderId,
            depositAmount: createEventCenterDto.depositAmount,
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
            state: createEventCenterDto.state,
            country: createEventCenterDto.country,
            postal: createEventCenterDto.postal,
            status: createEventCenterDto.status as $Enums.ServiceStatus
        }

        // validate service provider
        const serviceProvider = await firstValueFrom(this.userClient.send<UserDto, string>(USERPATTERN.FINDUSERBYID, newEventCenterInput.serviceProviderId));

        if (!serviceProvider) {
            throw new NotFoundException("could not verify service provider account")
        }

        if (serviceProvider?.status !== "ACTIVE") {
            throw new UnauthorizedException("service provider account is not active")
        }

        try {
            // Start a transaction - for an all or fail process
            const neweventCenter = await this.databaseService.$transaction(async (prisma) => {
                const eventCenter = await prisma.eventCenter.create({ data: newEventCenterInput });
                return eventCenter
            });

            //  emit a email notification - notification event
            this.notificationClient.emit(NOTIFICATIONPATTERN.SENDNOTIFICATION, {
                type: 'EMAIL',
                recipientId: serviceProvider,
                data: {
                    subject: 'New Event Venue!',
                    message: `you successfully added a new event venue`,
                    recipientEmail: serviceProvider.email,
                },
            });

            return neweventCenter;
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException(error, {
                cause: new Error(),
                description: 'new event Center creation failed, please try again'
            });
        }
        





    }

    async findAll(limit: number, offset: number, serviceProvider: string, city: string, state: string, country: string): Promise<ManyEventCentersDto> {
        
        if (serviceProvider) {
            const eventCenters = await this.databaseService.eventCenter.findMany({
                where: { serviceProviderId: serviceProvider, deletedAt: null }, // Filter by serviceProviderId
                take: limit,
                skip: offset,
            });
            const count = await this.databaseService.eventCenter.count({
                where: { serviceProviderId: serviceProvider, deletedAt: null }
            });
            return {
                count,
                data: eventCenters
            }
        }
        
        const whereClause: any = {};
        whereClause.deletedAt = null
        if (state) whereClause.state = { equals: state, mode: "insensitive" };
        if (country) whereClause.country = { equals: country, mode: "insensitive" };
        if (city) whereClause.city = { equals: city, mode: "insensitive" };

        if (Object.keys(whereClause).length > 0) {
            const eventCenters = await this.databaseService.eventCenter.findMany({
                where: whereClause,
                take: limit,
                skip: offset,
            });

            const count = await this.databaseService.eventCenter.count({ where: whereClause });

            return { count, data: eventCenters };
        }

        const eventCenters = await this.databaseService.eventCenter.findMany({
            take: limit,
            skip: offset,
        })
        const count = await this.databaseService.eventCenter.count()
        return {
            count,
            data: eventCenters
        }
        
        


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
        return eventCenter;
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

            return eventCenter;
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
        return eventCenter;
    }

    // async searchServiceProviders(searchParams: SearchServiceProviderDto): Promise<EventCenterDto[]> {
    //     const { state, country, name, amenities, limit = 10, offset = 0 } = searchParams;

    //     const filters: any = {};

    //     if (state) {
    //         filters.state = { contains: state, mode: 'insensitive' };
    //     }

    //     if (country) {
    //         filters.country = { contains: country, mode: 'insensitive' };
    //     }

    //     if (name) {
    //         filters.name = { contains: name, mode: 'insensitive' };
    //     }

    //     if (amenities) {
    //         const amenitiesArray = amenities.split(',').map((a) => a.trim());
    //         filters.amenities = { hasSome: amenitiesArray }; // Assumes amenities is stored as an array
    //     }

    //     const users = await this.databaseService.user.findMany({
    //         where: filters,
    //         take: limit,
    //         skip: offset,
    //     });

    //     return users;
    // }
}

// @Injectable()
// export class EventcentersBookingService {
//     constructor(
//         @Inject(NOTIFICATION_CLIENT) private readonly notificationClient: ClientProxy,
//         private readonly databaseService: DatabaseService,
//         private readonly eventcentersService: EventcentersService
//     ) { }

//     async create(createEventCenterBookingDto: CreateEventCenterBookingDto): Promise<EventCenterBookingDto> {

//         // find event center 
//         const eventcenter = await this.eventcentersService.findOne(createEventCenterBookingDto.eventcenterId)
//         if (!eventcenter) {
//             throw new NotFoundException("This is not a valid event center and can not be booked") 
//         }

//         const newEventCenterBookingInput: Prisma.EventCenterBookingCreateInput = {
//             eventcenter: { connect: { id: eventcenter.id } },
//             bookingId: createEventCenterBookingDto.bookingId,
//             eventName: createEventCenterBookingDto.eventName,
//             eventTheme: createEventCenterBookingDto.eventTheme,
//             eventType: createEventCenterBookingDto.eventType,
//             description: createEventCenterBookingDto.description,
//             noOfGuest: createEventCenterBookingDto.noOfGuest,
//             specialRequirements: createEventCenterBookingDto.specialRequirements as $Enums.SpecialRequirement[],    
//         }

//         try {
//             // Start a transaction - for an all or fail process
//             const neweventCenterBooking = await this.databaseService.$transaction(async (prisma) => {
//                 const eventCenterBooking = await prisma.eventCenterBooking.create({ data: newEventCenterBookingInput });
//                 return eventCenterBooking
//             });

//             return neweventCenterBooking;
//         } catch (error) {
//             console.log(error)
//             throw new InternalServerErrorException(error, {
//                 cause: new Error(),
//                 description: 'new event Center creation failed, please try again'
//             });
//         }

//     }

//     async findAll(limit: number, offset: number, eventcenterId: string): Promise<ManyEventCenterBookingsDto> {

//         if (eventcenterId) {
//             const eventCenters = await this.databaseService.eventCenterBooking.findMany({
//                 where: { eventcenterId: eventcenterId, deletedAt: null }, // Filter by serviceProviderId
//                 take: limit,
//                 skip: offset,
//             });
//             const count = await this.databaseService.eventCenterBooking.count({
//                 where: { eventcenterId: eventcenterId, deletedAt: null }
//             });
//             return {
//                 count,
//                 data: eventCenters
//             }
//         }

        
//         const eventCenters = await this.databaseService.eventCenterBooking.findMany({
//             take: limit,
//             skip: offset,
//         })
//         const count = await this.databaseService.eventCenterBooking.count()
//         return {
//             count,
//             data: eventCenters
//         }
//     }

//     async findOne(id: string): Promise<EventCenterBookingDto> {

//         const eventCenterBooking = await this.databaseService.eventCenterBooking.findUnique({
//             where: {
//                 id: id,
//                 deletedAt: null
//             }
//         });
//         if (!eventCenterBooking) {
//             throw new NotFoundException("Event center not found or has been deleted")
//         }
//         return eventCenterBooking;
//     }

//     async update(id: string, updateEventcenterDto: UpdateEventBookingDto): Promise<EventCenterBookingDto> {
//         try {
//             const updateEventCenterInput: Prisma.EventCenterBookingUpdateInput = {
//                 ...updateEventcenterDto,
//                 specialRequirements: updateEventcenterDto.specialRequirements ? { set: updateEventcenterDto.specialRequirements as $Enums.SpecialRequirement[] } : undefined,
//             };
//             const eventCenterBooking = await this.databaseService.eventCenterBooking.update({
//                 where: { id },
//                 data: updateEventCenterInput
//             });

//             return eventCenterBooking;
//         } catch (error) {
//             throw new ConflictException(error);
//         }
//     }

//     async remove(id: string, updaterId: string): Promise<EventCenterBookingDto> {
//         const eventCenterBooking = await this.databaseService.eventCenterBooking.update({
//             where: { id },
//             data: {
//                 deletedAt: new Date(),
//                 deletedBy: updaterId
//             }
//         });
//         return eventCenterBooking;
//     }
// }