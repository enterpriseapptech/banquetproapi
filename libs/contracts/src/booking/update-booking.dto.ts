import { PartialType } from '@nestjs/mapped-types';
import { BillingAddress, CreateBookingDto, CreateTimeslotDto } from './create-booking.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IsArray, IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, ArrayUnique, ValidateNested, } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BookingStatus, InvoiceStatus } from './booking.dto';
import { Type } from 'class-transformer';


export class UpdateBookingDto extends PartialType(CreateBookingDto) {
  @ApiProperty({
    description: 'Discount applied to the booking, if any',
    example: 10,
    type: Number,
  })
  discount?: number;


  @ApiProperty({
    description: 'List of selected booking dates',
    example: ['2025-08-01T10:00:00Z', '2025-08-02T12:00:00Z'],
    type: [String],
  })
  bookingDates?: string[];

  @ApiProperty({
    description: 'Internal service notes regarding the booking',
    example: 'Customer prefers morning appointments.',
    type: String,
  })
  serviceNotes?: string;

  @ApiProperty({
    description: 'Notes from the customer about the booking',
    example: 'Please bring cleaning supplies.',
    type: String,
  })
  customerNotes?: string;

  @ApiProperty({
    description: 'User ID of the person who confirmed the booking',
    example: 'c1a2b3c4-d5e6-789f-1234-56789abcdef0',
    type: String,
  })
  @IsUUID()
  @IsOptional()
  confirmedBy?: string;

  @ApiProperty({
    description: 'Payment status of the booking',
    enum: InvoiceStatus,
    example: InvoiceStatus.PAID,
  })
  @IsEnum(InvoiceStatus)
  @IsNotEmpty()
  paymentStatus: InvoiceStatus;

  @ApiProperty({
    description: 'Current booking status',
    enum: BookingStatus,
    example: BookingStatus.CONFIRMED,
  })
  @IsEnum(BookingStatus)
  @IsNotEmpty()
  status: BookingStatus;

  @ApiProperty({
    description: 'User ID of the person who rescheduled the booking',
    example: 'f9e8d7c6-b5a4-3210-6543-210fedcba987',
    type: String,
  })
  @IsUUID()
  @IsOptional()
  rescheduledBy?: string;

  @ApiProperty({
    description: 'List of previously scheduled booking dates',
    example: ['2025-07-29T14:00:00Z'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  previousDates?: string[];

  @ApiProperty({
    description: 'User ID of the person who cancelled the booking',
    example: 'abc12345-def6-7890-ghij-klmnopqrstuv',
    type: String,
  })
  @IsUUID()
  @IsOptional()
  cancelledBy?: string;

  @ApiProperty({
    description: 'Reason for cancellation',
    example: 'Client had to travel unexpectedly.',
    type: String,
  })
  @IsString()
  @IsOptional()
  cancellationReason?: string;

  @ApiProperty({
    description: 'User ID of the person who deleted the booking',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  @IsUUID()
  @IsOptional()
  deletedBy?: string;


  //   extra fields for eventcenters and catering booking
  eventName
  eventTheme
  eventType
  description
  noOfGuest
  specialRequirements
  images
  dishTypes
  cuisine

}

export class UpdateRequestQuoteDto {
  @ApiProperty({
    description: 'budgetfor this request for quotation',
    example: "100-200",
    type: String,
  })
  budget?: string;

  @ApiProperty({ type: 'string', required: true })
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  timeslotId: string[];

  @ApiProperty({
    description: 'Notes from the customer about the booking',
    example: 'Please bring cleaning supplies.',
    type: String,
  })
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

  @ApiProperty({
    description: 'Current booking status',
    enum: BookingStatus,
    example: BookingStatus.CONFIRMED,
  })
  @IsEnum(BookingStatus)
  @IsNotEmpty()
  status: InvoiceStatus;



  @ApiProperty({
    description: 'User ID of the person who deleted the booking',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  @IsUUID()
  @IsOptional()
  deletedBy?: string;

}

export class UpdateEventBookingDto extends PartialType(CreateBookingDto) {

  @IsDateString()
  @IsOptional()
  deletedAt?: Date;

  @IsUUID()
  @IsOptional()
  deletedBy?: string;
}

export class UpdateCateringBookingDto extends PartialType(CreateBookingDto) {

  @IsDateString()
  @IsOptional()
  deletedAt?: Date;

  @IsUUID()
  @IsOptional()
  deletedBy?: string;
}

export class UpdateTimeslotDto extends PartialType(CreateTimeslotDto) {


  @ApiProperty({ type: 'string', required: false })
  @IsOptional()
  @IsUUID()
  bookingId?: string;

  @ApiProperty({ type: 'string', required: false })
  @IsOptional()
  @IsString({ each: true })
  previousBookings?: string;

  @ApiProperty({ type: 'string', required: false })
  @IsOptional()
  @IsUUID()
  updatedBy?: string;

  @ApiProperty({ type: 'string', required: false })
  @IsOptional()
  @IsUUID()
  deletedBy?: string;
}
