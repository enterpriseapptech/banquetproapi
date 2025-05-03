import { IsEnum, IsNotEmpty, Length, IsOptional, IsString, IsNumber, IsInt, IsDateString, IsJSON, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsImageFile } from '../Media/images';

export enum FeesType {
    CERTIFICATION = 'CERTIFICATION',
    KYC = 'KYC'
}

export enum Status {
    ACTIVE= 'ACTIVE',
    INACTIVE= 'INACTIVE'  
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

  
export class CreatePaymentDto {
    @ApiProperty()
    @IsString()
    userId: string;
  
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
    @IsString()
    currency?: string;
  
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


export class CreateInvoiceDto {
    @ApiProperty()
    @IsString()
    userId: string;
  
    @ApiProperty()
    @IsString()
    paymentId: string;
  
    @ApiProperty({ enum: InvoiceStatus })
    @IsEnum(InvoiceStatus)
    status: InvoiceStatus;
  
    @ApiProperty()
    @IsDateString()
    dueDate: string;
  
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