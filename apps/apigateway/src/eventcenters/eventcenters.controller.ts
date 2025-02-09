/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EventcentersService } from './eventcenters.service';
import { CreateEventCenterDto } from '@shared/contracts';
import { JwtAuthGuard } from '../jwt/jwt.guard';
import { VerificationGuard } from '../jwt/verification.guard';


@Controller('event-centers')
export class EventcentersController {
    constructor(private readonly eventcentersService: EventcentersService) { }

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Post('create')
    create(@Body() createEventcenterDto: CreateEventCenterDto) {
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

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateEventcenterDto: UpdateEventcenterDto) {
    //     return this.eventcentersService.update(+id, updateEventcenterDto);
    // }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.eventcentersService.remove(+id);
    }
}
