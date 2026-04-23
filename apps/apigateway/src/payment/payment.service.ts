import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CACHE_KEYS, PAYMENT_CLIENT } from '@shared/contracts';
import {
  ApproveRefundDto, CreateDisputeDto, CreateFeaturedPlanDto, CreateFeeDto, CreateInvoiceDto,
  CreatePaymentDto, CreatePaymentMethodDto, CreateRefundDto, CreateSecondInvoiceDto,
  CreateSubscriptionDto, CreateSubscriptionPlanDto, CreateWithdrawalDto, DeclineRefundDto,
  DisputeDto, FeaturedPlanDto, FeesDto, GeneratePaymentDto, InvoiceDto, INVOICEPATTERN,
  PayInvoiceDto, PaymentDto, PaymentMethodDto, PAYMENTMETHODPATTERN, PAYMENTPATTERN,
  ReleaseEscrowDto, ResolveDisputeDto, RefundDto, SubscriptionDto, SubscriptionPlanDto,
  UpdateDisputeDto, UpdateFeaturedPlanDto, UpdateFeeDto, UpdateInvoiceDto,
  UpdatePaymentDto, UpdatePaymentMethodDto, UpdateRefundDto, UpdateSubscriptionDto,
  UpdateSubscriptionPlanDto, UpdateWithdrawalDto, WalletDto, WalletTransactionDto, WithdrawalDto,
  FEATUREDPLANSPATTERN, FEESPATTERN, SUBSCRIPTIONPLANSPATTERN, SUBSCRIPTIONPATTERN,
  REFUNDPATTERN, DISPUTEPATTERN, WALLETPATTERN, WITHDRAWALPATTERN,
} from '@shared/contracts/payments';
import { DataWithCountDto, UserType } from '@shared/contracts/shared';
import { Cacheable, } from '../common/cache/cache.decorators';

@Injectable()
export class PaymentService {
    constructor(
        @Inject(PAYMENT_CLIENT) private readonly paymentClient: ClientProxy
    ) { }

    initiate(generatePaymentDto: GeneratePaymentDto) {
        return this.paymentClient.send<string, GeneratePaymentDto>(PAYMENTPATTERN.INITIATE, generatePaymentDto)
    }

    // @CacheEvict(
    //         ((...args) => `${CACHE_KEYS.WALLET_ONE}:${userId}`)
    // )
    // @Cacheable((...args) => `${CACHE_KEYS.WALLET_ONE}:${args.join(':')}`)
    create(createPaymentDto: CreatePaymentDto) {
        return this.paymentClient.send<PaymentDto, CreatePaymentDto>(PAYMENTPATTERN.CREATE, createPaymentDto)
    }

    processFailedPayment(createPaymentDto: CreatePaymentDto) {
        return this.paymentClient.send<PaymentDto, CreatePaymentDto>(PAYMENTPATTERN.FAILED_PAYMENT, createPaymentDto)
    }

    processWalletFunding(dto: CreatePaymentDto) {
        return this.paymentClient.send<PaymentDto, CreatePaymentDto>(PAYMENTPATTERN.WALLET_FUNDING, dto);
    }

    processSubscription(dto: CreatePaymentDto) {
        return this.paymentClient.send<PaymentDto, CreatePaymentDto>(PAYMENTPATTERN.PLATFORM_PAYMENTS, dto);
    }

    processServiceRequest(dto: CreatePaymentDto) {
        return this.paymentClient.send<PaymentDto, CreatePaymentDto>(PAYMENTPATTERN.SERVICE_REQUEST, dto);
    }

    // processPlatformPayments(dto: CreatePaymentDto) {
    //     return this.paymentClient.send<PaymentDto, CreatePaymentDto>(PAYMENTPATTERN.SERVICE_REQUEST, dto);
    // }

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

@Injectable()
export class WalletService {
    constructor(@Inject(PAYMENT_CLIENT) private readonly client: ClientProxy) {}

    // @CacheEvict(
    //         `${CACHE_KEYS.APP_SETTING}:*`
    // )
    @Cacheable((...args) => `${CACHE_KEYS.WALLET_ONE}:${args.join(':')}`)
    findByUserId(userId: string, userType: UserType) {
        return this.client.send<WalletDto, {userId: string, userType: UserType}>(WALLETPATTERN.FINDBYUSERID, {userId, userType});
    }

    payInvoice(dto: PayInvoiceDto) {
        return this.client.send<{ paymentId: string; invoiceId: string }, PayInvoiceDto>(WALLETPATTERN.PAYINVOICE, dto);
    }

    releaseEscrow(dto: ReleaseEscrowDto) {
        return this.client.send<WalletTransactionDto, ReleaseEscrowDto>(WALLETPATTERN.RELEASEESCROW, dto);
    }

    @Cacheable((...args) => `${CACHE_KEYS.APP_SETTING}:${args.join(':')}`)
    getTransactions(userId: string, limit: number, offset: number) {
        return this.client.send<DataWithCountDto<WalletTransactionDto>, { userId: string; limit: number; offset: number }>(
            WALLETPATTERN.TRANSACTIONS, { userId, limit, offset },
        );
    }

    getPlatformTransactions(limit: number, offset: number) {
        return this.client.send<DataWithCountDto<WalletTransactionDto>, { limit: number; offset: number }>(
            WALLETPATTERN.PLATFORM_TRANSACTIONS, { limit, offset },
        );
    }
}

@Injectable()
export class WithdrawalGatewayService {
    constructor(@Inject(PAYMENT_CLIENT) private readonly client: ClientProxy) {}

    create(dto: CreateWithdrawalDto) {
        return this.client.send<WithdrawalDto, CreateWithdrawalDto>(WITHDRAWALPATTERN.CREATE, dto);
    }

    findAll(limit: number, offset: number, userId?: string) {
        return this.client.send<{ count: number; docs: WithdrawalDto[] }, { limit: number; offset: number; userId?: string }>(
            WITHDRAWALPATTERN.FINDALL, { limit, offset, userId },
        );
    }

    findOne(id: string) {
        return this.client.send<WithdrawalDto, string>(WITHDRAWALPATTERN.FINDBYID, id);
    }

    update(id: string, dto: UpdateWithdrawalDto) {
        return this.client.send<WithdrawalDto, { id: string; dto: UpdateWithdrawalDto }>(WITHDRAWALPATTERN.UPDATE, { id, dto });
    }
}

@Injectable()
export class RefundGatewayService {
    constructor(@Inject(PAYMENT_CLIENT) private readonly client: ClientProxy) {}

    create(dto: CreateRefundDto) {
        return this.client.send<RefundDto, CreateRefundDto>(REFUNDPATTERN.CREATE, dto);
    }

    approve(dto: ApproveRefundDto) {
        return this.client.send<RefundDto, ApproveRefundDto>(REFUNDPATTERN.APPROVE, dto);
    }

    decline(dto: DeclineRefundDto) {
        return this.client.send<RefundDto, DeclineRefundDto>(REFUNDPATTERN.DECLINE, dto);
    }

    findAll(limit: number, offset: number, customerId?: string, serviceProviderId?: string) {
        return this.client.send<{ count: number; docs: RefundDto[] }, { limit: number; offset: number; customerId?: string; serviceProviderId?: string }>(
            REFUNDPATTERN.FINDALL, { limit, offset, customerId, serviceProviderId },
        );
    }

    findOne(id: string) {
        return this.client.send<RefundDto, string>(REFUNDPATTERN.FINDBYID, id);
    }

    update(id: string, dto: UpdateRefundDto) {
        return this.client.send<RefundDto, { id: string; updateRefundDto: UpdateRefundDto }>(REFUNDPATTERN.UPDATE, { id, updateRefundDto: dto });
    }
}

@Injectable()
export class DisputeGatewayService {
    constructor(@Inject(PAYMENT_CLIENT) private readonly client: ClientProxy) {}

    create(dto: CreateDisputeDto) {
        return this.client.send<DisputeDto, CreateDisputeDto>(DISPUTEPATTERN.CREATE, dto);
    }

    resolve(dto: ResolveDisputeDto) {
        return this.client.send<DisputeDto, ResolveDisputeDto>(DISPUTEPATTERN.RESOLVE, dto);
    }

    findAll(limit: number, offset: number, userId?: string, paymentId?: string) {
        return this.client.send<{ count: number; docs: DisputeDto[] }, { limit: number; offset: number; userId?: string; paymentId?: string }>(
            DISPUTEPATTERN.FINDALL, { limit, offset, userId, paymentId },
        );
    }

    findOne(id: string) {
        return this.client.send<DisputeDto, string>(DISPUTEPATTERN.FINDBYID, id);
    }

    update(id: string, dto: UpdateDisputeDto) {
        return this.client.send<DisputeDto, { id: string; updateDisputeDto: UpdateDisputeDto }>(DISPUTEPATTERN.UPDATE, { id, updateDisputeDto: dto });
    }
}
