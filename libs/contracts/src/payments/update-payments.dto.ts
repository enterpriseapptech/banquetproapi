import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsUUID, } from 'class-validator';
import { ApiProperty} from '@nestjs/swagger';
import { CreateDisputeDto, CreateFeaturedPlanDto, CreateFeeDto, CreateInvoiceDto, CreatePaymentDto, CreatePaymentMethodDto, CreateRefundDto, CreateSubscriptionPlanDto } from './create-payments.dto';



export class UpdateDisputeDto extends PartialType(CreateDisputeDto) {}
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
