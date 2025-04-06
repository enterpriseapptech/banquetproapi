/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs/operators';
import { from, throwError } from 'rxjs';
import { SubscriptionPlansService } from './payments.service';
import { SUBSCRIPTIONPLANSPATTERN } from '@shared/contracts/payments/payments.pattern';
import { CreateSubscriptionPlanDto } from '@shared/contracts/payments/create-payments.dto';
import { UpdateSubscriptionPlanDto } from '@shared/contracts/payments/update-payments.dto';

@Controller()
export class SubscriptionPlanSController {
  constructor(private readonly SubscriptionPlansService: SubscriptionPlansService) { }

  @MessagePattern(SUBSCRIPTIONPLANSPATTERN.CREATE)
  create(@Payload() createSubscriptionPlanDto: CreateSubscriptionPlanDto) {
    return from(this.SubscriptionPlansService.create(createSubscriptionPlanDto)).pipe(
      catchError((err) => {
        console.error("Error in SubscriptionPlansService:", err);
        return throwError(() => new RpcException({
          statusCode: err.response.statusCode || 500,
          message: err.message || "Internal Server Error",
          error: err.response.error || "Sever error",
        }));

      })
    )
  }

  @MessagePattern(SUBSCRIPTIONPLANSPATTERN.FINDALL)
  findAll(@Payload() limit: number, @Payload() offset: number) {
    return from(this.SubscriptionPlansService.findAll(limit, offset)).pipe(
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

  @MessagePattern(SUBSCRIPTIONPLANSPATTERN.FINDBYID)
  findOne(@Payload() id: string) {
    return from(this.SubscriptionPlansService.findOne(id)).pipe(
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



  @MessagePattern(SUBSCRIPTIONPLANSPATTERN.UPDATE)
  update(@Payload() id: string, @Payload() updateSubscriptionPlanDto: UpdateSubscriptionPlanDto) {
    return from(this.SubscriptionPlansService.update(id, updateSubscriptionPlanDto)).pipe(
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

  @MessagePattern(SUBSCRIPTIONPLANSPATTERN.DELETE)
  remove(@Payload() id: string, @Payload() updaterId: string) {
    return from(this.SubscriptionPlansService.remove(id, updaterId)).pipe(
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


  // @MessagePattern(SUBSCRIPTIONPLANSPATTERN.PERMANENTDELETE)
  // permanentDelete(@Payload() id: string) {
  //   return from(this.SubscriptionPlansService.permanentDelete(id)).pipe(
  //     catchError((err) => {
  //       console.error("Error in UsersService:", err);
  //       return throwError(() => new RpcException({
  //         statusCode: err.response.statusCode || 500,
  //         message: err.message || "Internal Server Error",
  //         error: err.response.error || "Sever error",
  //       }));

  //     })
  //   );
  // }


}
