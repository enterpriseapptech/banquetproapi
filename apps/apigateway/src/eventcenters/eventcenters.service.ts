import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateEventCenterDto, UpdateEventCenterDto, EventCenterDto, EVENTCENTERPATTERN, ManyEventCentersDto, ManyRequestEventCenterDto, EVENTCENTERREFUNDPOLICYPATTERN } from '@shared/contracts/eventcenters';
import { RefundPolicyDto, UpsertRefundPolicyDto } from '@shared/contracts/payments';
import { CACHE_KEYS, EVENT_CENTER_CLIENT } from '@shared/contracts';
import { UpdateServiceSubscriptionDto } from '@shared/contracts/shared';
import { Cacheable, CacheEvict } from '../common/cache/cache.decorators';

@Injectable()
export class EventcentersService {
    constructor(
        @Inject(EVENT_CENTER_CLIENT) private readonly eventClient: ClientProxy,
    ) { }

    @CacheEvict(
        `${CACHE_KEYS.EVENTCENTERS_ALL}:*`,
        `${CACHE_KEYS.EVENTCENTERS_BOOKMARKS}:*`,
    )
    create(createEventcenterDto: CreateEventCenterDto) {
        return this.eventClient.send<EventCenterDto, CreateEventCenterDto>(EVENTCENTERPATTERN.CREATEEVENTCENTER, createEventcenterDto);
    }

    @Cacheable((...args) => `${CACHE_KEYS.EVENTCENTERS_ALL}:${args.join(':')}`)
    findAll(limit: number, offset: number, serviceProvider?: string, city?: string, location?: string, search?: string) {
        return this.eventClient.send<ManyEventCentersDto, ManyRequestEventCenterDto>(EVENTCENTERPATTERN.FINDALLEVENTCENTER,
            { limit, offset, serviceProvider, city, location, search });
    }

    @Cacheable((...args) => `${CACHE_KEYS.EVENTCENTERS_BOOKMARKS}:${[...args[0]].sort().join(',')}`)
    findAllWithUnique(ids: string[]) {
        return this.eventClient.send<EventCenterDto[], string[]>(EVENTCENTERPATTERN.FINDALLBYUNIQUEEVENTCENTER, ids);
    }

    @Cacheable((...args) => CACHE_KEYS.EVENTCENTER_ONE(args[0]))
    findOne(id: string) {
        return this.eventClient.send<EventCenterDto, string>(EVENTCENTERPATTERN.FINDONEBYID, id);
    }

    @CacheEvict(
        `${CACHE_KEYS.EVENTCENTERS_ALL}:*`,
        `${CACHE_KEYS.EVENTCENTERS_BOOKMARKS}:*`,
        (...args) => CACHE_KEYS.EVENTCENTER_ONE(args[0]),
    )
    update(id: string, updateEventcenterDto: UpdateEventCenterDto) {
        return this.eventClient.send<EventCenterDto, { id: string, updateEventcenterDto: UpdateEventCenterDto }>(EVENTCENTERPATTERN.UPDATEEVENTCENTER, {
            id,
            updateEventcenterDto
        });
    }

    @CacheEvict(
        `${CACHE_KEYS.EVENTCENTERS_ALL}:*`,
        `${CACHE_KEYS.EVENTCENTERS_BOOKMARKS}:*`,
        (...args) => CACHE_KEYS.EVENTCENTER_ONE(args[0]),
    )
    remove(id: string, updaterId: any) {
        return this.eventClient.send<EventCenterDto, { id: string, updaterId: string }>(EVENTCENTERPATTERN.DELETEEVENTCENTER, { id, updaterId });
    }

    @CacheEvict(
        `${CACHE_KEYS.EVENTCENTERS_ALL}:*`,
        `${CACHE_KEYS.EVENTCENTERS_BOOKMARKS}:*`,
        (...args) => CACHE_KEYS.EVENTCENTER_ONE(args[0].serviceId),
    )
    updateSubscription(updateServiceSubscriptionDto: UpdateServiceSubscriptionDto) {
        const { serviceId, subscriptionStatus, subscriptionPlanId, timeframe } = updateServiceSubscriptionDto;
        return this.eventClient.emit<void, UpdateServiceSubscriptionDto>(EVENTCENTERPATTERN.UPDATESUBSCRIPTION,
            { serviceId, subscriptionStatus, subscriptionPlanId, timeframe }
        );
    }

    upsertRefundPolicy(eventCenterId: string, dto: UpsertRefundPolicyDto) {
        return this.eventClient.send<RefundPolicyDto, { eventCenterId: string } & UpsertRefundPolicyDto>(
            EVENTCENTERREFUNDPOLICYPATTERN.UPSERT, { eventCenterId, ...dto },
        );
    }

    getRefundPolicy(eventCenterId: string) {
        return this.eventClient.send<RefundPolicyDto | null, string>(
            EVENTCENTERREFUNDPOLICYPATTERN.FINDBYSERVICEID, eventCenterId,
        );
    }
}
