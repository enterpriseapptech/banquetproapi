import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Req } from '@nestjs/common';
import { BookingService, TimeSlotService } from './booking.service';
import { CreateBookingDto, CreateManyTimeSlotDto, ManyRequestTimeSlotDto, UpdateBookingDto, UpdateTimeslotDto,  } from '@shared/contracts/booking';
import { UserDto } from '@shared/contracts/users';
import { JwtAuthGuard } from '../jwt/jwt.guard';
import { VerificationGuard } from '../jwt/verification.guard';
import { firstValueFrom } from 'rxjs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


interface AuthenticatedRequest extends Request {
    user?: any; // Change `any` to your actual user type if known
}

@Controller('booking')
export class BookingController {
    constructor(private readonly bookingService: BookingService) { }

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Post('create')
    create(@Body() createBookingDto: CreateBookingDto) {
        return this.bookingService.create(createBookingDto);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.bookingService.findOne(id);
    }

    @Get()
    findAll(
        @Query('limit') limit: number,
        @Query('offset') offset: number,
        @Query('serviceId') serviceId: string,
        @Query('serviceProvider') serviceProvider: string,
        @Query('startDate') startDate: Date,
        @Query('endDate') endDate: Date
    ) {
         console.log({serviceId})
        return this.bookingService.findAll(limit, offset, serviceId, serviceProvider, startDate, endDate);
    }

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
        return this.bookingService.update(id, updateBookingDto);
    }

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Delete(':id')
    async remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
        const user: UserDto = await firstValueFrom(req.user)
        return this.bookingService.remove(id, user.id);
    }

}

@ApiTags('timeslot')
@Controller('timeslot')
export class TimeSlotController {
    constructor(private readonly timeslotService: TimeSlotService) { }

    /**
     * 
     * Time slot controller routes
     * 
     * 
     * @see CreateManyTimeSlotDto
     * @param createTimeSlotDto 
     * @returns TimeSlotDto
     * 
     * 
     */


    @ApiOperation({ summary: 'Create timeslot' })
    @ApiResponse({ status: 201, description: 'Success' })
    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Post()
    create(@Body() createTimeSlotDto: CreateManyTimeSlotDto) {
        return this.timeslotService.create(createTimeSlotDto);
    }

    @ApiOperation({ summary: 'Get one timeslot' })
    @ApiResponse({ status: 200, description: 'Success' })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.timeslotService.findOne(id);
    }

    @ApiOperation({ summary: 'Get All timeslot' })
    @ApiResponse({ status: 200, description: 'Success' })
    @Get()
    findAllTimeSlot(@Query() query: ManyRequestTimeSlotDto)
        {
        const { limit, offset, serviceId, date } = query;
        return this.timeslotService.findAll(limit, offset, serviceId, date);
    }

    @ApiOperation({ summary: 'Update timeslot' })
    @ApiResponse({ status: 201, description: 'Success' })
    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Patch(':id')
    updateTimeSlot(@Param('id') id: string, @Body() updateTimeslotDto: UpdateTimeslotDto) {
        return this.timeslotService.updateTimeSlot(id, updateTimeslotDto);
    }

    @ApiOperation({ summary: 'Delete timeslot' })
    @ApiResponse({ status: 201, description: 'Success' })
    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Delete(':id')
    async removeTimeSlot(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
        const user: UserDto = await firstValueFrom(req.user)
        return this.timeslotService.removeTimeSlot(id, user.id);
    }
}