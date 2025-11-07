import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, IsDateString, Min } from 'class-validator';
import { BillingAddress } from './create-booking.dto';

export enum LocationStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE"
}

export enum BookingSource {
    WEB = "WEB",
    MOBILE = "MOBILE"
}
export enum Currency {
  NGN='NGN',
  USD='USD',
  GHS='GHS',
  ZAR='ZAR',
  KES='KES',
  XOF='XOF',
}

export enum ServiceType {
    CATERING = "CATERING",
    EVENTCENTER = "EVENTCENTER"
}

export enum BookingStatus {
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED",
    RESERVED = "RESERVED",
    POSTPONED = "POSTPONED",
    CANCELED = "CANCELED"
}

export enum SpecialRequirement {
    WHEELCHAIRACCESS = "WHEELCHAIRACCESS",
    TEMPERATUREADJUSTMENT = "TEMPERATUREADJUSTMENT"
}

export enum InvoiceStatus {
    PENDING = 'PENDING',
    PAID = 'PAID',
    OVERDUE = 'OVERDUE',
    GENERATED = 'GENERATED',
    PARTIALLY_PAID = "PARTIALLY_PAID"
}


export class BookingDto {
    id: string;
    customerId?: string;
    confirmedBy?: string;
    confirmedAt?: Date;
    serviceName?: string;
    serviceProvider?: string;
    servicebooking_id?: string;
    serviceType: ServiceType;
    subTotal: number;
    discount?: number;
    total: number;
    invoice: string[]
    paymentStatus: InvoiceStatus;
    status: BookingStatus;
    isTermsAccepted: boolean;
    isCancellationPolicyAccepted: boolean;
    isLiabilityWaiverSigned: boolean;
    bookingReference: string;
    source?: BookingSource;
    serviceNotes?: string;
    customerNotes?: string;
    rescheduledBy?: string;
    rescheduledAt?: Date;
    previousDates?: string[];
    canceledBy?: string;
    canceledAt?: Date;
    cancellationReason?: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    deletedBy?: string;
    cateringBooking?: any
    requestQuote?: any
    confirmedTimeSlots?: TimeslotDto[]
    requestedTimeSlots?: TimeslotDto[]
    eventCenterBooking?: any; // Optional if linked to an event center booking
}


export class EventCenterBookingDto {
    id: string;
    eventcenterId: string;
    bookingId: string;
    eventName?: string;
    eventTheme?: string;
    eventType?: string;
    description?: string;
    noOfGuest?: number;
    specialRequirements?: SpecialRequirement[];
    images: string[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    deletedBy?: string;
}


// export class EventCenterBookingDto {
//     id: string;
//     eventcenterId: string;
//     bookingId: string;
//     eventName?: string;
//     eventTheme?: string;
//     eventType?: string;
//     description?: string;
//     noOfGuest?: number;
//     specialRequirements?: SpecialRequirement[];
//     images: string[];
//     createdAt: Date;
//     updatedAt: Date;
//     deletedAt?: Date;
//     deletedBy?: string;
// }


export class TimeslotDto {
    id: string;
    serviceId: string;
    serviceType: string;
    bookingId: string;
    startTime: Date;
    endTime: Date;
    isAvailable: boolean;
    previousBookings: string[];
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    updatedBy?: string;
    deletedAt?: Date;
    deletedBy?: string;
}

export class RequestQuoteDto {
    id: string;
    customerId?: string;
    serviceProvider: string;
    serviceId?: string;
     serviceName?: string;
    serviceType: ServiceType;
    budget: string;
    quoteReference: string;
    status: InvoiceStatus;
    isTermsAccepted: boolean;
    isCancellationPolicyAccepted: boolean;
    isLiabilityWaiverSigned: boolean;
    source?: BookingSource;
    customerNotes?: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    deletedBy?: string;
    billingAddress?: BillingAddress
    booking?: any
    requestedTimeSlots?: TimeslotDto[]
}



export class ManyTimeslotDto{
    count: number;
    data: TimeslotDto[];
}
export class ManyRequestTimeSlotDto {
  
  @ApiProperty({
    description: 'The maximum number of records to return',
    example: 10,
    minimum: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit: number;

  @ApiProperty({
    description: 'The number of records to skip',
    example: 0,
    minimum: 0,
  })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  offset: number;

  @ApiPropertyOptional({
    description: 'The ID of the service to filter by',
    example: 'svc_abc123',
  })
  @IsOptional()
  @IsString()
  serviceId?: string;

  @ApiPropertyOptional({
    description: 'The specific date to filter time slots (in ISO format)',
    example: '2025-07-08',
  })
  @IsOptional()
  @IsDateString()
  date?: Date;
}

export class ManyRequestBookingDto {
    limit: number;
    offset: number;
    serviceId?: string;
    serviceProvider?: string;
    startDate?: Date;
    endDate?: Date;
}

export class ManyBookingDto {
    count: number;
    data: BookingDto[];
}


export class ManyRequestQuoteDto {
    count: number;
    data: RequestQuoteDto[];
}