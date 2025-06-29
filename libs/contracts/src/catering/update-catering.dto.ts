import { PartialType } from '@nestjs/mapped-types';
import { CreateCateringDto, CreateMenuDto } from './create-catering.dto';
import { IsBoolean, IsDate, IsDateString,  IsEnum,  IsOptional, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { ServiceStatus } from './catering.dto';


export class UpdateCateringDto extends PartialType(CreateCateringDto) {

    @IsOptional()
    @IsEnum(ServiceStatus)
    status?: ServiceStatus;
    
    @IsOptional()
    @IsBoolean()
    isFeatured?: boolean;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    featureExpiringAt?: Date;


    @IsOptional()
    @IsUUID()
    updatedBy?: string;

    @IsOptional()
    @IsDateString()
    @IsOptional()
    deletedAt?: Date;

    @IsOptional()
    @IsUUID()
    deletedBy?: string;
}


export class UpdateMenuDto extends PartialType(CreateMenuDto) {

    @IsOptional()
    @IsUUID()
    updatedBy?: string;

    @IsOptional()
    @IsDateString()
    @IsOptional()
    deletedAt?: Date;

    @IsOptional()
    @IsUUID()
    deletedBy?: string;
}

