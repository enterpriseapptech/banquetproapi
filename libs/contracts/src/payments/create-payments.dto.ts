import { IsEnum, IsNotEmpty, Length, IsOptional, IsString, IsNumber, IsInt, IsDateString, IsJSON, IsUrl, IsUUID, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsImageFile } from '../media/images';
import { BillingAddress, InvoiceItem } from './payments.dto';

export enum FeesType {
    CERTIFICATION = 'CERTIFICATION',
    KYC = 'KYC'
}

export enum Status {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE'
}

export enum PaymentReason {
    WALLETFUNDING = 'WALLETFUNDING',
    SUBSCRIPTION = 'SUBSCRIPTION',
    KYC = 'KYC',
    CERTIFICATION = 'CERTIFICATION',
    FEATURED = 'FEATURED',
    SERVICEREQUEST = 'SERVICEREQUEST'
}

export enum IPaymentStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED',
    REFUNDED = 'REFUNDED',
    DISPUTED = 'DISPUTED'
}

export enum InvoiceStatus {
    PENDING = 'PENDING',
    PAID = 'PAID',
    OVERDUE = 'OVERDUE',
    PARTIALLY_PAID = 'PARTIALLY_PAID'
}



export enum RefundStatus {
    REQUESTED = 'REQUESTED',
    APPROVED = 'APPROVED',
    DECLINED = 'DECLINED',
    PROCESSING = 'PROCESSING',
}

export enum DisputeStatus {
    OPEN = 'OPEN',
    RESOLVED = 'RESOLVED',
    REJECTED = 'REJECTED',
}

export enum PaymentOption {
    CASH = 'CASH',
    CARD = 'CARD',
    TRANSFER = 'TRANSFER',
}

export enum Currency {
  NGN='NGN',
  USD='USD',
  GHS='GHS',
  ZAR='ZAR',
  KES='KES',
  XOF='XOF',
}

export class CreatePaymentMethodDto {
    @ApiProperty({ example: 'Visa', description: 'Payment provider name' })
    @IsString()
    @IsNotEmpty()
    provider: string;

    @ApiProperty({
        type: 'string',
        format: 'binary',
        required: true,
        description: 'Logo image file for the provider',
    })
    @IsImageFile({ message: 'providerLogo must be a valid image file' })
    providerLogoFile?: string;

    @ApiProperty({
        type: 'string',
        format: 'url',
        required: true,
        description: 'Logo image file for the provider',
    })
    @IsUrl({}, { message: 'providerLogo must be a valid URL' })
    providerLogoUrl?: string;


    @ApiProperty({ example: 'Visa', description: 'Payment provider name' })
    @IsNotEmpty()
    @IsString()
    status: Status

    @ApiProperty({ example: 'user-id', required: false })
    @IsNotEmpty()
    @IsString()
    createdBy: string;
}

export class CreateInvoiceDto {
    @ApiProperty({
        description: 'ID of the user associated with the invoice',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @ApiProperty({
        description: 'ID of the booking related to the invoice',
        example: 'b1f1a0e5-14aa-4a21-a70f-d3ad0edc5a51',
    })
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    bookingId: string;

    @ApiProperty({
        description: 'ID of the payment associated with the invoice (optional)',
        example: 'a6b0c9d3-1e29-4f9d-8466-f82ad9f2d6cb',
        required: false,
    })
    @IsOptional()
    @IsString()
    @IsUUID()
    paymentId?: string;

    @ApiProperty({
        description: 'Invoice items in JSON format',
        example: [{ item: 'Laptop', amount: 1200 }, { item: 'Mouse', amount: 25 }],
    })
    @IsJSON()
    items: InvoiceItem[];

    @ApiProperty({
        description: 'Subtotal before discount',
        example: 1225.0,
        type: Number,
    })
    @IsNotEmpty()
    @IsNumber({ maxDecimalPlaces: 2 })
    subTotal: number;

    @ApiProperty({
        description: 'Discount applied to the invoice',
        example: 25.0,
        type: Number,
    })
    @IsOptional()
    @IsNumber({ maxDecimalPlaces: 2 })
    discount?: number;

    @ApiProperty({
        description: 'Total amount after discount',
        example: 1200.0,
        type: Number,
    })
    @IsNumber({ maxDecimalPlaces: 2 })
    total: number;

    @ApiProperty({
        description: 'Total amount after discount',
        example: 1200.0,
        type: Number,
    })
    @IsNumber({ maxDecimalPlaces: 2 })
    amountDue: number;

    @ApiProperty({
        description: 'Currency used for the invoice',
        example: '#',
        required: false,
    })
    @IsOptional()
    @IsEnum(Currency)
    currency?: Currency;

    @ApiProperty({
        description: 'Additional notes for the invoice',
        example: 'Thank you for your purchase!',
        required: false,
    })
    @IsOptional()
    @IsString()
    note?: string;

    @ApiProperty({
        description: 'Billing address in JSON format',
        example: { street: '123 Main St', city: 'Lagos', country: 'Nigeria' },
    })
    @IsNotEmpty()
    @IsJSON()
    billingAddress: BillingAddress;

    @ApiProperty({
        description: 'Array of invoice UUIDs to remove or replace from the booking',
        example: [
            '550e8400-e29b-41d4-a716-446655440000',
            '550e8400-e29b-41d4-a716-446655440111',
        ],
        type: [String],
        format: 'uuid',
        required: false,
    })
    @IsOptional()
    @IsArray()
    @IsUUID('4', { each: true })
    replaceInvoice?: string[]; // used to remove an older invoice from the system and detach from booking

    @ApiProperty({
        description: 'Due date for payment',
        example: '2025-09-01T00:00:00.000Z',
    })
    @IsNotEmpty()
    @IsDateString()
    dueDate: Date;


    @ApiProperty({
        description: 'ID of the user who deleted the invoice',
        example: '987e6543-e21b-45d4-b567-526614174111',
        required: false,
    })
    @IsOptional()
    @IsUUID()
    deletedBy?: string;
}

export class CreateInvoiceDtoForSubscriptions {
    @ApiProperty({
        description: 'ID of the user associated with the invoice',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @ApiProperty({
        description: 'ID of the subscription related to the invoice',
        example: 'b1f1a0e5-14aa-4a21-a70f-d3ad0edc5a51',
    })
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    subscriptionId: string;

    @ApiProperty({
        description: 'ID of the payment associated with the invoice (optional)',
        example: 'a6b0c9d3-1e29-4f9d-8466-f82ad9f2d6cb',
        required: false,
    })
    @IsOptional()
    @IsString()
    @IsUUID()
    paymentId?: string;

    @ApiProperty({
        description: 'Invoice items in JSON format',
        example: [{ item: 'Laptop', amount: 1200 }, { item: 'Mouse', amount: 25 }],
    })
    @IsJSON()
    items: InvoiceItem[];

    @ApiProperty({
        description: 'Subtotal before discount',
        example: 1225.0,
        type: Number,
    })
    @IsNotEmpty()
    @IsNumber({ maxDecimalPlaces: 2 })
    subTotal: number;

    @ApiProperty({
        description: 'Discount applied to the invoice',
        example: 25.0,
        type: Number,
    })
    @IsOptional()
    @IsNumber({ maxDecimalPlaces: 2 })
    discount?: number;

    @ApiProperty({
        description: 'Total amount after discount',
        example: 1200.0,
        type: Number,
    })
    @IsNumber({ maxDecimalPlaces: 2 })
    total: number;

    @ApiProperty({
        description: 'Total amount after discount',
        example: 1200.0,
        type: Number,
    })
    @IsNumber({ maxDecimalPlaces: 2 })
    amountDue: number;

    @ApiProperty({
        description: 'Currency used for the invoice',
        example: '#',
        required: false,
    })
    @IsOptional()
    @IsEnum(Currency)
    currency?: Currency;



    @ApiProperty({
        description: 'Billing address in JSON format',
        example: { street: '123 Main St', city: 'Lagos', country: 'Nigeria' },
    })
    @IsNotEmpty()
    @IsJSON()
    billingAddress: BillingAddress;

    @ApiProperty({
        description: 'Due date for payment',
        example: '2025-09-01T00:00:00.000Z',
    })
    @IsNotEmpty()
    @IsDateString()
    dueDate: Date;


    @ApiProperty({
        description: 'ID of the user who deleted the invoice',
        example: '987e6543-e21b-45d4-b567-526614174111',
        required: false,
    })
    @IsOptional()
    @IsUUID()
    deletedBy?: string;
}

export enum PaymentGateWay{
    stripe='stripe',
    paystack='paystack'
}


export class GeneratePaymentDto {

    @ApiProperty()
    @IsString()
    invoiceId: string;

    @ApiProperty()
    @IsEnum(PaymentGateWay)
    paymentGateWay: PaymentGateWay;

    @ApiProperty()
    @IsString()
    @IsOptional()
    callback_url?: string
}

export class CreatePaymentDto {
    @ApiProperty()
    @IsString()
    userId: string;

    @ApiProperty()
    @IsString()
    invoiceId: string;

    @ApiProperty()
    @IsString()
    paymentMethodId: string;

    @ApiProperty()
    @IsNumber()
    amount: number;

    @ApiProperty()
    @IsNumber()
    amountCharged: number;

    @ApiProperty()
    @IsString()
    reference: string;

    @ApiProperty({ required: false, type: Object })
    @IsOptional()
    @IsJSON()
    paymentAuthorization?: Record<string, any>;

    @ApiProperty({ default: 'USD' })
    @IsOptional()
    @IsEnum(Currency)
    currency?: Currency;

    @ApiProperty({ enum: PaymentReason })
    @IsEnum(PaymentReason)
    paymentReason: PaymentReason;

    @ApiProperty({ enum: IPaymentStatus })
    @IsEnum(IPaymentStatus)
    status: IPaymentStatus;

    @ApiProperty()
    @IsString()
    transactionId: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    updatedBy?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    deletedBy?: string;
}




export class CreateRefundDto {
    @ApiProperty()
    @IsString()
    paymentId: string;

    @ApiProperty()
    @IsNumber()
    amount: number;

    @ApiProperty()
    @IsString()
    reason: string;

    @ApiProperty({ enum: RefundStatus })
    @IsEnum(RefundStatus)
    status: RefundStatus;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    updatedBy?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    deletedBy?: string;
}


export class CreateDisputeDto {
    @ApiProperty()
    @IsString()
    userId: string;

    @ApiProperty()
    @IsString()
    paymentId: string;

    @ApiProperty()
    @IsString()
    serviceRequestId: string;

    @ApiProperty()
    @IsString()
    reason: string;

    @ApiProperty({ enum: DisputeStatus })
    @IsEnum(DisputeStatus)
    status: DisputeStatus;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    updatedBy?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    deletedBy?: string;
}


export class CreateFeeDto {
    @ApiProperty({ example: 'test@gmail.com', description: 'email of the user' })
    @IsEnum(FeesType)
    @Length(6, 100)
    name: FeesType;

    @ApiProperty({ type: 'number', required: true })
    @Length(2, 50)
    @IsNotEmpty()
    amount: number;

    @ApiProperty({ type: 'string', required: false })
    @IsEnum(Status)
    @IsOptional()
    status?: Status
}

export class CreateSubscriptionPlanDto {
    @ApiProperty({ example: 'test@gmail.com', description: 'email of the user' })
    @IsString()
    @Length(6, 100)
    plan: string;

    @ApiProperty({ type: 'number', required: true })
    @IsNumber()
    @IsNotEmpty()
    amount: number;


    @ApiProperty({ type: 'number', required: true })
    @IsInt()
    timeFrame: number; // number of days this is valid

    @ApiProperty({ type: 'string', required: false })
    @IsEnum(Status)
    @IsOptional()
    status?: Status
}


export class CreateFeaturedPlanDto {
    @ApiProperty({ example: 'test@gmail.com', description: 'email of the user' })
    @IsString()
    @Length(6, 100)
    plan: string;

    @ApiProperty({ type: 'number', required: true })
    @IsNumber()
    @IsNotEmpty()
    amount: number;


    @ApiProperty({ type: 'number', required: true })
    @IsInt()
    timeFrame: number; // number of days this is valid

    @ApiProperty({ type: 'string', required: false })
    @IsEnum(Status)
    @IsOptional()
    status?: Status
}