import {IsEnum, IsNotEmpty, Length, IsOptional, IsString, IsInt, Min, IsArray } from 'class-validator';
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
    service_provider_id: string;

    @IsInt()
    @Min(50)
    depositAmount: number;


    @IsInt()
    @Min(50)
    totalAmount: number;


    @IsOptional()
    @IsString()
    @Length(30, 1000)
    description?: string

    @IsNotEmpty()
    @IsEnum(PricingType, {
        message: 'pricing type must be one of the following:HOURLY, DAILY, NEGOTIATION',
    })
    pricingType: PricingType

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
