import {IsEnum, IsNotEmpty, Length, IsOptional, IsString, IsInt, Min, IsArray, IsNumber } from 'class-validator';
import { $Enums } from '@prisma/eventcenters';

export enum PricingType {
    HOURLY = "HOURLY",
    DAILY = "DAILY",
    NEGOTIATION = "NEGOTIATION"
}

export enum ServiceStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
}


export class CreateEventCenterDto {
    @IsString()
    @Length(26, 40)
    serviceProviderId: string;

    @Min(10)
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 })
    depositAmount: number;


    @IsOptional()
    @IsString()
    @Length(30, 1000)
    description?: string

    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 })
    pricingPerSlot: number

    @IsInt()
    @Min(10)
    sittingCapacity: number;

    @IsOptional()
    @IsString()
    venueLayout?: string;


    @IsArray()
    @IsNotEmpty()
    @IsEnum($Enums.Amenities, { each: true }) 
    amenities: string[]

    @IsArray()
    @IsNotEmpty()
    images: string[]


    @IsNotEmpty()
    termsOfUse: string

    @IsNotEmpty()
    @IsString()
    cancellationPolicy: string

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    streetAddress: string

    @IsOptional()
    @IsString()
    streetAddress2?: string


    @IsNotEmpty()
    @IsString()
    city: string

    @IsNotEmpty()
    @IsString()
    state: string

    @IsNotEmpty()
    @IsString()
    country: string

    @IsNotEmpty()
    @IsString()
    postal: string

    @IsNotEmpty()
    @IsEnum(ServiceStatus, {message: 'service status must either be active or inactive'})
    status: string

}
