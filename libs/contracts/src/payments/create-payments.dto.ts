import { IsEnum, IsNotEmpty, Length, IsOptional, IsString, IsNumber, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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

export enum PaymentStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED',
    REFUNDED = 'REFUNDED',
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