import { Controller } from '@nestjs/common';
import { EventcentersService, EventCenterSubscriptionService } from './eventcenters.service';
import { CreateEventCenterDto, CreateServiceSubscriptionDto, EVENTCENTERPATTERN, EVENTCENTERSUBSCRIPTIONPATTERN, UpdateEventCenterDto, UpdateServiceSubscriptionDto } from '@shared/contracts/eventcenters';
import { MessagePattern, Payload, RpcException, RmqContext, Ctx } from '@nestjs/microservices';
import { catchError, from, throwError } from 'rxjs';

@Controller()
export class EventcentersController {
    constructor(
        private readonly eventcentersService: EventcentersService,
    ) { }

    @MessagePattern(EVENTCENTERPATTERN.CREATEEVENTCENTER)
    create(@Payload() createEventCenterDto: CreateEventCenterDto, @Ctx() context: RmqContext,) {
        // const channel = context.getChannelRef();
        const message = context.getMessage();
        // console.log('Received message channel:', channel);
        console.log('Received message :', message);
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
    findAll(@Payload() data: { limit?: number, offset?: number, serviceProvider?: string, city?: string, location?: string, search?: string }) {
        const { limit, offset, serviceProvider, city, location, search} = data
        return from(this.eventcentersService.findAll(limit, offset, serviceProvider, city, location, search)).pipe(
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

    @MessagePattern(EVENTCENTERPATTERN.FINDALLBYUNIQUEEVENTCENTER)
    findAllWithUnique(@Payload() ids: string[]) {
        return from(this.eventcentersService.findAllWithUnique(ids)).pipe(
            catchError((err) => {
                console.error("Error in Event Service findAllWithUnique:", err);
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
                console.error("Error in Event Service:", err);
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

@Controller()
export class EventCenterSubscriptionController {
    constructor(private readonly subscriptionService: EventCenterSubscriptionService) {}

    @MessagePattern(EVENTCENTERSUBSCRIPTIONPATTERN.CREATE)
    create(@Payload() dto: CreateServiceSubscriptionDto) {
        return from(this.subscriptionService.create(dto)).pipe(
            catchError((err) => throwError(() => new RpcException({
                statusCode: err.response?.statusCode || 500,
                message: err.message || 'Internal Server Error',
                error: err.response?.error || 'Server error',
            })))
        );
    }

    @MessagePattern(EVENTCENTERSUBSCRIPTIONPATTERN.FINDALL)
    findAll(@Payload() data: { limit: number; offset: number; serviceId?: string }) {
        return from(this.subscriptionService.findAll(data.limit, data.offset, data.serviceId)).pipe(
            catchError((err) => throwError(() => new RpcException({
                statusCode: err.response?.statusCode || 500,
                message: err.message || 'Internal Server Error',
                error: err.response?.error || 'Server error',
            })))
        );
    }

    @MessagePattern(EVENTCENTERSUBSCRIPTIONPATTERN.FINDBYID)
    findOne(@Payload() id: string) {
        return from(this.subscriptionService.findOne(id)).pipe(
            catchError((err) => throwError(() => new RpcException({
                statusCode: err.response?.statusCode || 500,
                message: err.message || 'Internal Server Error',
                error: err.response?.error || 'Server error',
            })))
        );
    }

    @MessagePattern(EVENTCENTERSUBSCRIPTIONPATTERN.UPDATE)
    update(@Payload() data: { id: string; updateServiceSubscriptionDto: UpdateServiceSubscriptionDto }) {
        return from(this.subscriptionService.update(data.id, data.updateServiceSubscriptionDto)).pipe(
            catchError((err) => throwError(() => new RpcException({
                statusCode: err.response?.statusCode || 500,
                message: err.message || 'Internal Server Error',
                error: err.response?.error || 'Server error',
            })))
        );
    }

    @MessagePattern(EVENTCENTERSUBSCRIPTIONPATTERN.DELETE)
    remove(@Payload() data: { id: string; updaterId: string }) {
        return from(this.subscriptionService.remove(data.id, data.updaterId)).pipe(
            catchError((err) => throwError(() => new RpcException({
                statusCode: err.response?.statusCode || 500,
                message: err.message || 'Internal Server Error',
                error: err.response?.error || 'Server error',
            })))
        );
    }

    @MessagePattern(EVENTCENTERSUBSCRIPTIONPATTERN.ACTIVATEBYINVOICEID)
    activateByInvoiceId(@Payload() invoiceId: string) {
        return from(this.subscriptionService.activateByInvoiceId(invoiceId)).pipe(
            catchError((err) => throwError(() => new RpcException({
                statusCode: err.response?.statusCode || 500,
                message: err.message || 'Internal Server Error',
                error: err.response?.error || 'Server error',
            })))
        );
    }
}
