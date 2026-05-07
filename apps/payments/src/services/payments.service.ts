/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'apps/payments/database/database.service';
import { $Enums, Prisma } from 'apps/payments/prisma/@prisma/payments';
import { PaymentDto, PaymentReason, IPaymentStatus, UpdatePaymentDto, CreatePaymentDto, GeneratePaymentDto, PaymentGateWay, ServiceType, InvoiceStatus, Status, InvoiceDto } from '@shared/contracts/payments';
import { Decimal } from '@prisma/client/runtime/library';
import { StripePaymentService } from '../stripe.payment';
import { PaystackPaymentService } from '../paystack.payment';
import { InvoiceService } from './invoice.service';
import { SubscriptionService } from './subscription.service';
import { SubscriptionPlansService } from './subscription_plans.service';
import { WalletService } from './wallet.service';
import { PrismaErrorHandler } from '@shared/contracts/prisma.error.handler';

@Injectable()
export class PaymentsService {
    private readonly logger = new Logger(PaymentsService.name);

    constructor(
        private readonly databaseService: DatabaseService,
        private readonly stripePaymentService: StripePaymentService,
        private readonly paystackPaymentService: PaystackPaymentService,
        private readonly invoiceService: InvoiceService,
        private readonly subscriptionService: SubscriptionService,
        private readonly subscriptionPlansService: SubscriptionPlansService,
        private readonly walletService: WalletService,
    ) { }

    async initiate(generatePaymentDto: GeneratePaymentDto): Promise<string> {
        try {
            // Resolve amount, currency, and a reference for the payment gateway
            let amount: number;
            let currency: string;
            let reference: string;
            let resolvedInvoiceId: string | undefined;

            if (generatePaymentDto.invoiceId) {
                // Service payment — fetch invoice
                const invoice = await this.databaseService.invoice.findUnique({ where: { id: generatePaymentDto.invoiceId } });
                if (!invoice) {
                    throw new NotFoundException({ statusCode: 404, message: 'Invoice not found', error: 'Invoice not found' });
                }
                amount = Number(invoice.amountDue);
                currency = invoice.currency as string;
                reference = invoice.reference;
                resolvedInvoiceId = invoice.id;
            } else {
                // Wallet funding — no invoice needed
                if (!generatePaymentDto.amount || !generatePaymentDto.currency) {
                    throw new NotFoundException({ statusCode: 400, message: 'amount and currency are required for wallet funding', error: 'Bad Request' });
                }
                amount = generatePaymentDto.amount;
                currency = generatePaymentDto.currency;
                reference = `TOPUP-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
            }

            let paymentUrl: string;
            switch (generatePaymentDto.paymentGateWay) {
                case PaymentGateWay.stripe:
                    this.logger.log({ message: 'Initiating Stripe payment', invoiceId: resolvedInvoiceId ?? 'wallet-funding', amount, currency });
                    paymentUrl = await this.stripePaymentService.generatePaymentUrl(
                        resolvedInvoiceId ?? reference,
                        reference,
                        currency,
                        amount,
                        generatePaymentDto.paymentReason,
                        generatePaymentDto.email,
                        generatePaymentDto.userId,
                    );
                    break;

                case PaymentGateWay.paystack:
                    paymentUrl = await this.paystackPaymentService.generatePaymentUrl(
                        resolvedInvoiceId ?? reference,
                        reference,
                        currency,
                        amount,
                        generatePaymentDto.paymentReason,
                        generatePaymentDto.email,
                        generatePaymentDto.callback_url,
                        generatePaymentDto.userId,
                    );
                    break;

                default:
                    break;
            }

            return paymentUrl;
        } catch (err: any) {
            this.logger.error({ message: 'Payment initiation failed', invoiceId: generatePaymentDto?.invoiceId ?? 'wallet-funding', gateway: generatePaymentDto?.paymentGateWay, error: err?.message });
            if (err.type && err.type === 'StripeInvalidRequestError') {
                throw new InternalServerErrorException({
                    statusCode: err.raw.statusCode || 500,
                    message: `${err.raw.code}: ${err.message}`,
                    error: err.raw.rawType || 'Server error',
                });
            }
            if (err.status || err.response) {
                throw new InternalServerErrorException({
                    statusCode: err.response?.status || 500,
                    message: `${err.response?.message}: ${err.message}`,
                    error: err.response?.code || 'Server error',
                });
            }
            throw err;
        }
    }

    async saveFailedPayment(createPaymentDto: CreatePaymentDto): Promise<PaymentDto> {
        try {
            const paymentAmount = new Decimal(createPaymentDto.amount);
            // 1. Record payment — deduplicate via unique constraint
            const payment = await this.databaseService.$transaction(async (prisma) => 
                {
                    const existingPayment = await prisma.payment.findUnique({
                        where: {
                            reference_paymentReference_transactionId: {
                                reference: createPaymentDto.reference,
                                paymentReference: createPaymentDto.paymentReference,
                                transactionId: createPaymentDto.transactionId,
                            },
                        },
                    });

                    if (existingPayment) {
                        this.logger.warn({ message: 'Duplicate payment skipped', reference: createPaymentDto.reference, transactionId: createPaymentDto.transactionId });
                        return null;
                    }

                    const newPaymentInput: Prisma.PaymentCreateInput = {
                        userId: createPaymentDto.userId,
                        paymentMethod: createPaymentDto.paymentMethod,
                        paymentReference: createPaymentDto.paymentReference,
                        paidAt: createPaymentDto.paidAt,
                        amount: paymentAmount,
                        amountCharged: paymentAmount,
                        reference: createPaymentDto.reference,
                        paymentAuthorization: createPaymentDto.paymentAuthorization || 'unknown',
                        currency: createPaymentDto.currency,
                        paymentReason: createPaymentDto.paymentReason,
                        status: createPaymentDto.status,
                        transactionId: createPaymentDto.transactionId,
                        ...(createPaymentDto.invoiceId && { invoice: { connect: { id: createPaymentDto.invoiceId } } }),
                    };
                    return prisma.payment.create({ data: newPaymentInput });
                }
                );

                if (!payment) return null;

                this.logger.log({ message: 'Failed Payment recorded', 
                    paymentId: payment.id, invoiceId: createPaymentDto.invoiceId ?? 'none',
                     status: createPaymentDto.status, amount: createPaymentDto.amount, 
                     reason: createPaymentDto.paymentReason });

                this.logger.warn({ message: 'Payment failed — no wallet credit',
                        userId: createPaymentDto.userId, 
                        paymentId: payment.id, 
                        reference: createPaymentDto.reference });
                return this.mapToPaymentDto(payment);
                

        } catch (error: any) {
            this.logger.error({ message: 'Attempt to saved Failed Payment also failed', 
                createPaymentDto: createPaymentDto, 
                error: error?.message });
            throw new InternalServerErrorException('server error could not create payment', {
                cause: new Error(),
                description: 'payment creation failed, please try again',
            });
        }
    }


    /**
     * WALLETFUNDING flow:
     * 1. Deduplicate
     * 2. Record payment
     * 3. Credit customer wallet (TOPUP)
     * No invoice — pure top-up.
     */
    async processWalletFunding(dto: CreatePaymentDto): Promise<PaymentDto> {
        try {

            const payment = await this.createPaymentAndCreditWallet(dto)
            return {
                ...this.mapToPaymentDto(payment)
            };
        } catch (error: any) {
            this.logger.error({ message: 'Wallet funding failed', reference: dto?.reference, error: error?.message });
            throw new InternalServerErrorException('Wallet funding failed, please try again');
        }
    }

    /**
     * SERVICEREQUEST flow:
     * 1. Deduplicate
     * 2. Record payment
     * 3. Credit customer wallet (TOPUP) — reflects the incoming external payment
     * 4. Find the invoice for this service
     * 5. Debit customer wallet (INVOICE_PAYMENT) — reduces wallet by what is owed
     * 6. Credit platform with service charge portion (SERVICE_CHARGE)
     * 7. Credit SP wallet or hold in platform escrow (ESCROW_HOLD / ESCROW_RELEASE)
     * 8. Mark invoice PAID, PARTIALLY_PAID, or OVER_PAID
     * Gateway then uses bookingId from the response to mark the booking as paid.
     */
    async processServiceRequest(dto: CreatePaymentDto): Promise<PaymentDto> {
        try {
            const paymentAmount = new Decimal(dto.amount);

            // Step 1–3: Record payment and credit wallet atomically
            const payment = await this.createPaymentAndCreditWallet(dto)
            
            // Step 4: Fetch the invoice
            const invoice = await this.databaseService.invoice.findUnique({ where: { id: dto.invoiceId } });
            if (!invoice) {
                this.logger.error({ message: 'Invoice not found for service request payment', 
                    invoiceId: dto.invoiceId, paymentId: payment.id });
                return {
                    ...this.mapToPaymentDto(payment)
                };
            }

            // Steps 5–8: Debit wallet, distribute funds, mark invoice — all in one transaction
            let invoiceStatus: string = invoice.status as InvoiceStatus;
            try {
                const result = await this.databaseService.$transaction(async (prisma) => {
                    return this.walletService.applyServiceRequestPayment(prisma, invoice, paymentAmount);
                });
                invoiceStatus = result.invoiceStatus;
                this.logger.log({ message: 'Service request invoice payment applied', invoiceId: invoice.id, invoiceStatus });
            } catch (err: any) {
                this.logger.error({ message: 'Failed to apply service request payment to invoice', invoiceId: invoice.id, error: err.message });
            }

            const { totalDue, totalPaid } = await this.invoiceService.calculateTotals(invoice.bookingId, invoice.subscriptionId);

            return {
                ...this.mapToPaymentDto({
                ...payment,
                serviceType: invoice.serviceType as unknown as ServiceType,
                totalPaymentDue: totalDue as unknown as number,
                totalPaymentPaid: totalPaid as unknown as number,
                bookingId: invoice.bookingId,
                subscriptionId: invoice.subscriptionId,
                serviceId: invoice.serviceId,
                subscriptionPlanId: invoice.subscriptionPlanId,
                })
            };
        } catch (error : any) {
            this.logger.error({ message: 'Service request payment failed', invoiceId: dto?.invoiceId, reference: dto?.reference, error: error?.message });
            throw new InternalServerErrorException('Service request payment failed, please try again');
        }
    }


    async processSubscription(createPaymentDto: CreatePaymentDto): Promise<PaymentDto> {
        try{
            let planTimeFrame: number | undefined;

            // 1 - 3. Record payment — deduplicate via unique constraint
            // this block find duplicate payment, records payment and credits wallet
            const payment = await this.createPaymentAndCreditWallet(createPaymentDto)
            console.log({payment})
            // 4-5. Invoice exists — debit user wallet and credit platform wallet 
            let invoice: any
            let invoiceStatus: string;

            await this.databaseService.$transaction(async (prisma) => {
                invoice = await this.databaseService.invoice.findUnique(
                    { 
                        where: { 
                            id: createPaymentDto.invoiceId
                        } 
                    });

                const result = await this.walletService.applyToSubscriptionInvoice(prisma, invoice);
                invoiceStatus = result.invoiceStatus;
                this.logger.log({ message: 'Step Invoice payment applied', 
                    invoiceId: invoice.id, invoiceStatus });
            
                // 5. Activate subscription if fully paid as subscription is in this microservice
                if (
                    createPaymentDto.paymentReason === PaymentReason.SUBSCRIPTION &&
                    invoice.subscriptionId &&
                    invoiceStatus === InvoiceStatus.PAID
                ) {
                    this.logger.log({ message: 'Activating subscription', 
                        subscriptionId: invoice.subscriptionId, 
                        invoiceId: invoice.id });

                    const subscription = await this.subscriptionService.findOne(
                        invoice.subscriptionId, 
                        prisma
                    );
                    const plan = await this.subscriptionPlansService.findOne(
                        subscription.subscriptionplanId,
                        prisma
                    );
                    const paidAt = new Date(createPaymentDto.paidAt);
                    planTimeFrame = plan.timeFrame;
                    const expiryDate = new Date(paidAt.getTime() + planTimeFrame * 24 * 60 * 60 * 1000);
                    await this.subscriptionService.update(invoice.subscriptionId, { status: Status.ACTIVE, expiryDate }, prisma);
                }
            },
         {
            timeout: 20000, // 20 seconds
            maxWait: 10000, // optional: wait longer for a connection
        });
   
            const { totalDue, totalPaid } = await this.invoiceService.calculateTotals(invoice.bookingId, invoice.subscriptionId);
            console.log({totalDue, totalPaid})
            return {
                ...this.mapToPaymentDto(payment),
                serviceType: invoice.serviceType as unknown as ServiceType,
                totalPaymentDue: totalDue as unknown as number,
                totalPaymentPaid: totalPaid as unknown as number,
                subscriptionId: invoice.subscriptionId,
                serviceId: invoice.serviceId,
                subscriptionPlanId: invoice.subscriptionPlanId,
                timeframe: planTimeFrame,
            };

        } catch (error : any) {
            this.logger.error({ message: 'Failed to activate subscription but also no debit', 
                invoiceId: createPaymentDto?.invoiceId ?? 'none', 
                reference: createPaymentDto?.reference, 
                error: error?.message });
            throw new InternalServerErrorException('server error could not activate subscription', {
                cause: new Error(),
                description: 'server error',
            });
        }
        
    }

    async findAll(limit: number, offset: number, search: string): Promise<{ count: number; data: PaymentDto[] }> {
        const whereClause: any = { deletedAt: null };

        const searchValue = (search || "").trim();
        const upperSearch = searchValue.toUpperCase();

        const validPaymentMethods = Object.values($Enums.PaymentMethod);
        const validPaymentReasons = Object.values($Enums.PaymentReason);

        if (searchValue) {
            whereClause.OR = [
                validPaymentMethods.includes(upperSearch as $Enums.PaymentMethod)
                    ? { paymentMethod: { equals: upperSearch as $Enums.PaymentMethod } }
                    : undefined,

                validPaymentReasons.includes(upperSearch as $Enums.PaymentReason)
                    ? { paymentReason: { equals: upperSearch as $Enums.PaymentReason } }
                    : undefined,

                { reference: { contains: searchValue } },
                { paymentReference: { contains: searchValue } },
                { transactionId: { contains: searchValue } },
            ].filter(Boolean);
        }

        const payments = await this.databaseService.payment.findMany({
            where: whereClause,
            take: limit,
            skip: offset,
            orderBy: { createdAt: "desc" },
        });

        const count = await this.databaseService.payment.count({ where: whereClause });
        return {
            count,
            data: payments.map(payment => this.mapToPaymentDto(payment))
        };
    }

    async findOne(id: string): Promise<PaymentDto> {
        try {
            const payment = await this.databaseService.payment.findUnique({
                where: { id: id, deletedAt: null },
                include: { invoice: true, refund: true, dispute: true }
            });

            return {
                ...payment,
                amount: Number(payment.amount),
                amountCharged: Number(payment.amountCharged),
                paymentReason: payment.paymentReason as unknown as PaymentReason,
                paymentAuthorization: payment.paymentAuthorization as Record<string, any>,
                status: payment.status as unknown as IPaymentStatus,
                paymentMethod: payment.paymentMethod,
                serviceType: (payment as any).serviceType as unknown as ServiceType,
            };
        } catch (error : any) {
            throw new NotFoundException({
                statusCode: 404,
                message: "Payment not found",
                error: "Payment not found",
            });
        }
    }

    async update(id: string, updatePaymentDto: UpdatePaymentDto): Promise<PaymentDto> {
        try {
            const updatePaymentInput: Prisma.PaymentUpdateInput = {
                ...updatePaymentDto,
                paymentAuthorization: updatePaymentDto.paymentAuthorization ?? undefined,
            };

            const payment = await this.databaseService.payment.update({
                where: { id },
                data: updatePaymentInput
            });

            return {
                ...payment,
                amount: Number(payment.amount),
                amountCharged: Number(payment.amountCharged),
                paymentReason: payment.paymentReason as unknown as PaymentReason,
                paymentAuthorization: payment.paymentAuthorization as Record<string, any>,
                status: payment.status as unknown as IPaymentStatus,
                paymentMethod: payment.paymentMethod,
                serviceType: (payment as any).serviceType as unknown as ServiceType,
            };

        } catch (error : any) {
            throw new InternalServerErrorException(error);
        }
    }

    async remove(id: string, updaterId: string): Promise<PaymentDto> {
        const payment = await this.databaseService.$transaction(async (prisma) => {
            const deletedPayment = await prisma.payment.update({
                where: { id },
                data: { deletedAt: new Date(), deletedBy: updaterId }
            });
            return deletedPayment
        });

        return {
            ...payment,
            amount: Number(payment.amount),
            amountCharged: Number(payment.amountCharged),
            paymentReason: payment.paymentReason as unknown as PaymentReason,
            paymentAuthorization: payment.paymentAuthorization as Record<string, any>,
            status: payment.status as unknown as IPaymentStatus,
            paymentMethod: payment.paymentMethod
        };
    }

    async permanentDelete(id: string): Promise<PaymentDto> {
        const payment = await this.databaseService.$transaction(async (prisma) => {
            const deletedPayment = await prisma.payment.delete({ where: { id } });
            return deletedPayment
        });

        return {
            ...payment,
            amount: Number(payment.amount),
            amountCharged: Number(payment.amountCharged),
            paymentReason: payment.paymentReason as unknown as PaymentReason,
            paymentAuthorization: payment.paymentAuthorization as Record<string, any>,
            status: payment.status as unknown as IPaymentStatus,
            paymentMethod: payment.paymentMethod
        };
    }

    private mapToPaymentDto(payment: any): PaymentDto {
        return {
            ...payment,
            amount: Number(payment.amount),
            amountCharged: Number(payment.amountCharged),
            paymentReason: payment.paymentReason as unknown as PaymentReason,
            paymentAuthorization: payment.paymentAuthorization as Record<string, any>,
            status: payment.status as unknown as IPaymentStatus,
            paymentMethod: payment.paymentMethod
        }
    }

    private async createPaymentAndCreditWallet(createPaymentDto: CreatePaymentDto){
       try { 
            // 1 - 3. Record payment — deduplicate via unique constraint
            // this block find duplicate payment, records payment and credits wallet
            const paymentAmount = new Decimal(createPaymentDto.amount);
            const payment = await this.databaseService.$transaction(async (prisma) => {
                    
                const existingPayment = await prisma.payment.findUnique({
                    where: {
                        reference_paymentReference_transactionId: {
                            reference: createPaymentDto.reference,
                            paymentReference: createPaymentDto.paymentReference,
                            transactionId: createPaymentDto.transactionId,
                        },
                    },
                });

                if (existingPayment) {
                    this.logger.warn({ message: 'Duplicate payment skipped', reference: createPaymentDto.reference, transactionId: createPaymentDto.transactionId });
                    return null;
                }
                const newPaymentInput: Prisma.PaymentCreateInput = {
                    userId: createPaymentDto.userId,
                    paymentMethod: createPaymentDto.paymentMethod,
                    paymentReference: createPaymentDto.paymentReference,
                    paidAt: createPaymentDto.paidAt,
                    amount: paymentAmount,
                    amountCharged: paymentAmount,
                    reference: createPaymentDto.reference,
                    paymentAuthorization: createPaymentDto.paymentAuthorization || 'unknown',
                    currency: createPaymentDto.currency,
                    paymentReason: createPaymentDto.paymentReason,
                    status: createPaymentDto.status,
                    transactionId: createPaymentDto.transactionId,
                    ...(createPaymentDto.invoiceId && { invoice: { connect: { id: createPaymentDto.invoiceId } } }),
                };
                const payment = await prisma.payment.create({ data: newPaymentInput });
                if (!payment) {
                    this.logger.log({ message: `Payment Creation failed
                        to save at step one. Could not persist into 
                        the database`,
                    createPaymentDto: createPaymentDto 
                    });
                    return null;

                };

                this.logger.log({ message: 'Payment recorded', 
                    paymentId: payment.id, 
                    invoiceId: createPaymentDto.invoiceId ?? 'none', 
                    status: payment.status, 
                    amount: payment.amount, 
                    reason: payment.paymentReason 
                });
        
                // 3. Credit customer wallet — always for every completed payment
                try {
                    const creditTx = await this.walletService.creditWallet(
                        createPaymentDto.userId,
                        Number(paymentAmount),
                        $Enums.WalletTxReason.TOPUP,
                        payment.id,
                        prisma
                    );
                    this.logger.log({ message: 'User Wallet credited', walletTxId: creditTx.id,
                            userId: createPaymentDto.userId, amount: Number(paymentAmount) });

                } catch (error: any) {
                    this.logger.error({ message: `Failed to credit wallet ${error.code} ${error.message}`, 
                    userId: createPaymentDto.userId,
                    paymentId: payment.id, error: error.message });
                    PrismaErrorHandler.handle(error, Prisma);
                }
                return payment
            })
            return payment
        } catch (error: any) {
            this.logger.error({ message: `Failed to record payment at payment service Block 1
                 ${error.code} ${error.message}`, 
                userId: createPaymentDto.userId,
                createPaymentDto: createPaymentDto });
                    PrismaErrorHandler.handle(error, Prisma);
        }
       
    }
}
