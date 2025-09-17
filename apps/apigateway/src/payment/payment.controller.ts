import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { InvoiceService, PaymentMethodService, PaymentService } from './payment.service';
import { JwtAuthGuard } from '../jwt/jwt.guard';
import { VerificationGuard } from '../jwt/verification.guard';
import { CreateInvoiceDto, CreatePaymentDto, CreatePaymentMethodDto, GeneratePaymentDto, UpdatePaymentDto, UpdatePaymentMethodDto } from '@shared/contracts/payments';
import { firstValueFrom } from 'rxjs';
import { UserDto } from '@shared/contracts/users';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { ApiTags } from '@nestjs/swagger';


interface AuthenticatedRequest extends Request {
  user?: any; // Change `any` to your actual user type if known
}


@ApiTags('invoice')
@Controller('invoice')
export class InvoiceController {
    constructor(private readonly invoiceService: InvoiceService) { }

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Post('create')
    create(@Body() createInvoiceDto: CreateInvoiceDto) {
        return this.invoiceService.create(createInvoiceDto);
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
    constructor(private readonly paymentService: PaymentService) { }

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Post('initiate')
    initiate(@Body() generatePaymentDto: GeneratePaymentDto) {
        return this.paymentService.initiate(generatePaymentDto);
    }

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Post('create')
    create(@Body() createPaymentDto: CreatePaymentDto) {
        return this.paymentService.create(createPaymentDto);
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
