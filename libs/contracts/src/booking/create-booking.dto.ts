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
    IsDateString,

} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { BookingSource, ServiceType, SpecialRequirement } from './booking.dto';
export class CreateBookingDto {
    @ApiProperty({ type: 'string', required: true })
    @IsUUID()
    @IsNotEmpty()
    customerId: string;

    @ApiProperty({ type: 'string', required: true })
    @IsNotEmpty()
    @IsArray()
    @IsString({ each: true })
    timeslotId: string[];

    @ApiProperty({ type: 'string', required: true })
    @IsEnum(ServiceType)
    @IsNotEmpty()
    serviceType:ServiceType;

    @ApiProperty({ type: 'number', required: true })
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 })
    totalBeforeDiscount: number;

    @ApiProperty({ type: 'number', required: true })
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 })
    discount?: number;

    @ApiProperty({ type: 'number', required: true })
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 })
    totalAfterDiscount: number;

    @ApiProperty({ type: 'array', required: true })
    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty()
    bookingDates: string[];

    @ApiProperty({ type: 'boolean', required: true })
    @IsBoolean()
    @IsNotEmpty()
    isTermsAccepted: boolean;

    @ApiProperty({ type: 'boolean', required: true })
    @IsBoolean()
    @IsNotEmpty()
    isCancellationPolicyAccepted: boolean;

    @ApiProperty({ type: 'boolean', required: true })
    @IsBoolean()
    @IsNotEmpty()
    isLiabilityWaiverSigned: boolean;

    @ApiProperty({ type: 'string', required: true })
    @IsEnum(BookingSource, { message: 'invalid booking source, must be web or mobile' })
    @IsNotEmpty()
    source: string;

    @ApiProperty({ type: 'string', required: true })
    @IsString()
    @IsNotEmpty()
    serviceNotes?: string;

    @ApiProperty({ type: 'string', required: true })
    @IsString()
    @IsNotEmpty()
    customerNotes?: string;


    @ApiProperty({ type: 'string', required: true })
    @IsUUID()
    @IsNotEmpty()
    serviceId: string;

    @ApiProperty({ type: 'string', required: false })
    @IsString()
    @IsOptional()
    eventName?: string;

    @ApiProperty({ type: 'string', required: false })
    @IsString()
    @IsOptional()
    eventTheme?: string;

    @ApiProperty({ type: 'array', required: false })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    dishTypes?: string[]

    @ApiProperty({ type: 'array', required: false })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    cuisine?: string[]

    @ApiProperty({ type: 'string', required: false })
    @IsString()
    @IsOptional()
    eventType?: string;

    @ApiProperty({ type: 'string', required: false })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ type: 'string', required: false })
    @IsInt()
    @Min(1)
    @IsOptional()
    noOfGuest?: number;

    @ApiProperty({ type: 'string', required: false })
    @IsArray()
    @IsEnum(SpecialRequirement, { each: true })
    @IsOptional()
    specialRequirements?:SpecialRequirement[];

    @ApiProperty({ type: 'array', format: 'binary', required: false })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    images?: any[];
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
    @IsEnum(SpecialRequirement, { each: true })
    specialRequirements?:SpecialRequirement[];

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    images?: string[];

}

export class CreateTimeslotDto {
    @ApiProperty({ type: 'string', required: true, example: '2025-03-02T14:30:00.000Z', description: 'Start time in YYYY-MM-DDTHH:mm:ssZ format (24-hour time)' })
    @IsNotEmpty({ message: 'Start time is required' })
    @IsDateString()
    startTime: Date; 

    
    @ApiProperty({ type: 'string', required: true, example: '2025-03-02T14:30:00.000Z', description: 'Start time in YYYY-MM-DDTHH:mm:ssZ format (24-hour time)' })
    @IsNotEmpty({ message: 'Start time is required' })
    @IsDateString()
    endTime: Date; 
}

export class CreateManyTimeSlotDto{
    @ApiProperty({ type: 'string', required: true })
    @IsUUID()
    serviceId: string;

    @ApiProperty({
        type: 'string', required: true, example: 'CATERING || EVENTCENTER' })
    @IsEnum(ServiceType)
    serviceType: string;

    @ApiProperty({
        type: 'array', required: true, example: [{
            startTime: '2025-03-02T14:30:00.000Z',
            endTime: '2025-03-02T14:30:00.000Z'
        }]
    })
    @IsNotEmpty()
    @IsArray()
    slots: CreateTimeslotDto[]

    @ApiProperty({ type: 'string', required: true })
    @IsUUID()
    createdBy: string;
}