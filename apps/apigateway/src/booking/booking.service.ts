import { Inject, Injectable } from '@nestjs/common';
import { CreateBookingDto, UpdateBookingDto, BookingDto, BOOKINGPATTERN, ManyBookingDto, ManyRequestBookingDto, BOOKING_CLIENT, TimeslotDto, CreateManyTimeSlotDto, TIMESLOTPATTERN, ManyRequestTimeSlotDto, UpdateTimeslotDto } from '@shared/contracts';
import { ClientProxy } from '@nestjs/microservices';


@Injectable()
export class BookingService {

    constructor(
        @Inject(BOOKING_CLIENT) private readonly bookingClient: ClientProxy
    ) { }

    create(createBookingDto: CreateBookingDto) {
        return this.bookingClient.send<BookingDto, CreateBookingDto>(BOOKINGPATTERN.CREATE, createBookingDto)
    }
    
    findAll(limit: number, offset: number, serviceProvider?: string, startDate?: Date, endDate?: Date) {
        return this.bookingClient.send<ManyBookingDto, ManyRequestBookingDto>(BOOKINGPATTERN.FINDALL,
            {
                limit,
                offset,
                serviceProvider,
                startDate,
                endDate,
            })
    }

    findOne(id: string) {
        return this.bookingClient.send<BookingDto, string>(BOOKINGPATTERN.FINDONEBYID, id)
    }

    update(id: string, updateBookingDto: UpdateBookingDto) {
        return this.bookingClient.send<BookingDto, { id: string, updateBookingDto: UpdateBookingDto }>(BOOKINGPATTERN.UPDATE, {
            id,
            updateBookingDto
        })
    }

    remove(id: string, updaterId: any) {
        return this.bookingClient.send<BookingDto, { id: string, updaterId: string }>(BOOKINGPATTERN.DELETE, { id, updaterId })
    }

}


@Injectable()
export class TimeSlotService {

    constructor(
        @Inject(BOOKING_CLIENT) private readonly bookingClient: ClientProxy
    ) { }

    /**
     * 
     * Time slot service layer
     * 
     * @see TimeslotDto
     * @see CreateManyTimeSlotDto
     * @see TIMESLOTPATTERN
     * @param createTimeSlotDto 
     * @returns 
     */

    create(createTimeSlotDto: CreateManyTimeSlotDto) {
        return this.bookingClient.send<TimeslotDto, CreateManyTimeSlotDto>(TIMESLOTPATTERN.CREATE, createTimeSlotDto)
    }

    findAll(limit: number, offset: number, serviceId?: string, date?: Date) {
        return this.bookingClient.send<TimeslotDto[], ManyRequestTimeSlotDto>(TIMESLOTPATTERN.FINDALL,
            {
                limit,
                offset,
                serviceId,
                date,
            })
    }


    findOne(id: string) {
        return this.bookingClient.send<TimeslotDto, string>(TIMESLOTPATTERN.FINDONEBYID, id)
    }

    updateTimeSlot(id: string, updateTimeslotDto: UpdateTimeslotDto) {
        return this.bookingClient.send<TimeslotDto, { id: string, updateTimeslotDto: UpdateTimeslotDto }>(TIMESLOTPATTERN.UPDATE, {
            id,
            updateTimeslotDto
        })
    }

    removeTimeSlot(id: string, updaterId: any) {
        return this.bookingClient.send<TimeslotDto, { id: string, updaterId: string }>(TIMESLOTPATTERN.DELETE, { id, updaterId })
    }
}