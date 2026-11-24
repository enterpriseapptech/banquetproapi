/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller } from '@nestjs/common';
import { CateringService } from './catering.service';
import { EventPattern, MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { CATERINGPATTERN, CATERINGREFUNDPOLICYPATTERN, CreateCateringDto, UpdateCateringDto } from '@shared/contracts/catering';
import { catchError, from, throwError } from 'rxjs';
import { UpdateServiceSubscriptionDto } from '@shared/contracts/shared';
import { toRpcException } from '@shared/contracts/rpc-error';


@Controller()
export class CateringController {
    constructor(private readonly cateringService: CateringService) { }

    @MessagePattern(CATERINGPATTERN.CREATE)
    create(@Payload() createCateringDto: CreateCateringDto) {
        return from(this.cateringService.create(createCateringDto)).pipe(
            catchError((err) => {
                console.error("Error in Catering Service:", err);
                return throwError(() => toRpcException(err));

            })
        );
    }

    
    @MessagePattern(CATERINGPATTERN.FINDALLBYUNIQUEEVENTCENTER)
    findAllWithUnique(@Payload() ids: string[]) {
        return from(this.cateringService.findAllWithUnique(ids)).pipe(
            catchError((err) => {
                console.error("Error in Catering Service:", err);
                return throwError(() => toRpcException(err));

            })
        );

    }


    @MessagePattern(CATERINGPATTERN.FINDALL)
    findAll(@Payload() data: { limit?: number, offset?: number, serviceProvider?: string, city?: string, state?: string, country?: string, search?: string }) {
        const { limit, offset, serviceProvider, city, state, country, search } = data
        return from(this.cateringService.findAll(limit, offset, serviceProvider, city, state, country, search)).pipe(
            catchError((err) => {
                console.error("Error in Catering Service:", err);
                return throwError(() => toRpcException(err));

            })
        );

    }

    @MessagePattern(CATERINGPATTERN.FINDONEBYID)
    findOne(@Payload() id: string) {
        return from(this.cateringService.findOne(id)).pipe(
            catchError((err) => {
                console.error("Error in Catering Service:", err);
                return throwError(() => toRpcException(err));

            })
        );

    }

    @MessagePattern(CATERINGPATTERN.UPDATE)
    update(@Payload() data: { id: string, updateCateringDto: UpdateCateringDto }) {
        const { id, updateCateringDto } = data
        return from(this.cateringService.update(id, updateCateringDto)).pipe(
            catchError((err) => {
                console.error("Error in  Catering Service:", err);
                return throwError(() => toRpcException(err));

            })
        );

    }

    @MessagePattern(CATERINGPATTERN.DELETE)
    remove(@Payload() data: { id: string, updaterId: string }) {
        const { id, updaterId } = data
        return from(this.cateringService.remove(id, updaterId)).pipe(
            catchError((err) => {
                console.error("Error in Catering Service:", err);
                return throwError(() => toRpcException(err));

            })
        );

    }

    @EventPattern(CATERINGPATTERN.UPDATESUBSCRIPTION)
    updateSubscription(@Payload() data: UpdateServiceSubscriptionDto) {
        return from(this.cateringService.updateSubscriptionStatus(data)).pipe(
            catchError((err) => {
                console.error("Error in Catering Service:", err);
                return throwError(() => toRpcException(err));

            })
        );
    }

    // @MessagePattern(CATERINGREFUNDPOLICYPATTERN.UPSERT)
    // upsertRefundPolicy(@Payload() data: { cateringId: string; allowRefunds?: boolean; refundWindowDays?: number; tiers?: any[] }) {
    //     const { cateringId, ...dto } = data;
    //     return from(this.cateringService.upsertRefundPolicy(cateringId, dto)).pipe(
    //         catchError((err) => throwError(() => new RpcException({
    //             statusCode: err.response?.statusCode || 500,
    //             message: err.message || 'Internal Server Error',
    //             error: err.response?.error || 'Server error',
    //         }))),
    //     );
    // }

    // @MessagePattern(CATERINGREFUNDPOLICYPATTERN.FINDBYSERVICEID)
    // getRefundPolicy(@Payload() cateringId: string) {
    //     return from(this.cateringService.getRefundPolicy(cateringId)).pipe(
    //         catchError((err) => throwError(() => new RpcException({
    //             statusCode: err.response?.statusCode || 500,
    //             message: err.message || 'Internal Server Error',
    //             error: err.response?.error || 'Server error',
    //         }))),
    //     );
    // }
}

