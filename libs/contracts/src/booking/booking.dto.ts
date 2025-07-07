import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, IsDateString, Min } from 'class-validator';

export enum LocationStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE"
}

export enum BookingSource {
    WEB = "WEB",
    MOBILE = "MOBILE"
}

export enum ServiceType {
    CATERING = "CATERING",
    EVENTCENTER = "EVENTCENTER"
}

export enum BookingStatus {
    PENDING = "PENDING",
    BOOKED = "BOOKED",
    RESERVED = "RESERVED",
    POSTPONED = "POSTPONED",
    CANCELED = "CANCELED"
}

export enum PaymentStatus {
    UNPAID = "UNPAID",
    FULLY_PAID = "FULLY_PAID",
    PARTIALLY_PAID = "PARTIALLY_PAID"
}

export enum SpecialRequirement {
    WHEELCHAIRACCESS = "WHEELCHAIRACCESS",
    TEMPERATUREADJUSTMENT = "TEMPERATUREADJUSTMENT"
}



export class BookingDto {
    id: string;
    customerId?: string;
    confirmedBy?: string;
    confirmedAt?: Date;
    servicebooking_id?: string;
    serviceType: ServiceType;
    totalBeforeDiscount: number;
    discount?: number;
    totalAfterDiscount: number;
    paymentStatus: PaymentStatus;
    status: BookingStatus;
    bookingDates: string[];
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
    eventCenterBooking?: EventCenterBookingDto; // Optional if linked to an event center booking
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
    serviceProvider?: string;
    startDate?: Date;
    endDate?: Date;
}

export class ManyBookingDto {
    count: number;
    data: BookingDto[];
}