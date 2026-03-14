import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'apps/payments/database/database.service';
import { $Enums, Prisma } from 'apps/payments/prisma/@prisma/payments';
import { PaymentDto, PaymentReason, IPaymentStatus, UpdatePaymentDto, CreatePaymentDto, GeneratePaymentDto, PaymentGateWay, ServiceType, InvoiceStatus, Status } from '@shared/contracts/payments';
import { Decimal } from '@prisma/client/runtime/library';
import { StripePaymentService } from '../stripe.payment';
import { PaystackPaymentService } from '../paystack.payment';
import { InvoiceService } from './invoice.service';
import { SubscriptionService } from './subscription.service';
import { SubscriptionPlansService } from './subscription_plans.service';

@Injectable()
export class PaymentsService {
    constructor(
        private readonly databaseService: DatabaseService,
        private readonly stripePaymentService: StripePaymentService,
        private readonly paystackPaymentService: PaystackPaymentService,
        private readonly invoiceService: InvoiceService,
        private readonly subscriptionService: SubscriptionService,
        private readonly subscriptionPlansService: SubscriptionPlansService,
    ) { }

    async initiate(generatePaymentDto: GeneratePaymentDto): Promise<string> {
        try {
            const invoice = await this.databaseService.invoice.findUnique({ where: { id: generatePaymentDto.invoiceId } })
            if (!invoice) {
                throw new NotFoundException({
                    statusCode: 404,
                    message: "Invoice not found",
                    error: "Invoice not found",
                });
            }
            let paymentUrl: string;
            switch (generatePaymentDto.paymentGateWay) {
                case PaymentGateWay.stripe:
                    console.log({ invoice })
                    paymentUrl = await this.stripePaymentService.generatePaymentUrl(
                        invoice.id,
                        invoice.reference,
                        invoice.currency,
                        Number(invoice.amountDue),
                        generatePaymentDto.paymentReason
                    );
                    console.log({ invoice })
                    break;

                case PaymentGateWay.paystack:
                    paymentUrl = await this.paystackPaymentService.generatePaymentUrl(
                        invoice.id,
                        invoice.reference,
                        invoice.currency,
                        Number(invoice.amountDue),
                        generatePaymentDto.paymentReason,
                        generatePaymentDto.email,
                    );
                    break;
                default:
                    break;
            }

            return paymentUrl;
        } catch (err: any) {
            console.error({ err });
            if (err.type && err.type === 'StripeInvalidRequestError') {
                throw new InternalServerErrorException({
                    statusCode: err.raw.statusCode || 500,
                    message: `${err.raw.code}: ${err.message}` || "Internal Server Error from Paystack",
                    error: err.raw.rawType || "Sever error",
                });
            }

            throw new InternalServerErrorException({
                statusCode: err.response.status || 500,
                message: `${err.response.message}: ${err.message}` || "Internal Server Error from Paystack",
                error: err.response.code || "Sever error",
            });
        }
    }

    async create(createPaymentDto: CreatePaymentDto): Promise<PaymentDto> {
        try {
            // fetch invoice via service
            const invoice = await this.invoiceService.findOne(createPaymentDto.invoiceId);

            // create payment record (payment table is owned by this service)
            const payment = await this.databaseService.$transaction(async (prisma) => {
                const existingPayment = await prisma.payment.findUnique({
                    where: {
                        invoiceId: invoice.id,
                        paymentReference: createPaymentDto.paymentReference,
                        reference: createPaymentDto.reference,
                        transactionId: createPaymentDto.transactionId,
                    },
                });

                if (existingPayment) {
                    console.log('Existing payment found, skipping creation.');
                    return null;
                }

                const paymentAmount = new Decimal(createPaymentDto.amount);
                const newPaymentInput: Prisma.PaymentCreateInput = {
                    userId: invoice.userId,
                    paymentMethod: createPaymentDto.paymentMethod,
                    paymentReference: createPaymentDto.paymentReference,
                    paidAt: createPaymentDto.paidAt,
                    amount: paymentAmount,
                    amountCharged: paymentAmount,
                    reference: createPaymentDto.reference,
                    paymentAuthorization: createPaymentDto.paymentAuthorization || "unknown",
                    currency: createPaymentDto.currency,
                    paymentReason: createPaymentDto.paymentReason,
                    status: createPaymentDto.status,
                    transactionId: createPaymentDto.transactionId,
                    invoice: { connect: { id: createPaymentDto.invoiceId } },
                };
                return prisma.payment.create({ data: newPaymentInput });
            });

            if (!payment) return null;

            // determine new invoice status
            const paymentAmount = new Decimal(createPaymentDto.amount);
            const amountDue = new Decimal(invoice.amountDue);
            let invoiceStatus: InvoiceStatus;
            
            if (paymentAmount.gt(amountDue)) {
                invoiceStatus = InvoiceStatus.OVER_PAID;
            } else if (paymentAmount.equals(amountDue)) {

                invoiceStatus = InvoiceStatus.PAID;
            } else {

                invoiceStatus = InvoiceStatus.PARTIALLY_PAID;
            }

            // update invoice status via service
            await this.invoiceService.update(invoice.id, { status: invoiceStatus });

            // activate subscription via service if fully paid
            if (
                createPaymentDto.paymentReason === PaymentReason.SUBSCRIPTION && invoice.subscriptionId &&
                invoiceStatus === InvoiceStatus.PAID
            ) {
                const subscription = await this.subscriptionService.findOne(invoice.subscriptionId);
                const plan = await this.subscriptionPlansService.findOne(subscription.subscriptionplanId);
                const paidAt = new Date(createPaymentDto.paidAt);
                const expiryDate = new Date(paidAt.getTime() + plan.timeFrame * 24 * 60 * 60 * 1000);
                await this.subscriptionService.update(invoice.subscriptionId, { status: Status.ACTIVE, expiryDate });
            }

            // calculate totals via invoice service
            const { totalDue, totalPaid } = await this.invoiceService.calculateTotals(
                invoice.bookingId,
                invoice.subscriptionId,
            );

            return {
                ...payment,
                amount: Number(payment.amount),
                amountCharged: Number(payment.amountCharged),
                paymentReason: payment.paymentReason as unknown as PaymentReason,
                paymentAuthorization: payment.paymentAuthorization as Record<string, any>,
                status: payment.status as unknown as IPaymentStatus,
                paymentMethod: payment.paymentMethod,
                serviceType: invoice.serviceType,
                totalPaymentDue: totalDue,
                totalPaymentPaid: totalPaid,
                bookingId: invoice.bookingId,
                subscriptionId: invoice.subscriptionId,
                serviceId: invoice.serviceId,
                subscriptionPlanId: invoice.subscriptionPlanId,
            };

        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException('server error could not create payment', {
                cause: new Error(),
                description: 'payment creation failed, please try again',
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
        } catch (error) {
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

        } catch (error) {
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
}
