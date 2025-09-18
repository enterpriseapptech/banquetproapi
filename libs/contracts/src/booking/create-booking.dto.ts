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
    ValidateNested,
    IsObject,
    Matches,

} from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BookingSource, Currency, ServiceType, SpecialRequirement } from './booking.dto';
import { Type } from 'class-transformer';


export class InvoiceItem {
  @ApiProperty({ description: 'Item name', example: 'Laptop' })
  @IsString()
  item: string;

  @ApiProperty({ description: 'Item amount', example: 1200 })
  @IsNumber()
  amount: number;
}

export class BillingAddress {
  @ApiProperty({ example: '123 Main St' })
  @IsString()
  street: string;

  @ApiProperty({ example: '123 Main St' })
  @IsOptional()
  @IsString()
  street2?: string;

  @ApiProperty({ example: 'Ikeja' })
  @IsString()
  city: string;

  @ApiProperty({ example: 'Lagos' })
  @IsString()
  state: string;

  @ApiProperty({ example: 'Nigeria' })
  @IsString()
  country: string;

  @ApiProperty({ example: '200911' })
  @IsString()
  postal: string;
}
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
    @IsUUID()
    @IsNotEmpty()
    serviceId: string;

    @ApiProperty({ type: 'string', required: true })
    @IsUUID()
    @IsOptional()
    requestQuoteId: string;

    @ApiProperty({ type: 'string', required: true })
    @IsEnum(ServiceType)
    @IsNotEmpty()
    serviceType:ServiceType;

    @ApiProperty({ type: 'number', required: true })
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 })
    subTotal: number;

    @ApiProperty({ type: 'number', required: false })
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 })
    discount?: number;

    @ApiProperty({ type: 'number', required: true })
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 })
    total: number;

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

    @ApiProperty({ type: 'string', required: false })
    @IsString()
    @IsOptional()
    serviceNotes?: string;

    @ApiProperty({ type: 'string', required: false })
    @IsString()
    @IsOptional()
    customerNotes?: string;

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

    @ApiProperty({
        description: 'Invoice items in JSON format',
        example: [{ item: 'Laptop', amount: 1200 }, { item: 'Mouse', amount: 25 }],
    })
    @IsArray()
    @IsObject({each: true})
    @ValidateNested({ each: true })
    @Type(() => InvoiceItem)
    items: InvoiceItem[];

    @ApiProperty({
        description: 'Billing address in JSON format',
        example: { street: '123 Main St', city: 'Lagos', country: 'Nigeria' },
        type: BillingAddress,
    })
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => BillingAddress)
    billingAddress: BillingAddress;


    @ApiProperty({
        description: 'Due date for payment',
        example: '2025-09-01T00:00:00.000Z',
    })
    @IsNotEmpty()
    @IsDateString()
    dueDate: Date;


    @ApiProperty({ default: 'USD' })
    @IsOptional()
    @IsEnum(Currency)
    currency?: Currency;


    @ApiPropertyOptional({ type: 'string', required: true })
    @IsUUID()
    @IsOptional()
    createdBy: string;

}

export class CreateRequestQuoteDto {
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
    @IsUUID()
    @IsNotEmpty()
    serviceId: string;

    @ApiProperty({ type: 'string', required: true })
    @IsEnum(ServiceType)
    @IsNotEmpty()
    serviceType:ServiceType;

    @ApiProperty({ type: 'number', required: true })
    @IsString()
    budget: string;


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

    @ApiProperty({ type: 'string', required: false })
    @IsString()
    @IsOptional()
    customerNotes?: string;

    @ApiProperty({
        description: 'Billing address in JSON format',
        example: { street: '123 Main St', city: 'Lagos', country: 'Nigeria' },
        type: BillingAddress,
    })
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => BillingAddress)
    billingAddress: BillingAddress;

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
    @Matches(
        /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])T([01]\d|2[0-3]):[0-5]\d:[0-5]\d(\.\d{3})?Z$/,
        { message: 'Start time must be a valid ISO-8601 datetime (YYYY-MM-DDTHH:mm:ss.sssZ)' },
    )
    @IsDateString()
    startTime: string; 

    
    @ApiProperty({ type: 'string', required: true, example: '2025-03-02T14:30:00.000Z', description: 'Start time in YYYY-MM-DDTHH:mm:ssZ format (24-hour time)' })
    @IsNotEmpty({ message: 'Start time is required' })
    @Matches(
        /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])T([01]\d|2[0-3]):[0-5]\d:[0-5]\d(\.\d{3})?Z$/,
        { message: 'Start time must be a valid ISO-8601 datetime (YYYY-MM-DDTHH:mm:ss.sssZ)' },
    )
    @IsDateString()
    endTime: string; 
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
        type: [CreateTimeslotDto], required: true, example: [{
            startTime: '2025-03-02T14:30:00.000Z',
            endTime: '2025-03-02T14:30:00.000Z'
        }]
    })
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })   // 👈 validates each slot
    @Type(() => CreateTimeslotDto)    // 👈 transforms plain -> DTO
    slots: CreateTimeslotDto[]

    @ApiProperty({ type: 'string', required: true })
    @IsUUID()
    createdBy: string;
}