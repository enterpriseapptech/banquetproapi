import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateEventCenterDto, UpdateEventCenterDto, EventCenterDto, EVENTCENTERPATTERN, ManyEventCentersDto, ManyRequestEventCenterDto } from '@shared/contracts';
import { EVENT_CENTER_CLIENT } from './constants';

@Injectable()
export class EventcentersService {
    constructor(
        @Inject(EVENT_CENTER_CLIENT) private readonly eventClient: ClientProxy
    ) { }

    create(createEventcenterDto: CreateEventCenterDto) {
        // console.log('Gateway sending create user message...');
        return this.eventClient.send<EventCenterDto, CreateEventCenterDto>(EVENTCENTERPATTERN.CREATEEVENTCENTER, createEventcenterDto)
    }

    findAll(limit: number, offset: number, serviceProvider?: string, city? : string, state?: string, country?: string) {
        return this.eventClient.send<ManyEventCentersDto, ManyRequestEventCenterDto>(EVENTCENTERPATTERN.FINDALLEVENTCENTER,
            {   limit,
                offset,
                serviceProvider,
                city,
                state,
                country,
            })
    }

    findOne(id: string) {
        return this.eventClient.send<EventCenterDto, string>(EVENTCENTERPATTERN.FINDONEBYID, id)
    }

    update(id: string, updateEventcenterDto: UpdateEventCenterDto) {
        return this.eventClient.send<EventCenterDto, { id: string, updateEventcenterDto: UpdateEventCenterDto }>(EVENTCENTERPATTERN.UPDATEEVENTCENTER, {
            id,
            updateEventcenterDto
        })
    }

    remove(id: string, updaterId: any) {
        return this.eventClient.send<EventCenterDto, { id: string, updaterId: string }>(EVENTCENTERPATTERN.DELETEEVENTCENTER, { id, updaterId })
    }
}
