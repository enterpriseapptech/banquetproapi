/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs/operators';
import { from, throwError } from 'rxjs';
import { FeaturedPlanService, FeesService, SubscriptionPlansService } from './payments.service';
import { FEATUREDPLANSPATTERN, FEESPATTERN, SUBSCRIPTIONPLANSPATTERN } from '@shared/contracts/payments/payments.pattern';
import { CreateFeaturedPlanDto, CreateFeeDto, CreateSubscriptionPlanDto } from '@shared/contracts/payments/create-payments.dto';
import { UpdateFeaturedPlanDto, UpdateFeeDto, UpdateSubscriptionPlanDto } from '@shared/contracts/payments/update-payments.dto';

@Controller()
export class SubscriptionPlansController {
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

export class FeaturedPlanController {
  constructor(private readonly featuredPlanService: FeaturedPlanService) { }

  @MessagePattern(FEATUREDPLANSPATTERN.CREATE)
  create(@Payload() createFeaturedPlanDto: CreateFeaturedPlanDto) {
    return from(this.featuredPlanService.create(createFeaturedPlanDto)).pipe(
      catchError((err) => {
        console.error("Error in featuredPlanService:", err);
        return throwError(() => new RpcException({
          statusCode: err.response.statusCode || 500,
          message: err.message || "Internal Server Error",
          error: err.response.error || "Sever error",
        }));

      })
    )
  }

  @MessagePattern(FEATUREDPLANSPATTERN.FINDALL)
  findAll(@Payload() limit: number, @Payload() offset: number) {
    return from(this.featuredPlanService.findAll(limit, offset)).pipe(
      catchError((err) => {
        console.error("Error in featuredPlanService:", err);
        return throwError(() => new RpcException({
          statusCode: err.response.statusCode || 500,
          message: err.message || "Internal Server Error",
          error: err.response.error || "Sever error",
        }));

      })
    );
  }

  @MessagePattern(FEATUREDPLANSPATTERN.FINDBYID)
  findOne(@Payload() id: string) {
    return from(this.featuredPlanService.findOne(id)).pipe(
      catchError((err) => {
        console.error("Error in featuredPlanService:", err);
        return throwError(() => new RpcException({
          statusCode: err.response.statusCode || 500,
          message: err.message || "Internal Server Error",
          error: err.response.error || "Sever error",
        }));

      })
    );
  }



  @MessagePattern(FEATUREDPLANSPATTERN.UPDATE)
  update(@Payload() id: string, @Payload() updateFeaturedPlanDto: UpdateFeaturedPlanDto) {
    return from(this.featuredPlanService.update(id, updateFeaturedPlanDto)).pipe(
      catchError((err) => {
        console.error("Error in featuredPlanService:", err);
        return throwError(() => new RpcException({
          statusCode: err.response.statusCode || 500,
          message: err.message || "Internal Server Error",
          error: err.response.error || "Sever error",
        }));

      })
    );
  }

  @MessagePattern(FEATUREDPLANSPATTERN.DELETE)
  remove(@Payload() id: string, @Payload() updaterId: string) {
    return from(this.featuredPlanService.remove(id, updaterId)).pipe(
      catchError((err) => {
        console.error("Error in featuredPlanService:", err);
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
  //   return from(this.featuredPlanService.permanentDelete(id)).pipe(
  //     catchError((err) => {
  //       console.error("Error in featuredPlanService:", err);
  //       return throwError(() => new RpcException({
  //         statusCode: err.response.statusCode || 500,
  //         message: err.message || "Internal Server Error",
  //         error: err.response.error || "Sever error",
  //       }));

  //     })
  //   );
  // }


}

export class FeesController {
  constructor(private readonly feesService: FeesService) { }

  @MessagePattern(FEESPATTERN.CREATE)
  create(@Payload() createFeeDto: CreateFeeDto) {
    return from(this.feesService.create(createFeeDto)).pipe(
      catchError((err) => {
        console.error("Error in feesService:", err);
        return throwError(() => new RpcException({
          statusCode: err.response.statusCode || 500,
          message: err.message || "Internal Server Error",
          error: err.response.error || "Sever error",
        }));

      })
    )
  }

  @MessagePattern(FEATUREDPLANSPATTERN.FINDALL)
  findAll(@Payload() limit: number, @Payload() offset: number) {
    return from(this.feesService.findAll(limit, offset)).pipe(
      catchError((err) => {
        console.error("Error in feesService:", err);
        return throwError(() => new RpcException({
          statusCode: err.response.statusCode || 500,
          message: err.message || "Internal Server Error",
          error: err.response.error || "Sever error",
        }));

      })
    );
  }

  @MessagePattern(FEATUREDPLANSPATTERN.FINDBYID)
  findOne(@Payload() id: string) {
    return from(this.feesService.findOne(id)).pipe(
      catchError((err) => {
        console.error("Error in feesService:", err);
        return throwError(() => new RpcException({
          statusCode: err.response.statusCode || 500,
          message: err.message || "Internal Server Error",
          error: err.response.error || "Sever error",
        }));

      })
    );
  }



  @MessagePattern(FEATUREDPLANSPATTERN.UPDATE)
  update(@Payload() id: string, @Payload() updateFeeDto: UpdateFeeDto) {
    return from(this.feesService.update(id, updateFeeDto)).pipe(
      catchError((err) => {
        console.error("Error in feesService:", err);
        return throwError(() => new RpcException({
          statusCode: err.response.statusCode || 500,
          message: err.message || "Internal Server Error",
          error: err.response.error || "Sever error",
        }));

      })
    );
  }

  @MessagePattern(FEATUREDPLANSPATTERN.DELETE)
  remove(@Payload() id: string, @Payload() updaterId: string) {
    return from(this.feesService.remove(id, updaterId)).pipe(
      catchError((err) => {
        console.error("Error in feesService:", err);
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
  //   return from(this.featuredPlanService.permanentDelete(id)).pipe(
  //     catchError((err) => {
  //       console.error("Error in feesService:", err);
  //       return throwError(() => new RpcException({
  //         statusCode: err.response.statusCode || 500,
  //         message: err.message || "Internal Server Error",
  //         error: err.response.error || "Sever error",
  //       }));

  //     })
  //   );
  // }


}