/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs/operators';
import { from, throwError } from 'rxjs';
import { DisputeService, FeaturedPlanService, FeesService, InvoiceService, PaymentsService, RefundService, SubscriptionPlansService, SubscriptionService } from './payments.service';
import { DISPUTEPATTERN, FEATUREDPLANSPATTERN, FEESPATTERN, INVOICEPATTERN, PAYMENTPATTERN, REFUNDPATTERN, SUBSCRIPTIONPATTERN, SUBSCRIPTIONPLANSPATTERN } from '@shared/contracts/payments/payments.pattern';
import { CreateDisputeDto, CreateFeaturedPlanDto, CreateFeeDto, CreateInvoiceDto, CreatePaymentDto,  CreateRefundDto, CreateServiceSubscriptionInvoiceDto, CreateSubscriptionDto, CreateSubscriptionPlanDto, GeneratePaymentDto } from '@shared/contracts/payments/create-payments.dto';
import { UpdateDisputeDto, UpdateFeaturedPlanDto, UpdateFeeDto, UpdateInvoiceDto, UpdatePaymentDto, UpdateRefundDto, UpdateSubscriptionDto, UpdateSubscriptionPlanDto } from '@shared/contracts/payments/update-payments.dto';

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
  findAll(@Payload() data: { limit: number; offset: number }) {
    const { limit, offset } = data;
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
  update(@Payload() data: { id: string; updateSubscriptionPlanDto: UpdateSubscriptionPlanDto }) {
    const { id, updateSubscriptionPlanDto } = data;
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
  remove(@Payload() data: { id: string; updaterId: string }) {
    const { id, updaterId } = data;
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
  findAll(@Payload() data: { limit: number; offset: number }) {
    const { limit, offset } = data;
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
  update(@Payload() data: { id: string; updateFeaturedPlanDto: UpdateFeaturedPlanDto }) {
    const { id, updateFeaturedPlanDto } = data;
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
  remove(@Payload() data: { id: string; updaterId: string }) {
    const { id, updaterId } = data;
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
  findAll(@Payload() data: { limit: number; offset: number }) {
    const { limit, offset } = data;
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
  update(@Payload() data: { id: string; updateFeeDto: UpdateFeeDto }) {
    const { id, updateFeeDto } = data;
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
  remove(@Payload() data: { id: string; updaterId: string }) {
    const { id, updaterId } = data;
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
  update(@Payload() data: { id: string; updatePaymentDto: UpdatePaymentDto }) {
    const { id, updatePaymentDto } = data;
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
  remove(@Payload() data: { id: string; updaterId: string }) {
    const { id, updaterId } = data;
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

  
  @MessagePattern(INVOICEPATTERN.CREATESECONDINVOICE)
  createSecondInvoice(@Payload() createInvoiceDto: CreateInvoiceDto) {
    return from(this.invoiceService.createSecondInvoice(createInvoiceDto)).pipe(
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
  update(@Payload() data: { id: string; updateInvoiceDto: UpdateInvoiceDto }) {
    const { id, updateInvoiceDto } = data;
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
  remove(@Payload() data: { id: string; updaterId: string }) {
    const { id, updaterId } = data;
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

  @MessagePattern(INVOICEPATTERN.CREATESERVICESUBSCRIPTIONINVOICE)
  createServiceSubscriptionInvoice(@Payload() dto: CreateServiceSubscriptionInvoiceDto) {
    return from(this.invoiceService.createServiceSubscriptionInvoice(dto)).pipe(
      catchError((err) => {
        console.error("Error in InvoiceService:", err);
        return throwError(() => new RpcException({
          statusCode: err.response?.statusCode || 500,
          message: err.message || 'Internal Server Error',
          error: err.response?.error || 'Server error',
        }));
      })
    );
  }

}

@Controller()
export class RefundController {
  constructor(private readonly refundService: RefundService) {}

  @MessagePattern(REFUNDPATTERN.CREATE)
  create(@Payload() createRefundDto: CreateRefundDto) {
    return from(this.refundService.create(createRefundDto)).pipe(
      catchError((err) => throwError(() => new RpcException({
        statusCode: err.response?.statusCode || 500,
        message: err.message || 'Internal Server Error',
        error: err.response?.error || 'Server error',
      })))
    );
  }

  @MessagePattern(REFUNDPATTERN.FINDALL)
  findAll(@Payload() data: { limit: number; offset: number; paymentId?: string }) {
    return from(this.refundService.findAll(data.limit, data.offset, data.paymentId)).pipe(
      catchError((err) => throwError(() => new RpcException({
        statusCode: err.response?.statusCode || 500,
        message: err.message || 'Internal Server Error',
        error: err.response?.error || 'Server error',
      })))
    );
  }

  @MessagePattern(REFUNDPATTERN.FINDBYID)
  findOne(@Payload() id: string) {
    return from(this.refundService.findOne(id)).pipe(
      catchError((err) => throwError(() => new RpcException({
        statusCode: err.response?.statusCode || 500,
        message: err.message || 'Internal Server Error',
        error: err.response?.error || 'Server error',
      })))
    );
  }

  @MessagePattern(REFUNDPATTERN.UPDATE)
  update(@Payload() data: { id: string; updateRefundDto: UpdateRefundDto }) {
    return from(this.refundService.update(data.id, data.updateRefundDto)).pipe(
      catchError((err) => throwError(() => new RpcException({
        statusCode: err.response?.statusCode || 500,
        message: err.message || 'Internal Server Error',
        error: err.response?.error || 'Server error',
      })))
    );
  }

  @MessagePattern(REFUNDPATTERN.DELETE)
  remove(@Payload() data: { id: string; updaterId: string }) {
    return from(this.refundService.remove(data.id, data.updaterId)).pipe(
      catchError((err) => throwError(() => new RpcException({
        statusCode: err.response?.statusCode || 500,
        message: err.message || 'Internal Server Error',
        error: err.response?.error || 'Server error',
      })))
    );
  }
}

@Controller()
export class DisputeController {
  constructor(private readonly disputeService: DisputeService) {}

  @MessagePattern(DISPUTEPATTERN.CREATE)
  create(@Payload() createDisputeDto: CreateDisputeDto) {
    return from(this.disputeService.create(createDisputeDto)).pipe(
      catchError((err) => throwError(() => new RpcException({
        statusCode: err.response?.statusCode || 500,
        message: err.message || 'Internal Server Error',
        error: err.response?.error || 'Server error',
      })))
    );
  }

  @MessagePattern(DISPUTEPATTERN.FINDALL)
  findAll(@Payload() data: { limit: number; offset: number; userId?: string; paymentId?: string }) {
    return from(this.disputeService.findAll(data.limit, data.offset, data.userId, data.paymentId)).pipe(
      catchError((err) => throwError(() => new RpcException({
        statusCode: err.response?.statusCode || 500,
        message: err.message || 'Internal Server Error',
        error: err.response?.error || 'Server error',
      })))
    );
  }

  @MessagePattern(DISPUTEPATTERN.FINDBYID)
  findOne(@Payload() id: string) {
    return from(this.disputeService.findOne(id)).pipe(
      catchError((err) => throwError(() => new RpcException({
        statusCode: err.response?.statusCode || 500,
        message: err.message || 'Internal Server Error',
        error: err.response?.error || 'Server error',
      })))
    );
  }

  @MessagePattern(DISPUTEPATTERN.UPDATE)
  update(@Payload() data: { id: string; updateDisputeDto: UpdateDisputeDto }) {
    return from(this.disputeService.update(data.id, data.updateDisputeDto)).pipe(
      catchError((err) => throwError(() => new RpcException({
        statusCode: err.response?.statusCode || 500,
        message: err.message || 'Internal Server Error',
        error: err.response?.error || 'Server error',
      })))
    );
  }

  @MessagePattern(DISPUTEPATTERN.DELETE)
  remove(@Payload() data: { id: string; updaterId: string }) {
    return from(this.disputeService.remove(data.id, data.updaterId)).pipe(
      catchError((err) => throwError(() => new RpcException({
        statusCode: err.response?.statusCode || 500,
        message: err.message || 'Internal Server Error',
        error: err.response?.error || 'Server error',
      })))
    );
  }
}

@Controller()
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @MessagePattern(SUBSCRIPTIONPATTERN.CREATE)
  create(@Payload() createSubscriptionDto: CreateSubscriptionDto) {
    return from(this.subscriptionService.create(createSubscriptionDto)).pipe(
      catchError((err) => throwError(() => new RpcException({
        statusCode: err.response?.statusCode || 500,
        message: err.message || 'Internal Server Error',
        error: err.response?.error || 'Server error',
      })))
    );
  }

  @MessagePattern(SUBSCRIPTIONPATTERN.FINDALL)
  findAll(@Payload() data: { limit: number; offset: number; serviceProviderId?: string; status?: string }) {
    return from(this.subscriptionService.findAll(data.limit, data.offset, data.serviceProviderId, data.status)).pipe(
      catchError((err) => throwError(() => new RpcException({
        statusCode: err.response?.statusCode || 500,
        message: err.message || 'Internal Server Error',
        error: err.response?.error || 'Server error',
      })))
    );
  }

  @MessagePattern(SUBSCRIPTIONPATTERN.FINDBYID)
  findOne(@Payload() id: string) {
    return from(this.subscriptionService.findOne(id)).pipe(
      catchError((err) => throwError(() => new RpcException({
        statusCode: err.response?.statusCode || 500,
        message: err.message || 'Internal Server Error',
        error: err.response?.error || 'Server error',
      })))
    );
  }

  @MessagePattern(SUBSCRIPTIONPATTERN.UPDATE)
  update(@Payload() data: { id: string; updateSubscriptionDto: UpdateSubscriptionDto }) {
    return from(this.subscriptionService.update(data.id, data.updateSubscriptionDto)).pipe(
      catchError((err) => throwError(() => new RpcException({
        statusCode: err.response?.statusCode || 500,
        message: err.message || 'Internal Server Error',
        error: err.response?.error || 'Server error',
      })))
    );
  }

  @MessagePattern(SUBSCRIPTIONPATTERN.DELETE)
  remove(@Payload() data: { id: string; updaterId: string }) {
    return from(this.subscriptionService.remove(data.id, data.updaterId)).pipe(
      catchError((err) => throwError(() => new RpcException({
        statusCode: err.response?.statusCode || 500,
        message: err.message || 'Internal Server Error',
        error: err.response?.error || 'Server error',
      })))
    );
  }
}