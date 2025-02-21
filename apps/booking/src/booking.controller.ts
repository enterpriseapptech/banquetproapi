import { Controller } from '@nestjs/common';
import { BookingService } from './booking.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { catchError, from, throwError } from 'rxjs';
import { BOOKINGPATTERN, CreateBookingDto, UpdateBookingDto } from '@shared/contracts';

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

    @MessagePattern(BOOKINGPATTERN.FINDALL)
    findAll(@Payload() data: { limit: number, offset: number, serviceProvider?: string, bookingReference?: string}) {
        const { limit, offset, serviceProvider, bookingReference} = data
        return from(this.bookingService.findAll(limit, offset, serviceProvider, bookingReference)).pipe(
                catchError((err) => {
                    console.error("Error in UsersService:", err);
                    return throwError(() => new RpcException({
                        statusCode: err.response.statusCode || 500,
                        message: err.message || "Internal Server Error",
                        error: err.response.error || "Sever error",
                    }));
    
                })
            );
    
        }
    
    @MessagePattern(BOOKINGPATTERN.FINDONEBYID)
        findOne(@Payload() id: string) {
        return from(this.bookingService.findOne(id)).pipe(
                catchError((err) => {
                    console.error("Error in UsersService:", err);
                    return throwError(() => new RpcException({
                        statusCode: err.response.statusCode || 500,
                        message: err.message || "Internal Server Error",
                        error: err.response.error || "Sever error",
                    }));
    
                })
            );
    
        }
    
    @MessagePattern(BOOKINGPATTERN.UPDATE)
        update(@Payload() data: { id: string, updateEventcenterDto: UpdateBookingDto}) {
            const { id, updateEventcenterDto} = data
        return from(this.bookingService.update(id, updateEventcenterDto)).pipe(
                catchError((err) => {
                    console.error("Error in EventService:", err);
                    return throwError(() => new RpcException({
                        statusCode: err.response.statusCode || 500,
                        message: err.message || "Internal Server Error",
                        error: err.response.error || "Sever error",
                    }));
    
                })
            );
    
        }
    
    @MessagePattern(BOOKINGPATTERN.DELETE)
        remove(@Payload() data: { id: string, updaterId: string }) {
            const { id, updaterId } = data
        return from(this.bookingService.remove(id, updaterId)).pipe(
                catchError((err) => {
                    console.error("Error in UsersService:", err);
                    return throwError(() => new RpcException({
                        statusCode: err.response.statusCode || 500,
                        message: err.message || "Internal Server Error",
                        error: err.response.error || "Sever error",
                    }));
    
                })
            );
    
        }
}
