import { Controller, Get } from '@nestjs/common';
import { EventcentersService } from './eventcenters.service';

@Controller()
export class EventcentersController {
  constructor(private readonly eventcentersService: EventcentersService) {}

  @Get()
  getHello(): string {
    return this.eventcentersService.getHello();
  }
}
