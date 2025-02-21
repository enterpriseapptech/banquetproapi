import { PartialType } from '@nestjs/mapped-types';
import { CreateCateringDto, CreateCuisineDto, CreateMenuDto } from './create-catering.dto';
import { IsBoolean, IsDate, IsDateString,  IsEnum,  IsOptional, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { $Enums } from '@prisma/catering';

export class UpdateCateringDto extends PartialType(CreateCateringDto) {

    @IsOptional()
    @IsEnum($Enums.ServiceStatus)
    status: $Enums.ServiceStatus;
    
    @IsOptional()
    @IsBoolean()
    isFeatured: boolean;

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


export class UpdateCuisineDto extends PartialType(CreateCuisineDto) {

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

