import { ConflictException, Inject, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { $Enums, Prisma } from '../prisma/@prisma/catering';
import { CreateCateringDto, CateringDto, ManyCateringDto, UpdateCateringDto, ServiceStatus } from '@shared/contracts/catering';
import { DatabaseService } from '../database/database.service';
import { ClientProxy } from '@nestjs/microservices';
import { NOTIFICATION_CLIENT } from '@shared/contracts';
import { UpdateServiceSubscriptionDto, NOTIFICATIONPATTERN } from '@shared/contracts/shared';

@Injectable()
export class CateringService {
    private readonly logger = new Logger(CateringService.name);
    constructor(
        @Inject(NOTIFICATION_CLIENT) private readonly notificationClient: ClientProxy,
        private readonly databaseService: DatabaseService,
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
                data: caterings.map(catering => this.mapToCateringDto(catering))
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
                orderBy: [
                    { subscriptionStatus: 'desc' }, // subscribed first
                    { subscriptionExpiry: 'desc' }, // newest active subs first
                    { createdAt: 'desc' } // fallback
                ]
            });

            const count = await this.databaseService.catering.count({ where: whereClause });

            return { count, data: caterings.map(catering => this.mapToCateringDto(catering)) };
        }

        const caterings = await this.databaseService.catering.findMany({
            take: limit,
            skip: offset,
            orderBy: [
                { subscriptionStatus: 'desc' }, // subscribed first
                { subscriptionExpiry: 'desc' }, // newest active subs first
                { createdAt: 'desc' } // fallback
            ]
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
            throw new NotFoundException("Catering Service not found or has been deleted")
        }
        const cateringDto: CateringDto = {
            ...catering,
            rating: catering.rating as unknown as number,
            status: catering.status as unknown as ServiceStatus,
        };
        return cateringDto;
    }

    async update(id: string, updatecateringDto: UpdateCateringDto): Promise<CateringDto> {
        try {
            const updatecateringInput: Prisma.CateringUpdateInput = {
                ...updatecateringDto,
                status: updatecateringDto.status ? updatecateringDto.status as $Enums.ServiceStatus : undefined
            };
            const catering = await this.databaseService.catering.update({
                where: { id },
                data: updatecateringInput
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


    async updateSubscriptionStatus(dto: UpdateServiceSubscriptionDto): Promise<{shouldRefund: boolean}> {
        const { serviceId, subscriptionStatus, subscriptionPlanId, timeframe } = dto;

        let subscriptionExpiry: Date | undefined;

        try {
            if (subscriptionPlanId && timeframe) {
                const catering = await this.databaseService.catering.findUnique({
                    where: { id: serviceId },
                    select: { subscriptionExpiry: true },
            });

            const now = Date.now();
            const timeframeMs = timeframe * 24 * 60 * 60 * 1000;

            const baseTime = catering?.subscriptionExpiry
                ? Math.max(catering.subscriptionExpiry.getTime(), now)
                : now;

            subscriptionExpiry = new Date(baseTime + timeframeMs);
            }

            await this.databaseService.catering.update({
                where: { id: serviceId },
                data: {
                    subscriptionStatus: subscriptionStatus as $Enums.SubscriptionStatus,
                    subscriptionPlanId,
                    ...(subscriptionExpiry && { subscriptionExpiry }),
                },
            });

            this.logger.log(`Subscription updated successfully | serviceId=${serviceId}`);
            return {shouldRefund: false}
        } catch (error: any) {
            this.logger.error({
                message: 'Event center Subscription activation update failed',
                serviceId,
                error: error?.message,
            });
            return {shouldRefund: true}
        }
    }

    // async upsertRefundPolicy(cateringId: string, dto: {
    //     allowRefunds?: boolean;
    //     refundWindowDays?: number;
    //     tiers?: { minDaysBeforeEvent: number; deductionPercentage: number; description?: string }[];
    // }): Promise<any> {
    //     const { allowRefunds, refundWindowDays, tiers } = dto;
    //     const policy = await this.databaseService.refundPolicy.upsert({
    //         where: { cateringId },
    //         create: {
    //             cateringId,
    //             allowRefunds: allowRefunds ?? true,
    //             refundWindowDays: refundWindowDays ?? 3,
    //             tiers: tiers ? { create: tiers.map(t => ({ ...t, deductionPercentage: t.deductionPercentage })) } : undefined,
    //         },
    //         update: {
    //             allowRefunds: allowRefunds ?? undefined,
    //             refundWindowDays: refundWindowDays ?? undefined,
    //             tiers: tiers ? {
    //                 deleteMany: {},
    //                 create: tiers.map(t => ({ ...t, deductionPercentage: t.deductionPercentage })),
    //             } : undefined,
    //         },
    //         include: { tiers: true },
    //     });
    //     return { ...policy, tiers: policy.tiers.map(t => ({ ...t, deductionPercentage: Number(t.deductionPercentage) })) };
    // }

    // async getRefundPolicy(cateringId: string): Promise<any | null> {
    //     const policy = await this.databaseService.refundPolicy.findUnique({
    //         where: { cateringId },
    //         include: { tiers: true },
    //     });
    //     if (!policy) return null;
    //     return { ...policy, tiers: policy.tiers.map(t => ({ ...t, deductionPercentage: Number(t.deductionPercentage) })) };
    // }

    /**
     *
     * Maps a raw event center from the database to cateringDto.
     */
    private mapToCateringDto(catering: any): CateringDto {
        return {
            ...catering,
            rating: catering.rating as unknown as number,
            status: catering.status as unknown as ServiceStatus,
        };
    }
}

