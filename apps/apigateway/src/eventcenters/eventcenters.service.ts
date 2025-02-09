import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateEventCenterDto, EventCenterDto, EVENTCENTERPATTERN } from '@shared/contracts';
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

    findAll() {
        return `This action returns all eventcenters`;
    }

    findOne(id: number) {
        return `This action returns a #${id} eventcenter`;
    }

    // update(id: number, updateEventcenterDto: UpdateEventcenterDto) {
    //     return `This action updates a #${id} eventcenter`;
    // }

    remove(id: number) {
        return `This action removes a #${id} eventcenter`;
    }
}
