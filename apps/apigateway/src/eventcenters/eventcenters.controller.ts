import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventcentersService } from './eventcenters.service';
import { CreateEventcenterDto } from './dto/create-eventcenter.dto';
import { UpdateEventcenterDto } from './dto/update-eventcenter.dto';

@Controller('eventcenters')
export class EventcentersController {
  constructor(private readonly eventcentersService: EventcentersService) {}
  EVENT_CENTER_CLIENT
  @Post()
  create(@Body() createEventcenterDto: CreateEventcenterDto) {
    return this.eventcentersService.create(createEventcenterDto);
  }

  @Get()
  findAll() {
    return this.eventcentersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventcentersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventcenterDto: UpdateEventcenterDto) {
    return this.eventcentersService.update(+id, updateEventcenterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventcentersService.remove(+id);
  }
}
