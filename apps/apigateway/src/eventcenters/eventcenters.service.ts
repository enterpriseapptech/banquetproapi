import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateEventCenterDto, UpdateEventCenterDto, EventCenterDto, EVENTCENTERPATTERN, ManyEventCentersDto, ManyRequestEventCenterDto } from '@shared/contracts/eventcenters';
import { CACHE_KEYS, EVENT_CENTER_CLIENT } from '@shared/contracts';
import { UpdateServiceSubscriptionDto } from '@shared/contracts/shared';
import { firstValueFrom } from 'rxjs';
import { Cacheable, CacheEvict } from '../common/cache/cache.decorators';

@Injectable()
export class EventcentersService {
    constructor(
        @Inject(EVENT_CENTER_CLIENT) private readonly eventClient: ClientProxy,
    ) { }

    @CacheEvict(
        CACHE_KEYS.EVENTCENTERS_ALL,
        CACHE_KEYS.EVENTCENTERS_BOOKMARKS,
    )
    async create(createEventcenterDto: CreateEventCenterDto) {
        return firstValueFrom(
            this.eventClient.send<EventCenterDto, CreateEventCenterDto>(EVENTCENTERPATTERN.CREATEEVENTCENTER, createEventcenterDto)
        );
    }

    @Cacheable(CACHE_KEYS.EVENTCENTERS_ALL)
    async findAll(limit: number, offset: number, serviceProvider?: string, city?: string, location?: string, search?: string) {
        return firstValueFrom(
            this.eventClient.send<ManyEventCentersDto, ManyRequestEventCenterDto>(EVENTCENTERPATTERN.FINDALLEVENTCENTER,
                { limit, offset, serviceProvider, city, location, search })
        );
    }

    @Cacheable(CACHE_KEYS.EVENTCENTERS_BOOKMARKS)
    async findAllWithUnique(ids: string[]) {
        return this.eventClient.send<EventCenterDto[], string[]>(EVENTCENTERPATTERN.FINDALLBYUNIQUEEVENTCENTER, ids)
        
    }

    @Cacheable((...args) => CACHE_KEYS.EVENTCENTER_ONE(args[0]))
    findOne(id: string) {
        return this.eventClient.send<EventCenterDto, string>(EVENTCENTERPATTERN.FINDONEBYID, id)
        
    }

    @CacheEvict(
        CACHE_KEYS.EVENTCENTERS_ALL,
        CACHE_KEYS.EVENTCENTERS_BOOKMARKS,
        (...args) => CACHE_KEYS.EVENTCENTER_ONE(args[0]),
    )
    async update(id: string, updateEventcenterDto: UpdateEventCenterDto) {
        return firstValueFrom(
            this.eventClient.send<EventCenterDto, { id: string, updateEventcenterDto: UpdateEventCenterDto }>(EVENTCENTERPATTERN.UPDATEEVENTCENTER, {
                id,
                updateEventcenterDto
            })
        );
    }

    @CacheEvict(
        CACHE_KEYS.EVENTCENTERS_ALL,
        CACHE_KEYS.EVENTCENTERS_BOOKMARKS,
        (...args) => CACHE_KEYS.EVENTCENTER_ONE(args[0]),
    )
    async remove(id: string, updaterId: any) {
        return firstValueFrom(
            this.eventClient.send<EventCenterDto, { id: string, updaterId: string }>(EVENTCENTERPATTERN.DELETEEVENTCENTER, { id, updaterId })
        );
    }

    @CacheEvict(
        CACHE_KEYS.EVENTCENTERS_ALL,
        CACHE_KEYS.EVENTCENTERS_BOOKMARKS,
        (...args) => CACHE_KEYS.EVENTCENTER_ONE(args[0].serviceId),
    )
    async updateSubscription(updateServiceSubscriptionDto: UpdateServiceSubscriptionDto) {
        const { serviceId, subscriptionStatus, subscriptionPlanId, timeframe } = updateServiceSubscriptionDto;
        return this.eventClient.emit<void, UpdateServiceSubscriptionDto>(EVENTCENTERPATTERN.UPDATESUBSCRIPTION,
            { serviceId, subscriptionStatus, subscriptionPlanId, timeframe }
        );
    }
}
