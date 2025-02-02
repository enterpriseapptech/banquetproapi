import {IsEnum, IsNotEmpty, Length, IsOptional, IsString, IsInt, Min, IsArray } from 'class-validator';

export enum PricingType {
    HOURLY,
    DAILY,
    NEGOTIATION
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
    @IsString()
    status: string

}
