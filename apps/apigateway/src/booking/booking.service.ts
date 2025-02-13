import { Inject, Injectable } from '@nestjs/common';
import { CreateBookingDto, UpdateBookingDto, BookingDto, BOOKINGPATTERN, ManyBookingDto, ManyRequestBookingDto } from '@shared/contracts';
import { BOOKING_CLIENT } from './constants';
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
