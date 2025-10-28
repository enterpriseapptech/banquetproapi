/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs/operators';
import { from, throwError } from 'rxjs';
import { FeaturedPlanService, FeesService, InvoiceService, PaymentsService, SubscriptionPlansService } from './payments.service';
import { FEATUREDPLANSPATTERN, FEESPATTERN, INVOICEPATTERN, PAYMENTMETHODPATTERN, PAYMENTPATTERN, SUBSCRIPTIONPLANSPATTERN } from '@shared/contracts/payments/payments.pattern';
import { CreateFeaturedPlanDto, CreateFeeDto, CreateInvoiceDto, CreatePaymentDto, CreatePaymentMethodDto, CreateSubscriptionPlanDto, GeneratePaymentDto } from '@shared/contracts/payments/create-payments.dto';
import { UpdateFeaturedPlanDto, UpdateFeeDto, UpdateInvoiceDto, UpdatePaymentDto, UpdatePaymentMethodDto, UpdateSubscriptionPlanDto } from '@shared/contracts/payments/update-payments.dto';

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

@Controller()
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

@Controller()
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

  @MessagePattern(FEESPATTERN.FINDALL)
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

  @MessagePattern(FEESPATTERN.FINDBYID)
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



  @MessagePattern(FEESPATTERN.UPDATE)
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

  @MessagePattern(FEESPATTERN.DELETE)
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


  // @MessagePattern(FEESPATTERN.PERMANENTDELETE)
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


@Controller()
export class PaymentsController {
  constructor(private readonly paymentService: PaymentsService ) { }

  @MessagePattern(PAYMENTPATTERN.INITIATE)
  initiate(@Payload() generatePaymentDto: GeneratePaymentDto) {
    return from(this.paymentService.initiate(generatePaymentDto)).pipe(
      catchError((err) => { 
        return throwError(() => new RpcException({
          statusCode: err.response.statusCode || 500,
          message: err.message || "Internal Server Error",
          error: err.response.error || "Sever error",
        }));

      })
    )
  }


  @MessagePattern(PAYMENTPATTERN.CREATE)
  create(@Payload() createPaymentDto: CreatePaymentDto) {

    return from(this.paymentService.create(createPaymentDto)).pipe(
      catchError((err) => {
        console.error("Error in paymentService:", err);
        return throwError(() => new RpcException({
          statusCode: err.response.statusCode || 500,
          message: err.message || "Internal Server Error",
          error: err.response.error || "Sever error",
        }));

      })
    )
  }

  @MessagePattern(PAYMENTPATTERN.FINDALL)
  findAll(@Payload() data: { limit: number, offset: number, search?: string}) {
    return from(this.paymentService.findAll(data.limit, data.offset, data.search)).pipe(
      catchError((err) => {
        console.error("Error in paymentService:", err);
        return throwError(() => new RpcException({
          statusCode: err.response.statusCode || 500,
          message: err.message || "Internal Server Error",
          error: err.response.error || "Sever error",
        }));

      })
    );
  }

  @MessagePattern(PAYMENTPATTERN.FINDBYID)
  findOne(@Payload() id: string) {
    return from(this.paymentService.findOne(id)).pipe(
      catchError((err) => {
        console.error("Error in paymentService:", err);
        return throwError(() => new RpcException({
          statusCode: err.response.statusCode || 500,
          message: err.message || "Internal Server Error",
          error: err.response.error || "Sever error",
        }));

      })
    );
  }



  @MessagePattern(PAYMENTPATTERN.UPDATE)
  update(@Payload() id: string, @Payload() updatePaymentDto: UpdatePaymentDto) {
    return from(this.paymentService.update(id, updatePaymentDto)).pipe(
      catchError((err) => {
        console.error("Error in paymentService:", err);
        return throwError(() => new RpcException({
          statusCode: err.response.statusCode || 500,
          message: err.message || "Internal Server Error",
          error: err.response.error || "Sever error",
        }));

      })
    );
  }

  @MessagePattern(PAYMENTPATTERN.DELETE)
  remove(@Payload() id: string, @Payload() updaterId: string) {
    return from(this.paymentService.remove(id, updaterId)).pipe(
      catchError((err) => {
        console.error("Error in paymentService:", err);
        return throwError(() => new RpcException({
          statusCode: err.response.statusCode || 500,
          message: err.message || "Internal Server Error",
          error: err.response.error || "Sever error",
        }));

      })
    );
  }


  // @MessagePattern(PAYMENTPATTERN.PERMANENTDELETE)
  // permanentDelete(@Payload() id: string) {
  //   return from(this.featuredPlanService.permanentDelete(id)).pipe(
  //     catchError((err) => {
  //       console.error("Error in paymentService:", err);
  //       return throwError(() => new RpcException({
  //         statusCode: err.response.statusCode || 500,
  //         message: err.message || "Internal Server Error",
  //         error: err.response.error || "Sever error",
  //       }));

  //     })
  //   );
  // }


}

@Controller()
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService ) { }

  
  @MessagePattern(INVOICEPATTERN.CREATE)
  create(@Payload() createInvoiceDto: CreateInvoiceDto) {
    return from(this.invoiceService.create(createInvoiceDto)).pipe(
      catchError((err) => {
        console.error("Error in InvoiceService:", err);
        return throwError(() => new RpcException({
          statusCode: err.response.statusCode || 500,
          message: err.message || "Internal Server Error",
          error: err.response.error || "Sever error",
        }));

      })
    )
  }

  
  @MessagePattern(INVOICEPATTERN.BOOKINGGENERATE)
  generate(@Payload() createInvoiceDto: CreateInvoiceDto) {

    return from(this.invoiceService.generate(createInvoiceDto)).pipe(
      catchError((err) => {
        console.error("Error in InvoiceService:", err);
        return throwError(() => new RpcException({
          statusCode: err.response.statusCode || 500,
          message: err.message || "Internal Server Error",
          error: err.response.error || "Sever error",
        }));

      })
    )
  }



  @MessagePattern(INVOICEPATTERN.FINDALL)
  findAll(@Payload() data: { limit: number, offset: number, subscriptionId?: string, bookingId?: string, userId?: string, status?: string, currency?: string, deleted?: boolean}) {
    const { limit, offset, subscriptionId, bookingId, userId, status, currency, deleted } = data
      return from(this.invoiceService.findAll(limit, offset, subscriptionId, bookingId, userId, status, currency, deleted)).pipe(
        catchError((err) => {
          console.error("Error in InvoiceService:", err);
          return throwError(() => new RpcException({
            statusCode: err.response.statusCode || 500,
            message: err.message || "Internal Server Error",
            error: err.response.error || "Sever error",
          })
        );

      })
    );
  }

  @MessagePattern(INVOICEPATTERN.FINDBYID)
  findOne(@Payload() id: string) {
    return from(this.invoiceService.findOne(id)).pipe(
      catchError((err) => {
        return throwError(() => new RpcException({
          statusCode: err.response.statusCode || 404,
          message: err.message || "Invoice not found",
          error: err.response.error || "Invoice not found",
        }));

      })
    );
  }



  @MessagePattern(INVOICEPATTERN.UPDATE)
  update(@Payload() id: string, @Payload() updateInvoiceDto: UpdateInvoiceDto) {
    return from(this.invoiceService.update(id, updateInvoiceDto)).pipe(
      catchError((err) => {
        console.error("Error in InvoiceService:", err);
        return throwError(() => new RpcException({
          statusCode: err.response.statusCode || 500,
          message: err.message || "Internal Server Error",
          error: err.response.error || "Sever error",
        }));

      })
    );
  }

  @MessagePattern(INVOICEPATTERN.DELETE)
  remove(@Payload() id: string, @Payload() updaterId: string) {
    return from(this.invoiceService.remove(id, updaterId)).pipe(
      catchError((err) => {
        console.error("Error in paymentService:", err);
        return throwError(() => new RpcException({
          statusCode: err.response.statusCode || 500,
          message: err.message || "Internal Server Error",
          error: err.response.error || "Sever error",
        }));

      })
    );
  }


  // @MessagePattern(PAYMENTPATTERN.PERMANENTDELETE)
  // permanentDelete(@Payload() id: string) {
  //   return from(this.featuredPlanService.permanentDelete(id)).pipe(
  //     catchError((err) => {
  //       console.error("Error in paymentService:", err);
  //       return throwError(() => new RpcException({
  //         statusCode: err.response.statusCode || 500,
  //         message: err.message || "Internal Server Error",
  //         error: err.response.error || "Sever error",
  //       }));

  //     })
  //   );
  // }


}