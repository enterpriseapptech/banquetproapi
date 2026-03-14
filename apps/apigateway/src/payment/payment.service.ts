import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PAYMENT_CLIENT } from '@shared/contracts';
import { CreateDisputeDto, CreateFeaturedPlanDto, CreateFeeDto, CreateInvoiceDto, CreatePaymentDto, CreatePaymentMethodDto, CreateRefundDto, CreateSecondInvoiceDto, CreateSubscriptionDto, CreateSubscriptionPlanDto, DisputeDto, FeaturedPlanDto, FeesDto, GeneratePaymentDto, InvoiceDto, INVOICEPATTERN, PaymentDto, PaymentMethodDto, PAYMENTMETHODPATTERN, PAYMENTPATTERN, RefundDto, SubscriptionDto, SubscriptionPlanDto, UpdateDisputeDto, UpdateFeaturedPlanDto, UpdateFeeDto, UpdateInvoiceDto, UpdatePaymentDto, UpdatePaymentMethodDto, UpdateRefundDto, UpdateSubscriptionDto, UpdateSubscriptionPlanDto, FEATUREDPLANSPATTERN, FEESPATTERN, SUBSCRIPTIONPLANSPATTERN, SUBSCRIPTIONPATTERN, REFUNDPATTERN, DISPUTEPATTERN } from '@shared/contracts/payments';

@Injectable()
export class PaymentService {
    constructor(
        @Inject(PAYMENT_CLIENT) private readonly paymentClient: ClientProxy
    ) { }

    initiate(generatePaymentDto: GeneratePaymentDto) {
        return this.paymentClient.send<string, GeneratePaymentDto>(PAYMENTPATTERN.INITIATE, generatePaymentDto)
    }

    create(createPaymentDto: CreatePaymentDto) {
        return this.paymentClient.send<PaymentDto, CreatePaymentDto>(PAYMENTPATTERN.CREATE, createPaymentDto)
    }

    findAll(limit: number, offset: number, search?: string) {
        return this.paymentClient.send<{ count: number; docs: PaymentDto[] }, {limit: number, offset: number, search?: string}>(PAYMENTPATTERN.FINDALL, {limit, offset, search})
    }

    findOne(id: string) {
        return this.paymentClient.send<PaymentDto, string>(PAYMENTPATTERN.FINDBYID, id)
    }

    update(id: string, updatePaymentDto: UpdatePaymentDto) {
        return this.paymentClient.send<PaymentDto, { id: string, updatePaymentDto: UpdatePaymentDto }>(PAYMENTPATTERN.UPDATE, {
            id,
            updatePaymentDto
        })
    }

    read(id: string) {
        return this.paymentClient.send<PaymentDto, { id: string}>(PAYMENTPATTERN.UPDATE, { id})
    }

    readAll(userId: string) {
        return this.paymentClient.send<PaymentDto, {userId: string}>(PAYMENTPATTERN.UPDATE, {userId})
    }

    remove(id: string, updaterId: any) {
        return this.paymentClient.send<PaymentDto, { id: string, updaterId: string }>(PAYMENTPATTERN.DELETE, { id, updaterId })
    }

    permanentDelete(id: string) {
        return this.paymentClient.send<PaymentDto, { id: string}>(PAYMENTPATTERN.DELETE, { id})
    }
 
}

@Injectable()
export class PaymentMethodService {
    constructor(
        @Inject(PAYMENT_CLIENT) private readonly paymentMethodClient: ClientProxy
    ) { }

    create(createPaymentMethodDto: CreatePaymentMethodDto) {
        // upload to cloudinary here
        // createPaymentMethodDto.providerLogo = cloduinary.url
        return this.paymentMethodClient.send<PaymentMethodDto, CreatePaymentMethodDto>(PAYMENTMETHODPATTERN.CREATE, createPaymentMethodDto)
    }

    findAll(limit: number, offset: number, search?: string) {
        return this.paymentMethodClient.send<{ count: number; docs: PaymentMethodDto[] }, {limit: number, offset: number, search?: string}>(PAYMENTMETHODPATTERN.FINDALL, {limit, offset, search})
    }

    findOne(id: string) {
        return this.paymentMethodClient.send<PaymentMethodDto, string>(PAYMENTMETHODPATTERN.FINDBYID, id)
    }

    update(id: string, updatePaymentMethodDto: UpdatePaymentMethodDto) {
        return this.paymentMethodClient.send<PaymentMethodDto, { id: string, updatePaymentMethodDto: UpdatePaymentMethodDto }>(PAYMENTMETHODPATTERN.UPDATE, {
            id,
            updatePaymentMethodDto
        })
    }

    permanentDelete(id: string) {
        return this.paymentMethodClient.send<PaymentMethodDto, { id: string}>(PAYMENTMETHODPATTERN.PERMANENTDELETE, { id})
    }
}


@Injectable()
export class InvoiceService {
    constructor(
        @Inject(PAYMENT_CLIENT) private readonly invoiceClient: ClientProxy
    ) { }

    create(createInvoiceDto: CreateInvoiceDto) {
        return this.invoiceClient.send<InvoiceDto, CreateInvoiceDto>(INVOICEPATTERN.CREATE, createInvoiceDto)
    }

    createSecondInvoice(createInvoiceDto: CreateSecondInvoiceDto) {

        return this.invoiceClient.send<InvoiceDto, CreateSecondInvoiceDto>(INVOICEPATTERN.CREATESECONDINVOICE, createInvoiceDto)
    }

    findAll(limit: number, offset: number, subscriptionId?: string, bookingId?: string, userId?: string, status?: string, currency?: string, deleted?: boolean) {
        return this.invoiceClient.send<{ count: number; docs: InvoiceDto[] }, {limit: number, offset: number, subscriptionId?: string, bookingId?: string, userId?: string, status?: string, currency?: string, deleted?: boolean}>(INVOICEPATTERN.FINDALL, {limit, offset, subscriptionId, bookingId, userId, status, currency, deleted})
    }

    findOne(id: string) {
        return this.invoiceClient.send<InvoiceDto, string>(INVOICEPATTERN.FINDBYID, id)
    }

    update(id: string, updateInvoiceDto: UpdateInvoiceDto) {
        return this.invoiceClient.send<InvoiceDto, { id: string, updateInvoiceDto: UpdateInvoiceDto }>(INVOICEPATTERN.UPDATE, {
            id,
            updateInvoiceDto
        })
    }

    read(id: string) {
        return this.invoiceClient.send<InvoiceDto, { id: string}>(INVOICEPATTERN.UPDATE, { id})
    }

    readAll(userId: string) {
        return this.invoiceClient.send<InvoiceDto, {userId: string}>(INVOICEPATTERN.UPDATE, {userId})
    }

    remove(id: string, updaterId: any) {
        return this.invoiceClient.send<InvoiceDto, { id: string, updaterId: string }>(INVOICEPATTERN.DELETE, { id, updaterId })
    }

    permanentDelete(id: string) {
        return this.invoiceClient.send<PaymentDto, { id: string}>(INVOICEPATTERN.DELETE, { id})
    }

}

@Injectable()
export class SubscriptionPlanService {
    constructor(@Inject(PAYMENT_CLIENT) private readonly client: ClientProxy) {}

    create(dto: CreateSubscriptionPlanDto) {
        return this.client.send<SubscriptionPlanDto, CreateSubscriptionPlanDto>(SUBSCRIPTIONPLANSPATTERN.CREATE, dto);
    }

    findAll(limit: number, offset: number) {
        return this.client.send<{ count: number; docs: SubscriptionPlanDto[] }, { limit: number; offset: number }>(SUBSCRIPTIONPLANSPATTERN.FINDALL, { limit, offset });
    }

    findOne(id: string) {
        return this.client.send<SubscriptionPlanDto, string>(SUBSCRIPTIONPLANSPATTERN.FINDBYID, id);
    }

    update(id: string, dto: UpdateSubscriptionPlanDto) {
        return this.client.send<SubscriptionPlanDto, { id: string; updateSubscriptionPlanDto: UpdateSubscriptionPlanDto }>(SUBSCRIPTIONPLANSPATTERN.UPDATE, { id, updateSubscriptionPlanDto: dto });
    }

    remove(id: string, updaterId: string) {
        return this.client.send<SubscriptionPlanDto, { id: string; updaterId: string }>(SUBSCRIPTIONPLANSPATTERN.DELETE, { id, updaterId });
    }
}

@Injectable()
export class FeaturedPlanService {
    constructor(@Inject(PAYMENT_CLIENT) private readonly client: ClientProxy) {}

    create(dto: CreateFeaturedPlanDto) {
        return this.client.send<FeaturedPlanDto, CreateFeaturedPlanDto>(FEATUREDPLANSPATTERN.CREATE, dto);
    }

    findAll(limit: number, offset: number) {
        return this.client.send<{ count: number; docs: FeaturedPlanDto[] }, { limit: number; offset: number }>(FEATUREDPLANSPATTERN.FINDALL, { limit, offset });
    }

    findOne(id: string) {
        return this.client.send<FeaturedPlanDto, string>(FEATUREDPLANSPATTERN.FINDBYID, id);
    }

    update(id: string, dto: UpdateFeaturedPlanDto) {
        return this.client.send<FeaturedPlanDto, { id: string; updateFeaturedPlanDto: UpdateFeaturedPlanDto }>(FEATUREDPLANSPATTERN.UPDATE, { id, updateFeaturedPlanDto: dto });
    }

    remove(id: string, updaterId: string) {
        return this.client.send<FeaturedPlanDto, { id: string; updaterId: string }>(FEATUREDPLANSPATTERN.DELETE, { id, updaterId });
    }
}

@Injectable()
export class FeesService {
    constructor(@Inject(PAYMENT_CLIENT) private readonly client: ClientProxy) {}

    create(dto: CreateFeeDto) {
        return this.client.send<FeesDto, CreateFeeDto>(FEESPATTERN.CREATE, dto);
    }

    findAll(limit: number, offset: number) {
        return this.client.send<{ count: number; docs: FeesDto[] }, { limit: number; offset: number }>(FEESPATTERN.FINDALL, { limit, offset });
    }

    findOne(id: string) {
        return this.client.send<FeesDto, string>(FEESPATTERN.FINDBYID, id);
    }

    update(id: string, dto: UpdateFeeDto) {
        return this.client.send<FeesDto, { id: string; updateFeeDto: UpdateFeeDto }>(FEESPATTERN.UPDATE, { id, updateFeeDto: dto });
    }

    remove(id: string, updaterId: string) {
        return this.client.send<FeesDto, { id: string; updaterId: string }>(FEESPATTERN.DELETE, { id, updaterId });
    }
}

@Injectable()
export class RefundService {
    constructor(@Inject(PAYMENT_CLIENT) private readonly client: ClientProxy) {}

    create(dto: CreateRefundDto) {
        return this.client.send<RefundDto, CreateRefundDto>(REFUNDPATTERN.CREATE, dto);
    }

    findAll(limit: number, offset: number, paymentId?: string) {
        return this.client.send<{ count: number; docs: RefundDto[] }, { limit: number; offset: number; paymentId?: string }>(REFUNDPATTERN.FINDALL, { limit, offset, paymentId });
    }

    findOne(id: string) {
        return this.client.send<RefundDto, string>(REFUNDPATTERN.FINDBYID, id);
    }

    update(id: string, dto: UpdateRefundDto) {
        return this.client.send<RefundDto, { id: string; updateRefundDto: UpdateRefundDto }>(REFUNDPATTERN.UPDATE, { id, updateRefundDto: dto });
    }

    remove(id: string, updaterId: string) {
        return this.client.send<RefundDto, { id: string; updaterId: string }>(REFUNDPATTERN.DELETE, { id, updaterId });
    }
}

@Injectable()
export class DisputeService {
    constructor(@Inject(PAYMENT_CLIENT) private readonly client: ClientProxy) {}

    create(dto: CreateDisputeDto) {
        return this.client.send<DisputeDto, CreateDisputeDto>(DISPUTEPATTERN.CREATE, dto);
    }

    findAll(limit: number, offset: number, userId?: string, paymentId?: string) {
        return this.client.send<{ count: number; docs: DisputeDto[] }, { limit: number; offset: number; userId?: string; paymentId?: string }>(DISPUTEPATTERN.FINDALL, { limit, offset, userId, paymentId });
    }

    findOne(id: string) {
        return this.client.send<DisputeDto, string>(DISPUTEPATTERN.FINDBYID, id);
    }

    update(id: string, dto: UpdateDisputeDto) {
        return this.client.send<DisputeDto, { id: string; updateDisputeDto: UpdateDisputeDto }>(DISPUTEPATTERN.UPDATE, { id, updateDisputeDto: dto });
    }

    remove(id: string, updaterId: string) {
        return this.client.send<DisputeDto, { id: string; updaterId: string }>(DISPUTEPATTERN.DELETE, { id, updaterId });
    }
}

@Injectable()
export class SubscriptionService {
    constructor(@Inject(PAYMENT_CLIENT) private readonly client: ClientProxy) {}

    create(dto: CreateSubscriptionDto) {
        return this.client.send<SubscriptionDto, CreateSubscriptionDto>(SUBSCRIPTIONPATTERN.CREATE, dto);
    }

    findAll(limit: number, offset: number, serviceProviderId?: string, status?: string) {
        return this.client.send<{ count: number; docs: SubscriptionDto[] }, { limit: number; offset: number; serviceProviderId?: string; status?: string }>(SUBSCRIPTIONPATTERN.FINDALL, { limit, offset, serviceProviderId, status });
    }

    findOne(id: string) {
        return this.client.send<SubscriptionDto, string>(SUBSCRIPTIONPATTERN.FINDBYID, id);
    }

    update(id: string, dto: UpdateSubscriptionDto) {
        return this.client.send<SubscriptionDto, { id: string; updateSubscriptionDto: UpdateSubscriptionDto }>(SUBSCRIPTIONPATTERN.UPDATE, { id, updateSubscriptionDto: dto });
    }

    remove(id: string, updaterId: string) {
        return this.client.send<SubscriptionDto, { id: string; updaterId: string }>(SUBSCRIPTIONPATTERN.DELETE, { id, updaterId });
    }
}
