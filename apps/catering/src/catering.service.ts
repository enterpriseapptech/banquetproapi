import { ConflictException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { $Enums, Prisma } from '../prisma/@prisma/catering';
import { CreateCateringDto, CateringDto, ManyCateringDto, UpdateCateringDto, ServiceStatus, CreateServiceSubscriptionDto, ServiceSubscriptionDto, SubscriptionStatus, UpdateServiceSubscriptionDto } from '@shared/contracts/catering';
import { DatabaseService } from '../database/database.service';
import { ClientProxy } from '@nestjs/microservices';
import { NOTIFICATION_CLIENT, USER_CLIENT } from '@shared/contracts';
import { NOTIFICATIONPATTERN } from '@shared/contracts/notifications';

@Injectable()
export class CateringService {
    constructor(
        @Inject(NOTIFICATION_CLIENT) private readonly notificationClient: ClientProxy,
        @Inject(USER_CLIENT) private readonly userClient: ClientProxy,
        private readonly databaseService: DatabaseService
    ) { }

    async create(createCateringDto: CreateCateringDto): Promise<CateringDto> {



        try {
            // Start a transaction - for an all or fail process
            const newcatering = await this.databaseService.$transaction(async (prisma) => {
                const newCateringInput: Prisma.CateringCreateInput = {
                    serviceProviderId: createCateringDto.serviceProviderId,
                    name: createCateringDto.name,
                    eventTypes: createCateringDto.eventTypes,
                    tagLine: createCateringDto.tagLine,
                    depositPercentage: createCateringDto.depositPercentage,
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
                const catering = await prisma.catering.create({ data: newCateringInput });
                return catering
            });

            //  emit a email notification - notification event
            this.notificationClient.emit(NOTIFICATIONPATTERN.SEND, {
                type: 'EMAIL',
                recipientId: createCateringDto.serviceProviderId,
                data: {
                    subject: 'New Catering Service!',
                    message: `you successfully added a new catering service`,
                    recipientEmail: createCateringDto.serviceProviderEmail,
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


    async findAllWithUnique(ids: string[]): Promise<CateringDto[]> {
        console.log({ids})
        const caterings = await this.databaseService.catering.findMany({
            where: {
                id: { in: ids },
                deletedAt: null
            }
        });
    return caterings.map(catering => this.mapToCateringDto(catering))
        
    }


    async findAll(
        limit?: number,
        offset?: number,
        serviceProvider?: string,
        city?: string,
        state?: string,
        country?: string,
        search?: string)
        : Promise<ManyCateringDto> {

        if (serviceProvider) {
            const caterings = await this.databaseService.catering.findMany({
                where: { serviceProviderId: serviceProvider, deletedAt: null }, // Filter by serviceProviderId
                ...(limit ? { take: limit, skip: offset ? offset : 0 } : {})
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
        if (search) {
            whereClause.OR = [
                { name: { contains: search, mode: "insensitive" } },
                { eventTypes: { has: search } },
                { tagLine: { contains: search, mode: "insensitive" } },
                { description: { contains: search, mode: "insensitive" } },
            ];
        }
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
            throw new NotFoundException(" Catering Service not found or has been deleted")
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

@Injectable()
export class CateringSubscriptionService {
    constructor(private readonly databaseService: DatabaseService) {}

    async create(dto: CreateServiceSubscriptionDto): Promise<ServiceSubscriptionDto> {
        const record = await this.databaseService.serviceSubscription.create({
            data: {
                serviceId: dto.serviceId,
                subscriptionPlanId: dto.subscriptionPlanId,
                invoiceId: dto.invoiceId,
                status: (dto.status ?? SubscriptionStatus.ACTIVE) as any,
                expiryDate: dto.expiryDate,
            },
        });
        return { ...record, status: record.status as unknown as SubscriptionStatus };
    }

    async findAll(limit: number, offset: number, serviceId?: string): Promise<{ count: number; docs: ServiceSubscriptionDto[] }> {
        const where: any = { deletedAt: null };
        if (serviceId) where.serviceId = serviceId;
        const [count, docs] = await Promise.all([
            this.databaseService.serviceSubscription.count({ where }),
            this.databaseService.serviceSubscription.findMany({ where, take: Number(limit), skip: Number(offset) }),
        ]);
        return { count, docs: docs.map(r => ({ ...r, status: r.status as unknown as SubscriptionStatus })) };
    }

    async findOne(id: string): Promise<ServiceSubscriptionDto> {
        const record = await this.databaseService.serviceSubscription.findUnique({ where: { id } });
        if (!record) throw new NotFoundException('Catering subscription not found');
        return { ...record, status: record.status as unknown as SubscriptionStatus };
    }

    async update(id: string, dto: UpdateServiceSubscriptionDto): Promise<ServiceSubscriptionDto> {
        const record = await this.databaseService.serviceSubscription.update({
            where: { id },
            data: {
                ...(dto.status && { status: dto.status as any }),
                ...(dto.expiryDate && { expiryDate: dto.expiryDate }),
                ...(dto.deletedAt && { deletedAt: dto.deletedAt }),
                ...(dto.deletedBy && { deletedBy: dto.deletedBy }),
            },
        });
        return { ...record, status: record.status as unknown as SubscriptionStatus };
    }

    async activateByInvoiceId(invoiceId: string): Promise<ServiceSubscriptionDto> {
        const record = await this.databaseService.serviceSubscription.update({
            where: { invoiceId },
            data: { status: SubscriptionStatus.ACTIVE as any },
        });
        return { ...record, status: record.status as unknown as SubscriptionStatus };
    }

    async remove(id: string, deletedBy: string): Promise<ServiceSubscriptionDto> {
        const record = await this.databaseService.serviceSubscription.update({
            where: { id },
            data: { deletedAt: new Date(), deletedBy },
        });
        return { ...record, status: record.status as unknown as SubscriptionStatus };
    }
}