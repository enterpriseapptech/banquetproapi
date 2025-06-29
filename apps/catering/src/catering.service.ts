import { ConflictException, Inject, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { $Enums, Prisma } from '@prisma/catering';
import { CreateCateringDto, CateringDto, ManyCateringDto, UpdateCateringDto, ServiceStatus } from '@shared/contracts/catering';
import { DatabaseService } from '../database/database.service';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { NOTIFICATION_CLIENT, USER_CLIENT } from '@shared/contracts';
import { USERPATTERN, UserDto } from '@shared/contracts/users';
import { NOTIFICATIONPATTERN } from '@shared/contracts/notifications';

@Injectable()
export class CateringService {
    constructor(
        @Inject(NOTIFICATION_CLIENT) private readonly notificationClient: ClientProxy,
        @Inject(USER_CLIENT) private readonly userClient: ClientProxy,
        private readonly databaseService: DatabaseService
    ) { }

    async create(createCateringDto: CreateCateringDto): Promise<CateringDto> {

        const newCateringInput: Prisma.CateringCreateInput = {
            serviceProviderId: createCateringDto.serviceProviderId,
            name: createCateringDto.name,
            eventTypes: createCateringDto.eventTypes,
            tagLine: createCateringDto.tagLine,
            depositAmount: createCateringDto.depositAmount,
            startPrice: createCateringDto.startPrice,
            minCapacity: createCateringDto.minCapacity,
            maxCapacity: createCateringDto.maxCapacity,
            description: createCateringDto.description,
            dishTypes: createCateringDto.dishTypes,
            cuisine: createCateringDto.cuisine,
            images: createCateringDto.images,
            termsOfUse: createCateringDto.termsOfUse,
            cancellationPolicy: createCateringDto.cancellationPolicy,
            streetAddress: createCateringDto.streetAddress,
            streetAddress2: createCateringDto.streetAddress2,
            city: createCateringDto.city,
            postal: createCateringDto.postal,
            location: createCateringDto.location,
            contact: createCateringDto.contact,
            status: $Enums.ServiceStatus.ACTIVE
        }

        // validate service provider
        const serviceProvider = await firstValueFrom(this.userClient.send<UserDto, string>(USERPATTERN.FINDBYID, newCateringInput.serviceProviderId));

        if (!serviceProvider) {
            throw new NotFoundException("could not verify service provider account")
        }

        if (serviceProvider?.status !== "ACTIVE") {
            throw new UnauthorizedException("service provider account is not active")
        }

        try {
            // Start a transaction - for an all or fail process
            const newcatering = await this.databaseService.$transaction(async (prisma) => {
                const catering = await prisma.catering.create({ data: newCateringInput });
                return catering
            });

            //  emit a email notification - notification event
            this.notificationClient.emit(NOTIFICATIONPATTERN.SEND, {
                type: 'EMAIL',
                recipientId: serviceProvider,
                data: {
                    subject: 'New Catering Service!',
                    message: `you successfully added a new catering service`,
                    recipientEmail: serviceProvider.email,
                },
            });
            const cateringDto: CateringDto = {
                ...newcatering,
                rating: newcatering.rating as unknown as number,
                status: newcatering.status as unknown as ServiceStatus,
            };
            return cateringDto;
        } catch (error) {
            throw new InternalServerErrorException(error, {
                cause: new Error(),
                description: 'new catering service creation failed, please try again'
            });
        }






    }

    async findAll(limit: number, offset: number, serviceProvider: string, city: string, state: string, country: string): Promise<ManyCateringDto> {

        if (serviceProvider) {
            const caterings = await this.databaseService.catering.findMany({
                where: { serviceProviderId: serviceProvider, deletedAt: null }, // Filter by serviceProviderId
                take: limit,
                skip: offset,
            });
            const count = await this.databaseService.catering.count({
                where: { serviceProviderId: serviceProvider, deletedAt: null }
            });
            return {
                count,
                data: caterings.map(eventCenter => this.mapToCateringDto(eventCenter))  
            }
        }

        const whereClause: any = {};
        whereClause.deletedAt = null
        if (state) whereClause.state = { equals: state, mode: "insensitive" };
        if (country) whereClause.country = { equals: country, mode: "insensitive" };
        if (city) whereClause.city = { equals: city, mode: "insensitive" };

        if (Object.keys(whereClause).length > 0) {
            const caterings = await this.databaseService.catering.findMany({
                where: whereClause,
                take: limit,
                skip: offset,
            });

            const count = await this.databaseService.catering.count({ where: whereClause });

            return { count, data: caterings.map(catering => this.mapToCateringDto(catering)) };
        }

        const caterings = await this.databaseService.catering.findMany({
            take: limit,
            skip: offset,
        })
        const count = await this.databaseService.catering.count()
        return {
            count,
            data: caterings.map(catering => this.mapToCateringDto(catering))  
        }




    }

    async findOne(id: string): Promise<CateringDto> {

        const catering = await this.databaseService.catering.findUnique({
            where: {
                id: id,
                deletedAt: null
            }
        });
        if (!catering) {
            throw new NotFoundException("Event center not found or has been deleted")
        }
        const cateringDto: CateringDto = {
            ...catering,
            rating: catering.rating as unknown as number,
            status: catering.status as unknown as ServiceStatus,
        };
        return cateringDto;
    }

    async update(id: string, updateEventcenterDto: UpdateCateringDto): Promise<CateringDto> {
        try {
            const updateEventCenterInput: Prisma.CateringUpdateInput = {
                ...updateEventcenterDto,
                status: updateEventcenterDto.status ? updateEventcenterDto.status as $Enums.ServiceStatus : undefined
            };
            const catering = await this.databaseService.catering.update({
                where: { id },
                data: updateEventCenterInput
            });
            const cateringDto: CateringDto = {
                ...catering,
                rating: catering.rating as unknown as number,
                status: catering.status as unknown as ServiceStatus,
            };
            return cateringDto;
        } catch (error) {
            throw new ConflictException(error);
        }
    }

    async remove(id: string, updaterId: string): Promise<CateringDto> {
        const catering = await this.databaseService.catering.update({
            where: { id },
            data: {
                deletedAt: new Date(),
                deletedBy: updaterId
            }
        });

        const cateringDto: CateringDto = {
                    ...catering,
                    rating: catering.rating as unknown as number,
                    status: catering.status as unknown as ServiceStatus,
                };
        return cateringDto;
    }


    /**
     * 
     * Maps a raw event center from the database to EventCenterDto.
     */
    private mapToCateringDto(catering: any): CateringDto {
        return {
            ...catering,
            rating: catering.rating as unknown as number,
            status: catering.status as unknown as ServiceStatus,
        };
    }
}