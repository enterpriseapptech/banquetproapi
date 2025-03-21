import { PartialType } from '@nestjs/mapped-types';
import { CreateBookingDto, CreateTimeslotDto } from './create-booking.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IsArray, IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, ArrayUnique, } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BookingStatus, PaymentStatus } from './booking.dto';

export class UpdateBookingDto extends PartialType(CreateBookingDto) {
    @IsUUID()
    @IsOptional()
    confirmedBy?: string;

    @IsDateString()
    @IsOptional()
    confirmedAt?: Date;

    @IsUUID()
    @IsOptional()
    servicebookingId?: string;

    @IsEnum(PaymentStatus)
    @IsNotEmpty()
    paymentStatus: PaymentStatus;

    @IsEnum(BookingStatus)
    @IsNotEmpty()
    status: BookingStatus;

    @IsUUID()
    @IsOptional()
    rescheduledBy: string;

    @IsDateString()
    @IsOptional()
    rescheduledAt?: Date;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    previousDates?: string[];

    @IsUUID()
    @IsOptional()
    cancelledBy?: string;

    @IsDateString()
    @IsOptional()
    cancelledAt?: Date;

    @IsString()
    @IsOptional()
    cancellationReason?: string;

    @IsDateString()
    @IsOptional()
    deletedAt?: Date;

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
