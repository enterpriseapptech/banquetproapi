import { Controller } from '@nestjs/common';
import { EventcentersService } from './eventcenters.service';
import { CreateEventCenterDto, EVENTCENTERPATTERN } from '@shared/contracts';
import { MessagePattern, Payload } from '@nestjs/microservices';
@Controller()
export class EventcentersController {
    constructor(private readonly eventcentersService: EventcentersService) { }

    @MessagePattern(EVENTCENTERPATTERN.CREATEEVENTCENTER)
    create(@Payload() createEventCenterDto: CreateEventCenterDto) {
        return this.eventcentersService.create(createEventCenterDto);
    }
}
