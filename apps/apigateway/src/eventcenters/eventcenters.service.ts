import { Inject, Injectable, UseInterceptors } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {  CreateEventCenterDto, UpdateEventCenterDto, EventCenterDto, EVENTCENTERPATTERN, ManyEventCentersDto, ManyRequestEventCenterDto } from '@shared/contracts/eventcenters';
import { EVENT_CENTER_CLIENT } from '@shared/contracts';
import { UpdateServiceSubscriptionDto } from '@shared/contracts/shared';
import { CACHE_MANAGER, CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager'; 
import { firstValueFrom } from 'rxjs';


@Injectable()
export class EventcentersService {
    constructor(
        @Inject(EVENT_CENTER_CLIENT) private readonly eventClient: ClientProxy,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
        
    ) { }

    async create(createEventcenterDto: CreateEventCenterDto) {
        const data = await firstValueFrom(this.eventClient.send<EventCenterDto, CreateEventCenterDto>
            (EVENTCENTERPATTERN.CREATEEVENTCENTER, createEventcenterDto)) 
        await this.cacheManager.del('/eventcenters');         // the GET all endpoint URL
        await this.cacheManager.del('/eventcenters/bookmarks');         // the GET all endpoint URL
        await this.cacheManager.del(`/eventcenters/${data.id}`);  // the GET one endpoint URL
        return data
    }

    @UseInterceptors(CacheInterceptor)
    @CacheTTL(300) // 5 minutes
    findAll(limit: number, offset: number, serviceProvider?: string, city? : string, location?: string, search?: string) {
        return this.eventClient.send<ManyEventCentersDto, ManyRequestEventCenterDto>(EVENTCENTERPATTERN.FINDALLEVENTCENTER,
            {   limit,
                offset,
                serviceProvider,
                city,
                location,
                search
            })
    }

    
    @UseInterceptors(CacheInterceptor)
    @CacheTTL(300) // 5 minutes
    findAllWithUnique(ids: string[]) {
        return this.eventClient.send<EventCenterDto[], string[]>(EVENTCENTERPATTERN.FINDALLBYUNIQUEEVENTCENTER,
            ids)
    }

    
    @UseInterceptors(CacheInterceptor)
    @CacheTTL(300) // 5 minutes
    findOne(id: string) {
        return this.eventClient.send<EventCenterDto, string>(EVENTCENTERPATTERN.FINDONEBYID, id)
    }

    async update(id: string, updateEventcenterDto: UpdateEventCenterDto) {
        await this.cacheManager.del('/eventcenters');         // the GET all endpoint URL
        await this.cacheManager.del('/eventcenters/bookmarks');         // the GET all endpoint URL
        await this.cacheManager.del(`/eventcenters/${id}`);  // the GET one endpoint URL

        return this.eventClient.send<EventCenterDto, { id: string, updateEventcenterDto: UpdateEventCenterDto }>(EVENTCENTERPATTERN.UPDATEEVENTCENTER, {
            id,
            updateEventcenterDto
        })
    }

    async remove(id: string, updaterId: any) {
        await this.cacheManager.del('/eventcenters');         // the GET all endpoint URL
        await this.cacheManager.del('/eventcenters/bookmarks');         // the GET all endpoint URL
        await this.cacheManager.del(`/eventcenters/${id}`);  // the GET one endpoint URL

        return this.eventClient.send<EventCenterDto, { id: string, updaterId: string }>(EVENTCENTERPATTERN.DELETEEVENTCENTER, { id, updaterId })
    }

    async updateSubscription(updateServiceSubscriptionDto: UpdateServiceSubscriptionDto) {
        const { serviceId, subscriptionStatus, subscriptionPlanId, timeframe } = updateServiceSubscriptionDto;
         // invalidate the cached list and the specific item
        await this.cacheManager.del('/eventcenters');         // the GET all endpoint URL
        await this.cacheManager.del('/eventcenters/bookmarks');         // the GET all endpoint URL
        await this.cacheManager.del(`/eventcenters/${serviceId}`);  // the GET one endpoint URL

        return this.eventClient.emit<void, UpdateServiceSubscriptionDto>(EVENTCENTERPATTERN.UPDATESUBSCRIPTION,
            {   serviceId, 
                subscriptionStatus,
                subscriptionPlanId,
                timeframe,
            }
        );
    }

}
