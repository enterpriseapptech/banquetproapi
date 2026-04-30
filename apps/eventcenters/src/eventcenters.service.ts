/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConflictException, Inject, Injectable, InternalServerErrorException, Logger, NotFoundException, UseInterceptors } from '@nestjs/common';
import { $Enums, Prisma } from '../prisma/@prisma/eventcenters';
import { CreateEventCenterDto, EventCenterDto, ManyEventCentersDto, ServiceStatus, UpdateEventCenterDto } from '@shared/contracts/eventcenters';
import { NOTIFICATIONPATTERN } from '@shared/contracts/notifications';
import { DatabaseService } from '../database/database.service';
import { NOTIFICATION_CLIENT } from '@shared/contracts';
import { ClientProxy } from '@nestjs/microservices';
import { UpdateServiceSubscriptionDto } from '@shared/contracts/shared';
import { CACHE_MANAGER, CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager'; 
@Injectable()
export class EventcentersService {
    constructor(
        @Inject(NOTIFICATION_CLIENT) private readonly notificationClient: ClientProxy,
        private readonly databaseService: DatabaseService,
        private readonly logger = new Logger(EventcentersService.name)
    ) { }

    async create(createEventCenterDto: CreateEventCenterDto): Promise<EventCenterDto> {
        try {
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
            // Start a transaction - for an all or fail process
            const neweventCenter = await  this.databaseService.eventCenter.create({ data: newEventCenterInput });
            console.log({neweventCenter})

            //  emit a email notification - notification event
            this.notificationClient.emit(NOTIFICATIONPATTERN.SEND, {
                type: 'EMAIL',
                recipientId: createEventCenterDto.serviceProviderId,
                data: {
                    subject: 'New Event Venue!',
                    message: `you successfully added a new event venue`,
                    recipientEmail: createEventCenterDto.serviceProviderEmail,
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

    async findAllWithUnique(ids: string[]): Promise<EventCenterDto[]> {
        
          const eventCenters = await this.databaseService.eventCenter.findMany({
                where: {
                    id: { in: ids },
                    deletedAt: null
                }
            });
        return eventCenters.map(eventCenter => this.mapToEventCenterDto(eventCenter))
        
    }

    async findAll(
        limit?: number,
        offset?: number,
        serviceProvider?: string,
        city?: string,
        location?: string,
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
        if (location) whereClause.location = { equals: location };
        if (search) {
            whereClause.OR = [
                { name: { contains: search, mode: "insensitive" } },
                { eventTypes: { has: search} },
                { description: { contains: search, mode: "insensitive" } },
                { venueLayout: { contains: search, mode: "insensitive" } },
                { city: { contains: search, mode: "insensitive" } },
            ].filter(Boolean)
        }

        if (Object.keys(whereClause).length > 0) {
            const eventCenters = await this.databaseService.eventCenter.findMany({
                where: whereClause,
                take: limit,
                skip: offset,
                orderBy:  [
                    { subscriptionStatus: 'desc' }, // subscribed first
                    { subscriptionExpiry: 'desc' }, // newest active subs first
                    { createdAt: 'desc' } // fallback
                ]
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
            orderBy: [
                { subscriptionStatus: 'desc' }, // subscribed first
                { subscriptionExpiry: 'desc' }, // newest active subs first
                { createdAt: 'desc' } // fallback
            ]
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


    async updateSubscriptionStatus(
        dto: UpdateServiceSubscriptionDto
        ): Promise<{shouldRefund: boolean}> {
        const { serviceId, subscriptionStatus, subscriptionPlanId, timeframe } = dto;

        let subscriptionExpiry: Date | undefined;

        try {
            if (subscriptionPlanId && timeframe) {
                const eventCenter = await this.databaseService.eventCenter.findUnique({
                    where: { id: serviceId },
                    select: { subscriptionExpiry: true },
            });

            const now = Date.now();
            const timeframeMs = timeframe * 24 * 60 * 60 * 1000;

            const baseTime = eventCenter?.subscriptionExpiry
                ? Math.max(eventCenter.subscriptionExpiry.getTime(), now)
                : now;

            subscriptionExpiry = new Date(baseTime + timeframeMs);
            }

            await this.databaseService.eventCenter.update({
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

    // async upsertRefundPolicy(eventCenterId: string, dto: {
    //     allowRefunds?: boolean;
    //     refundWindowDays?: number;
    //     tiers?: { minDaysBeforeEvent: number; deductionPercentage: number; description?: string }[];
    // }): Promise<any> {
    //     const { allowRefunds, refundWindowDays, tiers } = dto;
    //     const policy = await this.databaseService.refundPolicy.upsert({
    //         where: { eventCenterId },
    //         create: {
    //             eventCenterId,
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

    // async getRefundPolicy(eventCenterId: string): Promise<any | null> {
    //     const policy = await this.databaseService.refundPolicy.findUnique({
    //         where: { eventCenterId },
    //         include: { tiers: true },
    //     });
    //     if (!policy) return null;
    //     return { ...policy, tiers: policy.tiers.map(t => ({ ...t, deductionPercentage: Number(t.deductionPercentage) })) };
    // }

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

