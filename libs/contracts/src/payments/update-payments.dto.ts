import { PartialType } from '@nestjs/mapped-types';
import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsUUID, } from 'class-validator';
import { ApiProperty} from '@nestjs/swagger';
import { CreateDisputeDto, CreateFeaturedPlanDto, CreateFeeDto, CreateInvoiceDto, CreatePaymentDto, CreatePaymentMethodDto, CreateRefundDto, CreateSubscriptionDto, CreateSubscriptionPlanDto, Status } from './create-payments.dto';



export class UpdateDisputeDto extends PartialType(CreateDisputeDto) {}
export class UpdateSubscriptionDto extends PartialType(CreateSubscriptionDto) {
    @ApiProperty({ enum: Status, required: false })
    @IsEnum(Status)
    @IsOptional()
    status?: Status;

    @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
    @IsDateString()
    expiryDate: Date;


    @ApiProperty({ example: 'user_123', description: 'ID of the user initiating the subscription' })
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @ApiProperty({ description: 'Amount due for this subscription', example: 5000.00 })
    @IsNumber({ maxDecimalPlaces: 2 })
    amountDue: number;

}
export class UpdateRefundDto extends PartialType(CreateRefundDto) {}
export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {}
export class UpdatePaymentMethodDto extends PartialType(CreatePaymentMethodDto) {}
export class UpdateInvoiceDto extends PartialType(CreateInvoiceDto) {}

export class UpdateFeeDto extends PartialType(CreateFeeDto) {

    @ApiProperty({ type: 'string', required: false })
    @IsOptional()
    @IsUUID()
    deletedBy?: string

    @ApiProperty({ type: 'string', required: false })
    @IsOptional()
    @IsUUID()
    updatedBy?: string

}


export class UpdateFeaturedPlanDto extends PartialType(CreateFeaturedPlanDto) {

    @ApiProperty({ type: 'string', required: false })
    @IsOptional()
    @IsUUID()
    deletedBy?: string

    @ApiProperty({ type: 'string', required: false })
    @IsOptional()
    @IsUUID()
    updatedBy?: string

}


export class UpdateSubscriptionPlanDto extends PartialType(CreateSubscriptionPlanDto) {

    @ApiProperty({ type: 'string', required: false })
    @IsOptional()
    @IsUUID()
    deletedBy?: string

    @ApiProperty({ type: 'string', required: false })
    @IsOptional()
    @IsUUID()
    updatedBy?: string

}
