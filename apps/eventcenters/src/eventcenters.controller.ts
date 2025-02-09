import { Controller } from '@nestjs/common';
import { EventcentersService } from './eventcenters.service';
import { CreateEventCenterDto, EVENTCENTERPATTERN } from '@shared/contracts';
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
}
