import { Controller } from '@nestjs/common';
import { EventcentersService } from './eventcenters.service';
import { CreateEventCenterDto, EVENTCENTERPATTERN, UpdateEventCenterDto } from '@shared/contracts';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { catchError, from, throwError } from 'rxjs';
@Controller()
export class EventcentersController {
    constructor(private readonly eventcentersService: EventcentersService) { }

    @MessagePattern(EVENTCENTERPATTERN.CREATEEVENTCENTER)
    create(@Payload() createEventCenterDto: CreateEventCenterDto) {
        return from(this.eventcentersService.create(createEventCenterDto)).pipe(
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

    @MessagePattern(EVENTCENTERPATTERN.FINDALLEVENTCENTER)
    findAll(@Payload() data: { limit: number, offset: number, serviceProvider?: string, city?: string, state?: string, country?: string, }) {
        const { limit, offset, serviceProvider, city, state, country } = data
        return from(this.eventcentersService.findAll(limit, offset, serviceProvider, city, state, country)).pipe(
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

    @MessagePattern(EVENTCENTERPATTERN.FINDONEBYID)
    findOne(@Payload() id: string) {
        return from(this.eventcentersService.findOne(id)).pipe(
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

    @MessagePattern(EVENTCENTERPATTERN.UPDATEEVENTCENTER)
    update(@Payload() data: { id: string, updateEventcenterDto: UpdateEventCenterDto}) {
        const { id, updateEventcenterDto} = data
        return from(this.eventcentersService.update(id, updateEventcenterDto)).pipe(
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

    @MessagePattern(EVENTCENTERPATTERN.DELETEEVENTCENTER)
    remove(@Payload() data: { id: string, updaterId: string }) {
        const { id, updaterId } = data
        return from(this.eventcentersService.remove(id, updaterId)).pipe(
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
