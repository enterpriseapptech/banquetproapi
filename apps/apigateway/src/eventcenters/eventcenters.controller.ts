/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Req } from '@nestjs/common';
import { EventcentersService } from './eventcenters.service';
import { CreateEventCenterDto, UpdateEventCenterDto, UserDto } from '@shared/contracts';
import { JwtAuthGuard } from '../jwt/jwt.guard';
import { VerificationGuard } from '../jwt/verification.guard';
import { firstValueFrom } from 'rxjs';
import { Request } from 'express';

// Extend the Request type to include 'user'
interface AuthenticatedRequest extends Request {
    user?: any; // Change `any` to your actual user type if known
}
@Controller('event-centers')
export class EventcentersController {
    constructor(private readonly eventcentersService: EventcentersService) { }


    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Post('create')
    create(@Body() createEventcenterDto: CreateEventCenterDto) {
        return this.eventcentersService.create(createEventcenterDto);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.eventcentersService.findOne(id);
    }

    @Get()
    findAll(
        @Query('limit') limit: number,
        @Query('offset') offset: number,
        @Query('serviceProvider') serviceProvider: string,
        @Query('city') city: string,  
        @Query('state') state: string,
        @Query('country') country: string,
    ) {
        return this.eventcentersService.findAll(limit, offset, serviceProvider, city, state, country);
    }

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateEventcenterDto: UpdateEventCenterDto) {
        return this.eventcentersService.update(id, updateEventcenterDto);
    }

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Delete(':id')
    async remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
        const user: UserDto = await firstValueFrom(req.user)
        return this.eventcentersService.remove(id, user.id);
    }
}
