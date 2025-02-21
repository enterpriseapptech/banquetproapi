import {
    IsUUID,
    IsOptional,
    IsNotEmpty,
    IsEnum,
    IsInt,
    Min,
    IsBoolean,
    IsArray,
    IsString,
    IsNumber,
} from 'class-validator';
import { $Enums } from '@prisma/booking';
import { $Enums as $EventBookingEnums } from '@prisma/eventcenters';

export class CreateBookingDto {

    @IsUUID()
    @IsNotEmpty()
    customerId: string;

    @IsEnum($Enums.ServiceType)
    @IsNotEmpty()
    serviceType: $Enums.ServiceType;

    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 })
    totalBeforeDiscount: number;

    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 })
    discount?: number;

    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 })
    totalAfterDiscount: number;

    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty()
    bookingDates: string[];

    @IsBoolean()
    @IsNotEmpty()
    isTermsAccepted: boolean;

    @IsBoolean()
    @IsNotEmpty()
    isCancellationPolicyAccepted: boolean;

    @IsBoolean()
    @IsNotEmpty()
    isLiabilityWaiverSigned: boolean;

    // @IsNotEmpty()
    // @IsAlphanumeric()
    // bookingReference: string;

    @IsEnum($Enums.BookingSource, { message: 'invalid booking source, must be web or mobile' })
    @IsNotEmpty()
    source: string;

    @IsString()
    @IsNotEmpty()
    serviceNotes?: string;

    @IsString()
    @IsNotEmpty()
    customerNotes?: string;


    @IsUUID()
    @IsNotEmpty()
    eventcenterId: string;

    @IsString()
    @IsOptional()
    eventName?: string;

    @IsString()
    @IsOptional()
    eventTheme?: string;

    @IsString()
    @IsOptional()
    eventType?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsInt()
    @Min(1)
    @IsOptional()
    noOfGuest?: number;

    @IsArray()
    @IsEnum($EventBookingEnums.SpecialRequirement, { each: true })
    @IsOptional()
    specialRequirements?: $EventBookingEnums.SpecialRequirement[];

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    images?: string[];
}


export class CreateEventCenterBookingDto {

    @IsUUID()
    @IsNotEmpty()
    eventcenterId: string;

    @IsUUID()
    @IsNotEmpty()
    bookingId: string;

    @IsString()
    @IsOptional()
    eventName?: string;

    @IsString()
    @IsOptional()
    eventTheme?: string;

    @IsString()
    @IsOptional()
    eventType?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsInt()
    @Min(1)
    @IsOptional()
    noOfGuest?: number;


    @IsOptional()
    @IsArray()
    @IsEnum($EventBookingEnums.SpecialRequirement, { each: true })
    specialRequirements?: $EventBookingEnums.SpecialRequirement[];

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    images?: string[];

}
