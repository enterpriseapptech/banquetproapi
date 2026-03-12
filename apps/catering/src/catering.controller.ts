import { Controller } from '@nestjs/common';
import { CateringService, CateringSubscriptionService } from './catering.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { CATERINGPATTERN, CATERINGSUBSCRIPTIONPATTERN, CreateCateringDto, CreateServiceSubscriptionDto, UpdateCateringDto, UpdateServiceSubscriptionDto } from '@shared/contracts/catering';
import { catchError, from, throwError } from 'rxjs';


@Controller()
export class CateringController {
    constructor(private readonly cateringService: CateringService) { }

    @MessagePattern(CATERINGPATTERN.CREATE)
    create(@Payload() createCateringDto: CreateCateringDto) {
        return from(this.cateringService.create(createCateringDto)).pipe(
            catchError((err) => {
                console.error("Error in Catering Service:", err);
                return throwError(() => new RpcException({
                    statusCode: err.response.statusCode || 500,
                    message: err.message || "Internal Server Error",
                    error: err.response.error || "Sever error",
                }));

            })
        );
    }

    
    @MessagePattern(CATERINGPATTERN.FINDALLBYUNIQUEEVENTCENTER)
    findAllWithUnique(@Payload() ids: string[]) {
        return from(this.cateringService.findAllWithUnique(ids)).pipe(
            catchError((err) => {
                console.error("Error in Catering Service:", err);
                return throwError(() => new RpcException({
                    statusCode: err.response.statusCode || 500,
                    message: err.message || "Internal Server Error",
                    error: err.response.error || "Sever error",
                }));

            })
        );

    }


    @MessagePattern(CATERINGPATTERN.FINDALL)
    findAll(@Payload() data: { limit?: number, offset?: number, serviceProvider?: string, city?: string, state?: string, country?: string, search?: string }) {
        const { limit, offset, serviceProvider, city, state, country, search } = data
        return from(this.cateringService.findAll(limit, offset, serviceProvider, city, state, country, search)).pipe(
            catchError((err) => {
                console.error("Error in Catering Service:", err);
                return throwError(() => new RpcException({
                    statusCode: err.response.statusCode || 500,
                    message: err.message || "Internal Server Error",
                    error: err.response.error || "Sever error",
                }));

            })
        );

    }

    @MessagePattern(CATERINGPATTERN.FINDONEBYID)
    findOne(@Payload() id: string) {
        return from(this.cateringService.findOne(id)).pipe(
            catchError((err) => {
                console.error("Error in Catering Service:", err);
                return throwError(() => new RpcException({
                    statusCode: err.response.statusCode || 500,
                    message: err.message || "Internal Server Error",
                    error: err.response.error || "Sever error",
                }));

            })
        );

    }

    @MessagePattern(CATERINGPATTERN.UPDATE)
    update(@Payload() data: { id: string, updateCateringDto: UpdateCateringDto }) {
        const { id, updateCateringDto } = data
        return from(this.cateringService.update(id, updateCateringDto)).pipe(
            catchError((err) => {
                console.error("Error in  Catering Service:", err);
                return throwError(() => new RpcException({
                    statusCode: err.response.statusCode || 500,
                    message: err.message || "Internal Server Error",
                    error: err.response.error || "Sever error",
                }));

            })
        );

    }

    @MessagePattern(CATERINGPATTERN.DELETE)
    remove(@Payload() data: { id: string, updaterId: string }) {
        const { id, updaterId } = data
        return from(this.cateringService.remove(id, updaterId)).pipe(
            catchError((err) => {
                console.error("Error in Catering Service:", err);
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
export class CateringSubscriptionController {
    constructor(private readonly subscriptionService: CateringSubscriptionService) {}

    @MessagePattern(CATERINGSUBSCRIPTIONPATTERN.CREATE)
    create(@Payload() dto: CreateServiceSubscriptionDto) {
        return from(this.subscriptionService.create(dto)).pipe(
            catchError((err) => throwError(() => new RpcException({
                statusCode: err.response?.statusCode || 500,
                message: err.message || 'Internal Server Error',
                error: err.response?.error || 'Server error',
            })))
        );
    }

    @MessagePattern(CATERINGSUBSCRIPTIONPATTERN.FINDALL)
    findAll(@Payload() data: { limit: number; offset: number; serviceId?: string }) {
        return from(this.subscriptionService.findAll(data.limit, data.offset, data.serviceId)).pipe(
            catchError((err) => throwError(() => new RpcException({
                statusCode: err.response?.statusCode || 500,
                message: err.message || 'Internal Server Error',
                error: err.response?.error || 'Server error',
            })))
        );
    }

    @MessagePattern(CATERINGSUBSCRIPTIONPATTERN.FINDBYID)
    findOne(@Payload() id: string) {
        return from(this.subscriptionService.findOne(id)).pipe(
            catchError((err) => throwError(() => new RpcException({
                statusCode: err.response?.statusCode || 500,
                message: err.message || 'Internal Server Error',
                error: err.response?.error || 'Server error',
            })))
        );
    }

    @MessagePattern(CATERINGSUBSCRIPTIONPATTERN.UPDATE)
    update(@Payload() data: { id: string; updateServiceSubscriptionDto: UpdateServiceSubscriptionDto }) {
        return from(this.subscriptionService.update(data.id, data.updateServiceSubscriptionDto)).pipe(
            catchError((err) => throwError(() => new RpcException({
                statusCode: err.response?.statusCode || 500,
                message: err.message || 'Internal Server Error',
                error: err.response?.error || 'Server error',
            })))
        );
    }

    @MessagePattern(CATERINGSUBSCRIPTIONPATTERN.DELETE)
    remove(@Payload() data: { id: string; updaterId: string }) {
        return from(this.subscriptionService.remove(data.id, data.updaterId)).pipe(
            catchError((err) => throwError(() => new RpcException({
                statusCode: err.response?.statusCode || 500,
                message: err.message || 'Internal Server Error',
                error: err.response?.error || 'Server error',
            })))
        );
    }

    @MessagePattern(CATERINGSUBSCRIPTIONPATTERN.ACTIVATEBYINVOICEID)
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
