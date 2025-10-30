import { Controller } from '@nestjs/common';
import { BookingService, RequestQuoteService, TimeSlotService } from './booking.service';
import { EventPattern, MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { catchError, from, throwError } from 'rxjs';
import { BOOKINGPATTERN, CreateBookingDto, CreateManyTimeSlotDto, CreateRequestQuoteDto, ManyRequestTimeSlotDto, REQUESTQUOTEPATTERN, TIMESLOTPATTERN, 
    UpdateBookingDto, 
    // UpdateBookingDto, 
    UpdateRequestQuoteDto, UpdateTimeslotDto } from '@shared/contracts/booking';
import { Decimal } from '@prisma/client/runtime/library';

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
    findAll(@Payload() data: { limit: number, offset: number, customerId?: string, serviceType?: string, serviceId?: string, serviceProvider?: string, bookingReference?: string}) {
        const { limit, offset, customerId, serviceType, serviceId, serviceProvider, bookingReference} = data
        return from(this.bookingService.findAll(limit, offset, customerId, serviceType, serviceId, serviceProvider, bookingReference)).pipe(
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
    update(@Payload() data: { id: string, updateBookingDto: UpdateBookingDto}) {
        const { id, updateBookingDto} = data
    return from(this.bookingService.update(id, updateBookingDto)).pipe(
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
    
    @EventPattern(BOOKINGPATTERN.UPDATEPAYMENT)
    updatePayment(@Payload() data: { id: string, amount: number }) {
        console.log({data})
        const { id, amount} = data
        return from(this.bookingService.updatePayment(id, new Decimal(amount))).pipe(
            catchError((err) => {
                console.error("Error in Booking Service:", err);
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

@Controller()
export class  RequestQuoteController {
    constructor(private readonly requestQuoteService: RequestQuoteService) { }

    @MessagePattern(REQUESTQUOTEPATTERN.CREATE)
    create(@Payload() createRequestQuoteDto: CreateRequestQuoteDto) {
        return from(this.requestQuoteService.create(createRequestQuoteDto)).pipe(
            catchError((err) => {
                console.error("Error in requestQuoteService:", err);
                return throwError(() => new RpcException({
                    statusCode: err.response.statusCode || 500,
                    message: err.message || "Internal Server Error",
                    error: err.response.error || "Sever error",
                }));

            })
        );

    }

    @MessagePattern(REQUESTQUOTEPATTERN.FINDALL)
    findAll(@Payload() data: { limit: number, offset: number, serviceType?: string, serviceId?: string, serviceProvider?: string, quoteReference?: string}) {
        const { limit, offset, serviceType, serviceId, serviceProvider, quoteReference} = data
        return from(this.requestQuoteService.findAll(limit, offset, serviceType, serviceId, serviceProvider, quoteReference)).pipe(
                catchError((err) => {
                    console.error("Error in requestQuoteService:", err);
                    return throwError(() => new RpcException({
                        statusCode: err.response.statusCode || 500,
                        message: err.message || "Internal Server Error",
                        error: err.response.error || "Sever error",
                    }));
    
                })
            );
    
        }
    
    @MessagePattern(REQUESTQUOTEPATTERN.FINDONEBYID)
        findOne(@Payload() id: string) {
        return from(this.requestQuoteService.findOne(id)).pipe(
                catchError((err) => {
                    console.error("Error in requestQuoteService:", err);
                    return throwError(() => new RpcException({
                        statusCode: err.response.statusCode || 500,
                        message: err.message || "Internal Server Error",
                        error: err.response.error || "Sever error",
                    }));
    
                })
            );
    
        }
    
    @MessagePattern(REQUESTQUOTEPATTERN.UPDATE)
        update(@Payload() data: { id: string, updateRequestQuoteDto: UpdateRequestQuoteDto}) {
            const { id, updateRequestQuoteDto} = data
        return from(this.requestQuoteService.update(id, updateRequestQuoteDto)).pipe(
                catchError((err) => {
                    console.error("Error in requestQuoteService:", err);
                    return throwError(() => new RpcException({
                        statusCode: err.response.statusCode || 500,
                        message: err.message || "Internal Server Error",
                        error: err.response.error || "Sever error",
                    }));
    
                })
            );
    
        }
    
    @MessagePattern(REQUESTQUOTEPATTERN.DELETE)
        remove(@Payload() data: { id: string, updaterId: string }) {
            const { id, updaterId } = data
        return from(this.requestQuoteService.remove(id, updaterId)).pipe(
                catchError((err) => {
                    console.error("Error in requestQuoteService:", err);
                    return throwError(() => new RpcException({
                        statusCode: err.response.statusCode || 500,
                        message: err.message || "Internal Server Error",
                        error: err.response.error || "Sever error",
                    }));
    
                })
            );
    
    }
    
}

@Controller()
export class TimeSlotController {
    constructor(private readonly timeSlotService: TimeSlotService) { }

    @MessagePattern(TIMESLOTPATTERN.CREATE)
    create(@Payload() createTimeslotDto: CreateManyTimeSlotDto) {
        return from(this.timeSlotService.create(createTimeslotDto)).pipe(
            catchError((err) => {
                console.error("Error in timeSlotService for timeslot:", err);
                return throwError(() => new RpcException({
                    statusCode: err.response.statusCode || 500,
                    message: err.message || "Internal Server Error",
                    error: err.response.error || "Sever error",
                }));

            })
        );

    }

    @MessagePattern(TIMESLOTPATTERN.FINDALL)
    findAll(@Payload() data: ManyRequestTimeSlotDto) {
        return from(this.timeSlotService.findAll(data)).pipe(
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

    // @MessagePattern(TIMESLOTPATTERN.FINDONEBYID)
    // findOne(@Payload() id: string) {
    //     return from(this.timeSlotService.findOne(id)).pipe(
    //         catchError((err) => {
    //             console.error("Error in UsersService:", err);
    //             return throwError(() => new RpcException({
    //                 statusCode: err.response.statusCode || 500,
    //                 message: err.message || "Internal Server Error",
    //                 error: err.response.error || "Sever error",
    //             }));

    //         })
    //     );

    // }

    @MessagePattern(TIMESLOTPATTERN.UPDATE)
    update(@Payload() data: { id: string, updateTimeslotDto: UpdateTimeslotDto }) {
        const { id, updateTimeslotDto } = data
        return from(this.timeSlotService.update(id, updateTimeslotDto)).pipe(
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

    @MessagePattern(TIMESLOTPATTERN.DELETE)
    remove(@Payload() data: { id: string, updaterId: string }) {
        const { id, updaterId } = data
        return from(this.timeSlotService.remove(id, updaterId)).pipe(
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