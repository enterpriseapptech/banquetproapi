import { Inject, Injectable } from '@nestjs/common';
// import { CreateRequestQuoteDto, UpdateBookingDto, BookingDto, , , , BOOKING_CLIENT, , CreateManyTimeSlotDto, TIMESLOTPATTERN, ,  } from '@shared/contracts';
import { ClientProxy } from '@nestjs/microservices';
import { CreateBookingDto, CreateManyTimeSlotDto, UpdateBookingDto, ManyRequestBookingDto, UpdateTimeslotDto, BOOKINGPATTERN, ManyBookingDto, TimeslotDto, TIMESLOTPATTERN, ManyRequestTimeSlotDto, BookingDto, CreateRequestQuoteDto, REQUESTQUOTEPATTERN, ManyRequestQuoteDto, RequestQuoteDto, UpdateRequestQuoteDto,  } from '@shared/contracts/booking';
import { BOOKING_CLIENT } from '@shared/contracts';


@Injectable()
export class BookingService {

    constructor(
        @Inject(BOOKING_CLIENT) private readonly bookingClient: ClientProxy
    ) { }

    create(createBookingDto: CreateBookingDto) {
       
        return this.bookingClient.send<BookingDto, CreateBookingDto>(BOOKINGPATTERN.CREATE, createBookingDto)
    }
    
    findAll(limit: number, offset: number, serviceId?: string, serviceProvider?: string, startDate?: Date, endDate?: Date) {
        console.log({serviceId})
        return this.bookingClient.send<ManyBookingDto, ManyRequestBookingDto>(BOOKINGPATTERN.FINDALL,
            {
                limit,
                offset,
                serviceId,
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

    updatePayment(id: string, amount: number) {
        console.log({id, amount})
        return this.bookingClient.emit<BookingDto, { id: string, amount: number }>(BOOKINGPATTERN.UPDATEPAYMENT, {
            id,
            amount
        })
    }

    remove(id: string, updaterId: any) {
        return this.bookingClient.send<BookingDto, { id: string, updaterId: string }>(BOOKINGPATTERN.DELETE, { id, updaterId })
    }

}


@Injectable()
export class RequestQuoteService {

    constructor(
        @Inject(BOOKING_CLIENT) private readonly bookingClient: ClientProxy
    ) { }

    create(createRequestQuoteDto: CreateRequestQuoteDto) {
        return this.bookingClient.send<any, CreateRequestQuoteDto>(REQUESTQUOTEPATTERN.CREATE, createRequestQuoteDto)
    }
    
    findAll(limit: number, offset: number, serviceId?: string, serviceProvider?: string, startDate?: Date, endDate?: Date) {

        return this.bookingClient.send<ManyRequestQuoteDto, ManyRequestBookingDto>(REQUESTQUOTEPATTERN.FINDALL,
            {
                limit,
                offset,
                serviceId,
                serviceProvider,
                startDate,
                endDate,
            })
    }

    findOne(id: string) {
        return this.bookingClient.send<RequestQuoteDto, string>(REQUESTQUOTEPATTERN.FINDONEBYID, id)
    }

    update(id: string, updateRequestQuoteDto: UpdateRequestQuoteDto) {
        return this.bookingClient.send<RequestQuoteDto, { id: string, updateRequestQuoteDto: UpdateRequestQuoteDto }>(REQUESTQUOTEPATTERN.UPDATE, {
            id,
            updateRequestQuoteDto
        })
    }

    remove(id: string, updaterId: any) {
        return this.bookingClient.send<RequestQuoteDto, { id: string, updaterId: string }>(REQUESTQUOTEPATTERN.DELETE, { id, updaterId })
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