import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsUUID, } from 'class-validator';
import { ApiProperty} from '@nestjs/swagger';
import { CreateFeaturedPlanDto, CreateFeeDto, CreateSubscriptionPlanDto } from './create-payments.dto';


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
