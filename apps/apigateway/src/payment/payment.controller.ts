import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Req, UseInterceptors, UploadedFile, HttpCode, HttpStatus } from '@nestjs/common';
import { DisputeService, FeaturedPlanService, FeesService, InvoiceService, PaymentMethodService, PaymentService, RefundService, SubscriptionService, SubscriptionPlanService } from './payment.service';
import { JwtAuthGuard } from '../jwt/jwt.guard';
import { VerificationGuard } from '../jwt/verification.guard';
import { AdminRoleGuard } from '../jwt/admin.guard';
import {
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
    GeneratePaymentDto,
    InitiateServiceSubscriptionDto,
    IPaymentStatus,
    PaymentMethod,
    PaymentReason,
    ServiceType,
    UpdateDisputeDto,
    UpdateFeaturedPlanDto,
    UpdateFeeDto,
    UpdatePaymentDto,
    UpdatePaymentMethodDto,
    UpdateRefundDto,
    UpdateSubscriptionDto,
    UpdateSubscriptionPlanDto,
} from '@shared/contracts/payments';
import { firstValueFrom } from 'rxjs';
import { UserDto } from '@shared/contracts/users';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { ApiTags } from '@nestjs/swagger';
import { BookingService } from '../booking/booking.service';
import { EventcentersService } from '../eventcenters/eventcenters.service';
import { CateringService } from '../catering/catering.service';


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
    update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
        return this.invoiceService.update(id, updatePaymentDto);
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
    constructor(private readonly paymentService: PaymentService,
        private readonly bookingService: BookingService,
        private readonly eventcentersService: EventcentersService,
        private readonly cateringService: CateringService,
    ) { }



    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Post('initiate')
    initiate(@Body() generatePaymentDto: GeneratePaymentDto) {
        return this.paymentService.initiate(generatePaymentDto);
    }


    @Post('webhook')
    @HttpCode(HttpStatus.OK)
    async create(@Body() payload: any) {
        try {
             let paymentData: CreatePaymentDto 
            if(payload.event && payload.event === 'charge.success') {
                // paystack payment succeeded
                paymentData = {
                invoiceId: payload.data.metadata.invoiceId, 
                reference: payload.data.metadata.reference,
                paymentReference: payload.data.reference,
                amountCharged: payload.data.metadata.amountCharged,
                amount: payload.data.amount/100,
                paymentMethod: PaymentMethod.PAYSTACK,
                currency: payload.data.currency,
                paidAt: payload.data.paid_at,
                status: payload.data.status === 'success' ? IPaymentStatus.COMPLETED :  IPaymentStatus.FAILED,
                paymentReason: payload.data.metadata.paymentReason,
                transactionId: String(payload.data.id),
                };
            }else if(payload.type === 'payment_intent.succeeded') {
                // stripe payment succeeded
                paymentData = {
                paymentReason: payload.data.object.metadata.paymentReason,
                transactionId: payload.data.object.id,
                invoiceId: payload.data.object.metadata.invoiceId, 
                reference: payload.data.object.metadata.reference,
                paymentReference: payload.request.idempotency_key,
                amountCharged: payload.data.object.metadata.amountCharged/100,
                amount: payload.data.object.amount_received/100,
                paymentMethod: PaymentMethod.STRIPE,
                currency: payload.data.object.currency.toUpperCase(),
                paidAt: new Date(payload.data.object.created * 1000).toISOString(),
                status: payload.data.object.status === 'succeeded' ? IPaymentStatus.COMPLETED :  IPaymentStatus.FAILED,
                };
            }
            const payment = await firstValueFrom(this.paymentService.create(paymentData))
            if (payment.paymentReason === PaymentReason.SUBSCRIPTION && payment.serviceType && payment.invoiceId) {
                if (payment.serviceType === ServiceType.EVENTCENTER) {
                    await firstValueFrom(this.eventcentersService.activateSubscriptionByInvoiceId(payment.invoiceId));
                } else if (payment.serviceType === ServiceType.CATERING) {
                    await firstValueFrom(this.cateringService.activateSubscriptionByInvoiceId(payment.invoiceId));
                }
            } else if (payment.bookingId) {
                await this.bookingService.updatePayment(payment.bookingId, payment.totalPaymentPaid);
            }

            return { received: true };
        } catch (error) {
            console.log({error})
            // console.log({payload})
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
    findAll(
        @Query('limit') limit: number,
        @Query('offset') offset: number,
        @Query('serviceProviderId') serviceProviderId?: string,
        @Query('status') status?: string,
    ) {
        return this.subscriptionService.findAll(limit, offset, serviceProviderId, status);
    }

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.subscriptionService.findOne(id);
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
    constructor(private readonly refundService: RefundService) {}

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Post()
    create(@Body() dto: CreateRefundDto) {
        return this.refundService.create(dto);
    }

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Get()
    findAll(
        @Query('limit') limit: number,
        @Query('offset') offset: number,
        @Query('paymentId') paymentId?: string,
    ) {
        return this.refundService.findAll(limit, offset, paymentId);
    }

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.refundService.findOne(id);
    }

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateRefundDto) {
        return this.refundService.update(id, dto);
    }

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Delete(':id')
    async remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
        const user: UserDto = await firstValueFrom(req.user);
        return this.refundService.remove(id, user.id);
    }
}

@ApiTags('disputes')
@Controller('disputes')
export class DisputeController {
    constructor(private readonly disputeService: DisputeService) {}

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Post()
    create(@Body() dto: CreateDisputeDto) {
        return this.disputeService.create(dto);
    }

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Get()
    findAll(
        @Query('limit') limit: number,
        @Query('offset') offset: number,
        @Query('userId') userId?: string,
        @Query('paymentId') paymentId?: string,
    ) {
        return this.disputeService.findAll(limit, offset, userId, paymentId);
    }

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.disputeService.findOne(id);
    }

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateDisputeDto) {
        return this.disputeService.update(id, dto);
    }

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Delete(':id')
    async remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
        const user: UserDto = await firstValueFrom(req.user);
        return this.disputeService.remove(id, user.id);
    }
}

@ApiTags('service-subscriptions')
@Controller('service-subscriptions')
export class ServiceSubscriptionController {
    constructor(
        private readonly invoiceService: InvoiceService,
        private readonly subscriptionPlanService: SubscriptionPlanService,
        private readonly eventcentersService: EventcentersService,
        private readonly cateringService: CateringService,
    ) {}

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Post('initiate')
    async initiate(@Body() dto: InitiateServiceSubscriptionDto) {
        const plan = await firstValueFrom(this.subscriptionPlanService.findOne(dto.subscriptionPlanId));
        const invoice = await firstValueFrom(
            this.invoiceService.createServiceSubscriptionInvoice({
                userId: dto.userId,
                serviceType: dto.serviceType,
                serviceId: dto.serviceId,
                subscriptionPlanId: dto.subscriptionPlanId,
                amountDue: Number(plan.amount),
                currency: dto.currency,
                billingAddress: dto.billingAddress,
                dueDate: dto.dueDate,
                note: dto.note,
            })
        );
        const expiryDate = new Date(Date.now() + plan.timeFrame * 24 * 60 * 60 * 1000);
        const subscriptionDto = { serviceId: dto.serviceId, subscriptionPlanId: dto.subscriptionPlanId, invoiceId: invoice.id, expiryDate };
        const subscription = await firstValueFrom(
            dto.serviceType === ServiceType.EVENTCENTER
                ? this.eventcentersService.createSubscription(subscriptionDto)
                : this.cateringService.createSubscription(subscriptionDto)
        );
        return { subscription, invoice, plan };
    }

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Get()
    findAll(
        @Query('serviceType') serviceType: ServiceType,
        @Query('serviceId') serviceId: string,
        @Query('limit') limit: number,
        @Query('offset') offset: number,
    ) {
        if (serviceType === ServiceType.EVENTCENTER) {
            return this.eventcentersService.findAllSubscriptions(limit, offset, serviceId);
        }
        return this.cateringService.findAllSubscriptions(limit, offset, serviceId);
    }

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Get(':id')
    findOne(
        @Param('id') id: string,
        @Query('serviceType') serviceType: ServiceType,
    ) {
        if (serviceType === ServiceType.EVENTCENTER) {
            return this.eventcentersService.findOneSubscription(id);
        }
        return this.cateringService.findOneSubscription(id);
    }
}
