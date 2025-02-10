import { Controller } from '@nestjs/common';
import { BookingService } from './booking.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { catchError, from, throwError } from 'rxjs';
import { BOOKINGPATTERN, CreateBookingDto } from '@shared/contracts';

@Controller()
export class BookingController {
    constructor(private readonly bookingService: BookingService) { }

    @MessagePattern(BOOKINGPATTERN.CREATE)
    create(@Payload() createBookingDto: CreateBookingDto) {
        return from(this.bookingService.create(createBookingDto)).pipe(
            catchError((err) => {
                console.error("Error in bookingService:", err);
                return throwError(() => new RpcException({
                    statusCode: err.response.statusCode || 500,
                    message: err.message || "Internal Server Error",
                    error: err.response.error || "Sever error",
                }));

            })
        );

    }
}
