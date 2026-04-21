/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Req, UseInterceptors, UploadedFile, HttpCode, HttpStatus, Inject, Logger, BadRequestException } from '@nestjs/common';
import {
    DisputeGatewayService, FeaturedPlanService, FeesService, InvoiceService,
    PaymentMethodService, PaymentService, RefundGatewayService, SubscriptionService,
    SubscriptionPlanService, WalletService, WithdrawalGatewayService,
} from './payment.service';
import { JwtAuthGuard } from '../jwt/jwt.guard';
import { VerificationGuard } from '../jwt/verification.guard';
import { AdminRoleGuard } from '../jwt/admin.guard';
import {
    ApproveRefundDto,
    CreateDisputeDto,
    CreateFeaturedPlanDto,
    CreateFeeDto,
    CreateInvoiceDto,
    CreatePaymentDto,
    CreatePaymentMethodDto,
    CreateRefundDto,
    CreateSecondInvoiceDto,
    CreateSubscriptionDto,
    CreateSubscriptionPlanDto,
    CreateWithdrawalDto,
    DeclineRefundDto,
    GeneratePaymentDto,
    IPaymentStatus,
    PayInvoiceDto,
    PaymentMethod,
    RefundStatus,
    ResolveDisputeDto,
    TopupWalletDto,
    UpdateDisputeDto,
    UpdateFeaturedPlanDto,
    UpdateFeeDto,
    UpdatePaymentDto,
    UpdatePaymentMethodDto,
    UpdateRefundDto,
    UpdateSubscriptionDto,
    UpdateSubscriptionPlanDto,
    UpdateWithdrawalDto,
    ServiceType,
    UpdateInvoiceDto,
} from '@shared/contracts/payments';
import { firstValueFrom } from 'rxjs';
import { UserDto } from '@shared/contracts/users';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { ApiTags } from '@nestjs/swagger';
import { BookingService } from '../booking/booking.service';
import { EventcentersService } from '../eventcenters/eventcenters.service';
import { CateringService } from '../catering/catering.service';
import { UsersService } from '../users/users.service';
import { NOTIFICATION_CLIENT } from '@shared/contracts';
import { NOTIFICATIONPATTERN, NotificationType } from '@shared/contracts/notifications';
import { ClientProxy } from '@nestjs/microservices';
import { SubscriptionStatus, UpdateServiceSubscriptionDto } from '@shared/contracts/shared';


interface AuthenticatedRequest extends Request {
    user?: any; // Change `any` to your actual user type if known
}


@ApiTags('invoice')
@Controller('invoice')
export class InvoiceController {
    constructor(
        private readonly invoiceService: InvoiceService,
        private readonly bookingService: BookingService,
    ) { }

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Post('create')
    create(@Body() createInvoiceDto: CreateInvoiceDto) {
        return this.invoiceService.create(createInvoiceDto);
    }

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Post('create-invoice')
    async createInvoice(@Body() createInvoiceDto: CreateSecondInvoiceDto) {
        createInvoiceDto.booking = await firstValueFrom(this.bookingService.findOne(createInvoiceDto.bookingId));
        console.log({createInvoiceDto: createInvoiceDto.booking})
        return this.invoiceService.createSecondInvoice(createInvoiceDto);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.invoiceService.findOne(id);
    }


    @Get()
    findAll(
        @Query('limit') limit: number,
        @Query('offset') offset: number,
        @Query('subscriptionId') subscriptionId?: string,
        @Query('bookingId') bookingId?: string,
        @Query('userId') userId?: string,
        @Query('status') status?: string,
        @Query('currency') currency?: string,
        @Query('deleted') deleted?: boolean
    ) {
        return this.invoiceService.findAll(limit, offset, subscriptionId, bookingId, userId, status, currency, deleted);
    }

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
        return this.invoiceService.update(id, updateInvoiceDto);
    }

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Delete(':id')
    async remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
        const user: UserDto = await firstValueFrom(req.user)
        return this.invoiceService.remove(id, user.id);
    }

}

@ApiTags('payment')
@Controller('payment')
export class PaymentController {
    private readonly logger = new Logger(PaymentController.name);

    constructor(
        private readonly paymentService: PaymentService,
        private readonly bookingService: BookingService,
        private readonly eventcentersService: EventcentersService,
        private readonly cateringService: CateringService,
        @Inject(NOTIFICATION_CLIENT) private readonly notificationClient: ClientProxy,
    ) { }



    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Post('initiate')
    async initiate(@Body() generatePaymentDto: GeneratePaymentDto, @Req() req: AuthenticatedRequest) {
        const user: UserDto = await firstValueFrom(req.user);
        generatePaymentDto.userId = user.id;
        return this.paymentService.initiate(generatePaymentDto);
    }


    @Post('webhook')
    @HttpCode(HttpStatus.OK)
    async create(@Body() payload: any) {
        try {
            this.logger.log({
                message: "Payment webhook called",
                ...payload
            });
            let paymentData: CreatePaymentDto;
            if (payload.event && payload.event === 'charge.success') {
                // paystack payment succeeded
                paymentData = {
                    userId: payload.data.metadata.userId,
                    invoiceId: payload.data.metadata.invoiceId || undefined,
                    reference: payload.data.metadata.reference,
                    paymentReference: payload.data.reference,
                    amountCharged: payload.data.metadata.amountCharged,
                    amount: payload.data.amount / 100,
                    paymentMethod: PaymentMethod.PAYSTACK,
                    currency: payload.data.currency,
                    paidAt: payload.data.paid_at,
                    status: payload.data.status === 'success' ? IPaymentStatus.COMPLETED : IPaymentStatus.FAILED,
                    paymentReason: payload.data.metadata.paymentReason,
                    transactionId: String(payload.data.id),
                };
            } else if (payload.type === 'payment_intent.succeeded') {
                // stripe payment succeeded
                paymentData = {
                    userId: payload.data.object.metadata.userId,
                    paymentReason: payload.data.object.metadata.paymentReason,
                    transactionId: payload.data.object.id,
                    invoiceId: payload.data.object.metadata.invoiceId || undefined,
                    reference: payload.data.object.metadata.reference,
                    paymentReference: payload.request.idempotency_key,
                    amountCharged: payload.data.object.metadata.amountCharged / 100,
                    amount: payload.data.object.amount_received / 100,
                    paymentMethod: PaymentMethod.STRIPE,
                    currency: payload.data.object.currency.toUpperCase(),
                    paidAt: new Date(payload.data.object.created * 1000).toISOString(),
                    status: payload.data.object.status === 'succeeded' ? IPaymentStatus.COMPLETED : IPaymentStatus.FAILED,
                };
            } else if (payload.event === 'charge.failed') {
                // paystack payment failed — record only, no wallet credit
                paymentData = {
                    userId: payload.data.metadata.userId,
                    invoiceId: payload.data.metadata.invoiceId || undefined,
                    reference: payload.data.metadata.reference,
                    paymentReference: payload.data.reference,
                    amountCharged: payload.data.metadata.amountCharged,
                    amount: payload.data.amount / 100,
                    paymentMethod: PaymentMethod.PAYSTACK,
                    currency: payload.data.currency,
                    paidAt: payload.data.paid_at ?? new Date().toISOString(),
                    status: IPaymentStatus.FAILED,
                    paymentReason: payload.data.metadata.paymentReason,
                    transactionId: String(payload.data.id),
                };
            } else if (payload.type === 'payment_intent.payment_failed') {
                // stripe payment failed — record only, no wallet credit
                paymentData = {
                    userId: payload.data.object.metadata.userId,
                    paymentReason: payload.data.object.metadata.paymentReason,
                    transactionId: payload.data.object.id,
                    invoiceId: payload.data.object.metadata.invoiceId || undefined,
                    reference: payload.data.object.metadata.reference,
                    paymentReference: payload.request.idempotency_key,
                    amountCharged: payload.data.object.metadata.amountCharged / 100,
                    amount: (payload.data.object.amount ?? 0) / 100,
                    paymentMethod: PaymentMethod.STRIPE,
                    currency: payload.data.object.currency?.toUpperCase(),
                    paidAt: new Date(payload.data.object.created * 1000).toISOString(),
                    status: IPaymentStatus.FAILED,
                };
            }

            const payment = await firstValueFrom(this.paymentService.create(paymentData));

            if (payment?.status === IPaymentStatus.FAILED) {
                this.logger.warn({
                    message: "Payment webhook called with failed payment",
                    ...payload
                });
                this.notificationClient.emit(NOTIFICATIONPATTERN.SEND, {
                    userId: payment.userId,
                    internalId: 'system_notification',
                    message: `Your payment of ${payment.amount} ${payment.currency} failed. Please try again.`,
                    type: NotificationType.ERROR,
                });
            }

            if (payment?.status === IPaymentStatus.COMPLETED) {
                this.logger.log({
                    message: "Payment created by webhook",
                    ...payment
                });
                
                // if payment is for booking, send the payment details to booking microservice
                if (payment?.bookingId) {
                    await this.bookingService.updatePayment(payment.bookingId, payment.totalPaymentPaid);
                    // TO DO: refund process if booking fails to update
                }

                if (payment?.serviceId && payment?.serviceType) {
                    
                    const updateServiceSubscriptionDto: UpdateServiceSubscriptionDto = {
                        serviceId: payment.serviceId,
                        subscriptionStatus: SubscriptionStatus.ACTIVE,
                        timeframe: payment.timeframe,
                        subscriptionPlanId: payment.subscriptionPlanId,
                    };
                    if (payment.serviceType === ServiceType.EVENTCENTER) {
                        this.eventcentersService.updateSubscription(updateServiceSubscriptionDto);

                    } else if (payment.serviceType === ServiceType.CATERING) {
                        this.cateringService.updateSubscription(updateServiceSubscriptionDto);
                    }
                }
            }

            return { received: true };
        } catch (error) {
            console.log({ error });
            return { received: true };
        }
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.paymentService.findOne(id);
    }

    @Get()
    findAll(
        @Query('limit') limit: number,
        @Query('offset') offset: number,
        @Query('search') search?: string,
    ) {
        console.log({limit, offset, search})
        return this.paymentService.findAll(limit, offset, search);
    }

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
        return this.paymentService.update(id, updatePaymentDto);
    }

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Delete(':id')
    async remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
        const user: UserDto = await firstValueFrom(req.user)
        return this.paymentService.remove(id, user.id);
    }

}

@ApiTags('paymentmethod')
@Controller('paymentmethod')
export class PaymentMethodController {
    constructor(private readonly paymentMethodService: PaymentMethodService,
        private readonly cloudinaryService: CloudinaryService
    ) { }

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Post()
    @UseInterceptors(FileInterceptor('providerLogo'))
    async create(@UploadedFile() providerLogo: Express.Multer.File, @Body() createPaymentMethodDto: CreatePaymentMethodDto) {
        if (!providerLogo) {
            throw new Error('providerLogo image is required');
        }

        // Upload file to Cloudinary
        const uploadResult = await this.cloudinaryService.uploadStream(providerLogo.buffer, 'entapp-api/payment-methods/logo');
        // Build full DTO with Cloudinary image URL
        const createPaymentMethodUpdatedDto: CreatePaymentMethodDto = {
            ...createPaymentMethodDto,
            providerLogoUrl: uploadResult.secure_url,
        };
        return this.paymentMethodService.create(createPaymentMethodUpdatedDto);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.paymentMethodService.findOne(id);
    }

    @Get()
    findAll(
        @Query('limit') limit: number,
        @Query('offset') offset: number,
        @Query('search') search?: string,
    ) {
        return this.paymentMethodService.findAll(limit, offset, search);
    }

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePaymentMethodDto: UpdatePaymentMethodDto) {
        return this.paymentMethodService.update(id, updatePaymentMethodDto);
    }

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.paymentMethodService.permanentDelete(id);
    }

}

@ApiTags('subscription-plans')
@Controller('subscription-plans')
export class SubscriptionPlanController {
    constructor(private readonly subscriptionPlanService: SubscriptionPlanService) {}

    @UseGuards(JwtAuthGuard, VerificationGuard, AdminRoleGuard)
    @Post()
    create(@Body() dto: CreateSubscriptionPlanDto) {
        console.log({dto})
        return this.subscriptionPlanService.create(dto);
    }

    @Get()
    findAll(@Query('limit') limit: number, @Query('offset') offset: number) {
        return this.subscriptionPlanService.findAll(limit, offset);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.subscriptionPlanService.findOne(id);
    }

    @UseGuards(JwtAuthGuard, VerificationGuard, AdminRoleGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateSubscriptionPlanDto) {
        return this.subscriptionPlanService.update(id, dto);
    }

    @UseGuards(JwtAuthGuard, VerificationGuard, AdminRoleGuard)
    @Delete(':id')
    async remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
        const user: UserDto = await firstValueFrom(req.user);
        return this.subscriptionPlanService.remove(id, user.id);
    }
}

@ApiTags('featured-plans')
@Controller('featured-plans')
export class FeaturedPlanController {
    constructor(private readonly featuredPlanService: FeaturedPlanService) {}

    @UseGuards(JwtAuthGuard, VerificationGuard, AdminRoleGuard)
    @Post()
    create(@Body() dto: CreateFeaturedPlanDto) {
        return this.featuredPlanService.create(dto);
    }

    @Get()
    findAll(@Query('limit') limit: number, @Query('offset') offset: number) {
        return this.featuredPlanService.findAll(limit, offset);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.featuredPlanService.findOne(id);
    }

    @UseGuards(JwtAuthGuard, VerificationGuard, AdminRoleGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateFeaturedPlanDto) {
        return this.featuredPlanService.update(id, dto);
    }

    @UseGuards(JwtAuthGuard, VerificationGuard, AdminRoleGuard)
    @Delete(':id')
    async remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
        const user: UserDto = await firstValueFrom(req.user);
        return this.featuredPlanService.remove(id, user.id);
    }
}

@ApiTags('fees')
@Controller('fees')
export class FeesController {
    constructor(private readonly feesService: FeesService) {}

    @UseGuards(JwtAuthGuard, VerificationGuard, AdminRoleGuard)
    @Post()
    create(@Body() dto: CreateFeeDto) {
        return this.feesService.create(dto);
    }

    @Get()
    findAll(@Query('limit') limit: number, @Query('offset') offset: number) {
        return this.feesService.findAll(limit, offset);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.feesService.findOne(id);
    }

    @UseGuards(JwtAuthGuard, VerificationGuard, AdminRoleGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateFeeDto) {
        return this.feesService.update(id, dto);
    }

    @UseGuards(JwtAuthGuard, VerificationGuard, AdminRoleGuard)
    @Delete(':id')
    async remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
        const user: UserDto = await firstValueFrom(req.user);
        return this.feesService.remove(id, user.id);
    }
}

@ApiTags('subscriptions')
@Controller('subscriptions')
export class SubscriptionController {
    constructor(
        private readonly subscriptionService: SubscriptionService,
        private readonly eventcentersService: EventcentersService,
        private readonly cateringService: CateringService,
        private readonly usersService: UsersService,
    ) {}

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Post()
    async create(@Body() dto: CreateSubscriptionDto, @Req() req: AuthenticatedRequest) {
        const user: UserDto = await firstValueFrom(req.user);
        dto.serviceProviderId = user.id;

        if (dto.serviceType === ServiceType.EVENTCENTER) {
            await firstValueFrom(this.eventcentersService.findOne(dto.serviceId));
        } else if (dto.serviceType === ServiceType.CATERING) {
            await firstValueFrom(this.cateringService.findOne(dto.serviceId));
        }

        // subscription plan will be validated in the subscription service as its same microservice
        return this.subscriptionService.create(dto);
    }

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Get()
    async findAll(
        @Query('limit') limit: number,
        @Query('offset') offset: number,
        @Query('serviceProviderId') serviceProviderId?: string,
        @Query('status') status?: string,
    ) {
        
        const subscriptions = await firstValueFrom(this.subscriptionService.findAll(limit, offset, serviceProviderId, status));
        if (!subscriptions.docs.length) return subscriptions;

        const serviceIds = subscriptions.docs.map(s => s.serviceId);
        const [eventCenters, caterings] = await Promise.allSettled([
            firstValueFrom(await this.eventcentersService.findAllWithUnique(serviceIds)),
            firstValueFrom(this.cateringService.findAllWithUnique(serviceIds)),
        ]);

        const nameMap = new Map<string, string>();
        if (eventCenters.status === 'fulfilled') eventCenters.value.forEach(ec => nameMap.set(ec.id, ec.name));
        if (caterings.status === 'fulfilled') caterings.value.forEach(c => nameMap.set(c.id, c.name));

        return {
            ...subscriptions,
            docs: subscriptions.docs.map(s => ({ ...s, serviceName: nameMap.get(s.serviceId) ?? null })),
        };
    }

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Get(':id')
    async findOne(@Param('id') id: string) {
        const subscription = await firstValueFrom(this.subscriptionService.findOne(id));

        const serviceType = (subscription as any).invoice?.[0]?.serviceType as ServiceType | undefined;

        const [serviceResult, serviceProviderResult] = await Promise.allSettled([
            serviceType === ServiceType.EVENTCENTER
                ? firstValueFrom(this.eventcentersService.findOne(subscription.serviceId))
                : serviceType === ServiceType.CATERING
                    ? firstValueFrom(this.cateringService.findOne(subscription.serviceId))
                    : Promise.allSettled([
                        firstValueFrom(await this.eventcentersService.findAllWithUnique([subscription.serviceId])),
                        firstValueFrom(this.cateringService.findAllWithUnique([subscription.serviceId])),
                    ]).then(([ec, cat]) =>
                        (ec.status === 'fulfilled' && ec.value[0]) ||
                        (cat.status === 'fulfilled' && cat.value[0]) ||
                        null
                    ),
            firstValueFrom(this.usersService.findOne(subscription.serviceProviderId)),
        ]);

        return {
            ...subscription,
            service: serviceResult.status === 'fulfilled' ? serviceResult.value : null,
            serviceProvider: serviceProviderResult.status === 'fulfilled' ? serviceProviderResult.value : null,
        };
    }

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateSubscriptionDto) {
        return this.subscriptionService.update(id, dto);
    }

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Delete(':id')
    async remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
        const user: UserDto = await firstValueFrom(req.user);
        return this.subscriptionService.remove(id, user.id);
    }
}

@ApiTags('refunds')
@Controller('refunds')
export class RefundController {
    constructor(
        private readonly refundGatewayService: RefundGatewayService,
        private readonly paymentService: PaymentService,
        private readonly invoiceService: InvoiceService,
        private readonly bookingService: BookingService,
        private readonly eventcentersService: EventcentersService,
        private readonly cateringService: CateringService,
    ) {}

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Post()
    async create(
        @Body() body: { paymentId: string; refundReason: string },
        @Req() req: AuthenticatedRequest,
    ) {
        const user: UserDto = await firstValueFrom(req.user);
        const customerId = user.id;

        const payment = await firstValueFrom(this.paymentService.findOne(body.paymentId));
        if (!payment) throw new BadRequestException('Payment not found');

        const invoice = await firstValueFrom(this.invoiceService.findOne(payment.invoiceId));
        if (!invoice) throw new BadRequestException('Invoice not found');

        const { serviceId, serviceType, serviceProviderId } = invoice as any;
        const invoiceAmount = invoice.amountDue;
        const bookingId = payment.bookingId;

        let deductionPercentage = 0;
        let policySnapshot: Record<string, any> | undefined;

        if (bookingId && serviceId && serviceType) {
            try {
                const booking = await firstValueFrom(this.bookingService.findOne(bookingId));
                const eventDate = booking?.confirmedTimeSlots?.[0]?.startTime
                    ?? booking?.requestedTimeSlots?.[0]?.startTime;

                let policy = null;
                if (serviceType === ServiceType.EVENTCENTER) {
                    policy = await firstValueFrom(this.eventcentersService.getRefundPolicy(serviceId));
                } else if (serviceType === ServiceType.CATERING) {
                    policy = await firstValueFrom(this.cateringService.getRefundPolicy(serviceId));
                }

                if (policy) {
                    policySnapshot = { ...policy };
                    if (!policy.allowRefunds) {
                        throw new BadRequestException('This service does not allow refunds');
                    }
                    if (eventDate) {
                        const daysUntilEvent = Math.floor(
                            (new Date(eventDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
                        );
                        if (daysUntilEvent < policy.refundWindowDays) {
                            throw new BadRequestException(
                                `Refunds must be requested at least ${policy.refundWindowDays} days before the event`,
                            );
                        }
                        const applicableTier = [...(policy.tiers ?? [])]
                            .filter(t => daysUntilEvent >= t.minDaysBeforeEvent)
                            .sort((a, b) => a.minDaysBeforeEvent - b.minDaysBeforeEvent)
                            .pop();
                        deductionPercentage = applicableTier?.deductionPercentage ?? 0;
                    }
                }
            } catch (err) {
                if (err?.status === 400) throw err;
            }
        }

        const deductionAmount = Number((invoiceAmount * deductionPercentage / 100).toFixed(2));
        const refundAmount = Number((invoiceAmount - deductionAmount).toFixed(2));

        const dto: CreateRefundDto = {
            paymentId: body.paymentId,
            invoiceId: payment.invoiceId,
            customerId,
            serviceProviderId: serviceProviderId ?? payment.userId,
            bookingId,
            refundReason: body.refundReason,
            policySnapshot,
            deductionPercentage,
            deductionAmount,
            refundAmount,
            status: RefundStatus.REQUESTED,
        };

        return this.refundGatewayService.create(dto);
    }

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Post(':id/approve')
    async approve(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
        const user: UserDto = await firstValueFrom(req.user);
        const dto: ApproveRefundDto = { id, serviceProviderId: user.id };
        return this.refundGatewayService.approve(dto);
    }

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Post(':id/decline')
    async decline(
        @Param('id') id: string,
        @Body() body: { reason: string },
        @Req() req: AuthenticatedRequest,
    ) {
        const user: UserDto = await firstValueFrom(req.user);
        const dto: DeclineRefundDto = { id, serviceProviderId: user.id, reason: body.reason };
        return this.refundGatewayService.decline(dto);
    }

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Get()
    findAll(
        @Query('limit') limit: number,
        @Query('offset') offset: number,
        @Query('customerId') customerId?: string,
        @Query('serviceProviderId') serviceProviderId?: string,
    ) {
        return this.refundGatewayService.findAll(limit, offset, customerId, serviceProviderId);
    }

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.refundGatewayService.findOne(id);
    }

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateRefundDto) {
        return this.refundGatewayService.update(id, dto);
    }
}

@ApiTags('disputes')
@Controller('disputes')
export class DisputeController {
    constructor(
        private readonly disputeGatewayService: DisputeGatewayService,
    ) {}

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Post()
    async create(@Body() dto: CreateDisputeDto, @Req() req: AuthenticatedRequest) {
        const user: UserDto = await firstValueFrom(req.user);
        dto.userId = user.id;
        return this.disputeGatewayService.create(dto);
    }

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @UseGuards(AdminRoleGuard)
    @Post(':id/resolve')
    async resolve(
        @Param('id') id: string,
        @Body() body: { adminNote: string; refundAmount: number },
    ) {
        const dto: ResolveDisputeDto = { id, adminNote: body.adminNote, refundAmount: body.refundAmount };
        return this.disputeGatewayService.resolve(dto);
    }

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Get()
    findAll(
        @Query('limit') limit: number,
        @Query('offset') offset: number,
        @Query('userId') userId?: string,
        @Query('paymentId') paymentId?: string,
    ) {
        return this.disputeGatewayService.findAll(limit, offset, userId, paymentId);
    }

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.disputeGatewayService.findOne(id);
    }

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateDisputeDto) {
        return this.disputeGatewayService.update(id, dto);
    }
}

@ApiTags('wallet')
@Controller('wallet')
export class WalletController {
    constructor(
        private readonly walletService: WalletService,
        // private readonly invoiceService: InvoiceService,
        // private readonly paymentService: PaymentService,
    ) {}

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Get()
    async getWallet(@Req() req: AuthenticatedRequest) {
        const user: UserDto = await firstValueFrom(req.user);
        return this.walletService.findByUserId(user.id, user.userType);
    }

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Get('transactions')
    async getTransactions(
        @Req() req: AuthenticatedRequest,
        @Query('limit') limit: number,
        @Query('offset') offset: number,
    ) {
        const user: UserDto = await firstValueFrom(req.user);
        return this.walletService.getTransactions(user.id, limit ?? 10, offset ?? 0);
    }

    // @UseGuards(JwtAuthGuard, VerificationGuard)
    // @Post('topup')
    // async topup(@Body() dto: TopupWalletDto, @Req() req: AuthenticatedRequest) {
    //     const user: UserDto = await firstValueFrom(req.user);
    //     return this.paymentService.initiate({
    //         userId: user.id,
    //         amount: dto.amount,
    //         currency: dto.currency,
    //         paymentGateWay: dto.paymentGateway,
    //         email: dto.email ?? (user as any).email,
    //         callback_url: dto.callback_url,
    //         paymentReason: 'WALLETFUNDING' as any,
    //     });
    // }

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Post('pay-invoice')
    async payInvoice(@Body() dto: PayInvoiceDto, @Req() req: AuthenticatedRequest) {
        const user: UserDto = await firstValueFrom(req.user);
        dto.userId = user.id;
        return this.walletService.payInvoice(dto);
    }
}

@ApiTags('withdrawals')
@Controller('withdrawals')
export class WithdrawalController {
    constructor(private readonly withdrawalService: WithdrawalGatewayService) {}

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Post()
    async create(@Body() dto: CreateWithdrawalDto, @Req() req: AuthenticatedRequest) {
        const user: UserDto = await firstValueFrom(req.user);
        dto.userId = user.id;
        return this.withdrawalService.create(dto);
    }

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Get()
    async findAll(
        @Req() req: AuthenticatedRequest,
        @Query('limit') limit: number,
        @Query('offset') offset: number,
    ) {
        const user: UserDto = await firstValueFrom(req.user);
        return this.withdrawalService.findAll(limit, offset, user.id);
    }

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.withdrawalService.findOne(id);
    }

    @UseGuards(JwtAuthGuard, VerificationGuard, AdminRoleGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateWithdrawalDto) {
        return this.withdrawalService.update(id, dto);
    }
}

