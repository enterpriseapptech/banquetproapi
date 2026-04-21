import { IsEnum, IsNotEmpty, Length, IsOptional, IsString, IsNumber, IsInt, IsDateString, IsJSON, IsUrl, IsUUID, IsArray, IsObject, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsImageFile } from '../media/images';
import { BillingAddress, InvoiceItem } from './payments.dto';
import { BookingDto } from '../booking';
import { Type } from 'class-transformer';
import { ServiceType } from '../shared';
export { ServiceType } from '../shared';

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


export enum PaymentMethod{
  STRIPE = 'STRIPE',
  PAYSTACK = 'PAYSTACK',
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
    PARTIALLY_PAID = 'PARTIALLY_PAID',
    OVER_PAID = 'OVER_PAID'
}



export enum RefundStatus {
    REQUESTED = 'REQUESTED',
    APPROVED = 'APPROVED',
    DECLINED = 'DECLINED',
    PROCESSING = 'PROCESSING',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED',
}

export enum WalletType {
    USER = 'USER',
    PLATFORM = 'PLATFORM',
}

export enum WalletTxType {
    CREDIT = 'CREDIT',
    DEBIT = 'DEBIT',
}

export enum WalletTxReason {
    TOPUP = 'TOPUP',
    INVOICE_PAYMENT = 'INVOICE_PAYMENT',
    SERVICE_CHARGE = 'SERVICE_CHARGE',
    ESCROW_HOLD = 'ESCROW_HOLD',
    ESCROW_RELEASE = 'ESCROW_RELEASE',
    REFUND = 'REFUND',
    WITHDRAWAL = 'WITHDRAWAL',
}

export enum WithdrawalStatus {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED',
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

export class CreateSecondInvoiceDto {

    @ApiProperty({
        description: 'ID of the booking related to the invoice',
        example: 'b1f1a0e5-14aa-4a21-a70f-d3ad0edc5a51',
    })
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    bookingId: string;


    @ApiProperty({
        description: 'ID of the booking related to the invoice',
        example: 'b1f1a0e5-14aa-4a21-a70f-d3ad0edc5a51',
    })
    @IsOptional()
    @IsObject()
    booking?: BookingDto;
    
    @ApiProperty({
        description: 'Due date for payment',
        example: '2025-09-01T00:00:00.000Z',
    })
    @IsNotEmpty()
    @IsDateString()
    dueDate: Date;

    @ApiProperty({
        description: 'Additional notes for the invoice',
        example: 'Thank you for your purchase!',
        required: false,
    })
    @IsOptional()
    @IsString()
    note?: string;

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

    @ApiProperty({ enum: ServiceType, required: false })
    @IsOptional()
    @IsEnum(ServiceType)
    serviceType?: ServiceType;

    @ApiProperty({ description: 'ID of the event center or catering service', example: 'svc_123', required: false })
    @IsOptional()
    @IsUUID()
    serviceId?: string;

    @ApiProperty({ description: 'ID of the subscription plan', example: 'plan_123', required: false })
    @IsOptional()
    @IsUUID()
    subscriptionPlanId?: string;

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

export class CreateServiceSubscriptionInvoiceDto {
    @ApiProperty({ description: 'ID of the user', example: 'user_123' })
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @ApiProperty({ enum: ServiceType, description: 'Which service type this subscription is for' })
    @IsEnum(ServiceType)
    serviceType: ServiceType;

    @ApiProperty({ description: 'ID of the event center or catering service', example: 'svc_123' })
    @IsNotEmpty()
    @IsUUID()
    serviceId: string;

    @ApiProperty({ description: 'ID of the subscription plan being purchased', example: 'plan_123' })
    @IsNotEmpty()
    @IsUUID()
    subscriptionPlanId: string;

    @ApiProperty({ description: 'Amount due', example: 10000 })
    @IsNumber({ maxDecimalPlaces: 2 })
    amountDue: number;

    @ApiProperty({ enum: Currency, required: false })
    @IsOptional()
    @IsEnum(Currency)
    currency?: Currency;

    @ApiProperty({ description: 'Billing address' })
    @IsNotEmpty()
    @IsJSON()
    billingAddress: BillingAddress;

    @ApiProperty({ description: 'Due date for payment', example: '2025-09-01T00:00:00.000Z' })
    @IsNotEmpty()
    @IsDateString()
    dueDate: Date;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    note?: string;
}

export class InitiateServiceSubscriptionDto {
    @ApiProperty({ description: 'ID of the authenticated user', example: 'user_123' })
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @ApiProperty({ enum: ServiceType })
    @IsEnum(ServiceType)
    serviceType: ServiceType;

    @ApiProperty({ description: 'ID of the event center or catering service', example: 'svc_123' })
    @IsNotEmpty()
    @IsUUID()
    serviceId: string;

    @ApiProperty({ description: 'ID of the subscription plan to purchase', example: 'plan_123' })
    @IsNotEmpty()
    @IsUUID()
    subscriptionPlanId: string;

    @ApiProperty({ description: 'Billing address' })
    @IsNotEmpty()
    @IsJSON()
    billingAddress: BillingAddress;

    @ApiProperty({ description: 'Due date for payment', example: '2025-09-01T00:00:00.000Z' })
    @IsNotEmpty()
    @IsDateString()
    dueDate: Date;

    @ApiProperty({ enum: Currency, required: false })
    @IsOptional()
    @IsEnum(Currency)
    currency?: Currency;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    note?: string;
}

export enum PaymentGateWay{
    stripe='stripe',
    paystack='paystack'
}


export class GeneratePaymentDto {

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    invoiceId?: string;

    @ApiProperty({ required: false, description: 'Required when no invoiceId (e.g. wallet funding)' })
    @IsOptional()
    @IsNumber()
    amount?: number;

    @ApiProperty({ required: false, enum: Currency })
    @IsOptional()
    @IsEnum(Currency)
    currency?: Currency;

    @ApiProperty()
    @IsOptional()
    @IsString()
    userId?: string; // Populated from gateway

    @ApiProperty()
    @IsEnum(PaymentGateWay)
    paymentGateWay: PaymentGateWay;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    callback_url?: string

    @ApiProperty()
    @IsString()
    email: string

    @ApiProperty({ enum: PaymentReason })
    @IsEnum(PaymentReason)
    paymentReason: PaymentReason;

}

export class CreatePaymentDto {
    @ApiProperty()
    @IsString()
    userId?: string;


    @ApiProperty()
    @IsString()
    paidAt: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    invoiceId?: string;

    @ApiProperty({ enum: PaymentMethod })
    @IsEnum(PaymentMethod)
    paymentMethod: PaymentMethod;


    @ApiProperty()
    @IsNumber()
    amount: number;

    @ApiProperty()
    @IsNumber()
    amountCharged: number;

    @ApiProperty()
    @IsString()
    reference: string;

    @ApiProperty()
    @IsString()
    paymentReference: string;


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
    @ApiProperty({ description: 'ID of the payment record (wallet payment) for this invoice' })
    @IsString()
    @IsUUID()
    paymentId: string;

    @ApiProperty({ description: 'Invoice being refunded' })
    @IsString()
    @IsUUID()
    invoiceId: string;

    @ApiProperty({ description: 'Customer who requested the refund' })
    @IsString()
    @IsUUID()
    customerId: string;

    @ApiProperty({ description: 'Service provider who must approve' })
    @IsString()
    @IsUUID()
    serviceProviderId: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    @IsUUID()
    bookingId?: string;

    @ApiProperty({ description: 'Customer stated reason for refund' })
    @IsString()
    refundReason: string;

    @ApiProperty({ required: false, description: 'Snapshot of refund policy at time of request' })
    @IsOptional()
    policySnapshot?: Record<string, any>;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber({ maxDecimalPlaces: 2 })
    deductionPercentage?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber({ maxDecimalPlaces: 2 })
    deductionAmount?: number;

    @ApiProperty({ description: 'Amount the customer will receive back after deductions' })
    @IsNumber({ maxDecimalPlaces: 2 })
    refundAmount: number;

    @ApiProperty({ enum: RefundStatus, default: RefundStatus.REQUESTED })
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

export class CreateWalletDto {
    @ApiProperty({ description: 'User ID to create wallet for (omit for platform wallet)' })
    @IsOptional()
    @IsString()
    @IsUUID()
    userId?: string;

    @ApiProperty({ enum: WalletType, default: WalletType.USER })
    @IsEnum(WalletType)
    @IsOptional()
    type?: WalletType;

    @ApiProperty({ enum: Currency, default: Currency.NGN })
    @IsOptional()
    @IsEnum(Currency)
    currency?: Currency;
}

export class TopupWalletDto {
    @ApiProperty({ description: 'User ID topping up (set by gateway from JWT)' })
    @IsUUID()
    userId: string;

    @ApiProperty({ example: 5000 })
    @IsNumber({ maxDecimalPlaces: 2 })
    amount: number;

    @ApiProperty({ enum: PaymentGateWay })
    @IsEnum(PaymentGateWay)
    paymentGateway: PaymentGateWay;

    @ApiProperty({ example: 'user@example.com' })
    @IsString()
    email: string;

    @ApiProperty({ enum: Currency, required: false })
    @IsOptional()
    @IsEnum(Currency)
    currency?: Currency;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    callback_url?: string;
}

export class PayInvoiceDto {
    @ApiProperty({ description: 'Invoice to pay' })
    @IsUUID()
    invoiceId: string;

    @ApiProperty({ description: 'User ID (set by gateway from JWT)' })
    @IsUUID()
    userId: string;
}

export class ReleaseEscrowDto {
    @ApiProperty({ description: 'Invoice whose escrow funds to release' })
    @IsUUID()
    invoiceId: string;

    @ApiProperty({ description: 'SP user ID to credit' })
    @IsUUID()
    serviceProviderId: string;
}

export class CreateWithdrawalDto {
    @ApiProperty({ description: 'User ID (set by gateway from JWT)' })
    @IsUUID()
    userId: string;

    @ApiProperty({ example: 2000 })
    @IsNumber({ maxDecimalPlaces: 2 })
    amount: number;

    @ApiProperty({ enum: Currency, default: Currency.NGN })
    @IsOptional()
    @IsEnum(Currency)
    currency?: Currency;

    @ApiProperty({
        description: 'Bank account details for payout',
        example: { accountNumber: '0123456789', bankName: 'First Bank', accountName: 'John Doe' },
    })
    @IsNotEmpty()
    bankDetails: Record<string, any>;
}

export class RefundPolicyTierDto {
    @ApiProperty({ description: 'Applies when days until event >= this value', example: 14 })
    @IsInt()
    minDaysBeforeEvent: number;

    @ApiProperty({ description: 'Percentage deducted from refund (0 = full refund)', example: 25 })
    @IsNumber({ maxDecimalPlaces: 2 })
    deductionPercentage: number;

    @ApiProperty({ required: false, example: '14-30 days: 25% deduction' })
    @IsOptional()
    @IsString()
    description?: string;
}

export class UpsertRefundPolicyDto {
    @ApiProperty({ description: 'Whether refunds are allowed at all', default: true })
    @IsOptional()
    allowRefunds?: boolean;

    @ApiProperty({ description: 'Minimum days before event to be eligible for a refund', default: 3 })
    @IsOptional()
    @IsInt()
    refundWindowDays?: number;

    @ApiProperty({ type: [RefundPolicyTierDto] })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => RefundPolicyTierDto)
    tiers?: RefundPolicyTierDto[];
}


export class CreateDisputeDto {
    @ApiProperty()
    @IsString()
    userId: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    paymentId?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    refundId?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    serviceRequestId?: string;

    @ApiProperty()
    @IsString()
    reason: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    adminNote?: string;

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
    @ApiProperty({ example: 'starter', description: 'plan name' })
    @IsString()
    @Length(3, 100)
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


export enum PaymentType {
    KYC = 'KYC',
    CERTIFICATION = 'CERTIFICATION',
    FEATUREDPLANS = 'FEATUREDPLANS',
    SUBSCRIPTIONPLANS = 'SUBSCRIPTIONPLANS',
}

export class CreateSubscriptionDto {
    // sent internally
    @ApiProperty({ example: 'uuid' })
    @IsString()
    @IsOptional()
    serviceProviderId?: string;

    @ApiProperty({ example: 'uuid' })
    @IsString()
    @IsNotEmpty()
    serviceId: string;

    @ApiProperty({ enum: ServiceType, required: false })
    @IsEnum(ServiceType)
    @IsOptional()
    serviceType?: ServiceType;

    @ApiProperty({ enum: PaymentType })
    @IsEnum(PaymentType)
    type: PaymentType;

    @ApiProperty({ example: 'fee_123' })
    @IsString()
    @IsOptional()
    feesId?: string;

    @ApiProperty({ example: 'plan_123' })
    @IsString()
    @IsOptional()
    subscriptionplanId?: string;

    @ApiProperty({ example: 'fp_123' })
    @IsString()
    @IsOptional()
    featuredPlanId?: string;

    // @ApiProperty({ enum: Status, required: false })
    // @IsEnum(Status)
    // @IsOptional()
    // status?: Status;

    // @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
    // @IsDateString()
    // expiryDate: Date;

    // Invoice fields
    // @ApiProperty({ example: 'user_123', description: 'ID of the user initiating the subscription' })
    // @IsNotEmpty()
    // @IsUUID()
    // userId: string;

    // @ApiProperty({ description: 'Amount due for this subscription', example: 5000 })
    // @IsNumber({ maxDecimalPlaces: 2 })
    // amountDue: number;

  @ApiProperty({ type: () => BillingAddress, description: 'Billing address' })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => BillingAddress)
  billingAddress: BillingAddress;


    @ApiProperty({ enum: Currency, required: false })
    @IsOptional()
    @IsEnum(Currency)
    currency?: Currency;

    // @ApiProperty({ required: false })
    // @IsOptional()
    // @IsString()
    // note?: string;
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