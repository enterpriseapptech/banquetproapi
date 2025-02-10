import { PartialType } from '@nestjs/mapped-types';
import { CreateBookingDto } from './create-booking.dto';
import { IsArray, IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { $Enums } from '@prisma/booking';

export class UpdateBookingDto extends PartialType(CreateBookingDto) {
    @IsUUID()
    @IsOptional()
    confirmed_by?: string;

    @IsDateString()
    @IsOptional()
    confirmedAt?: Date;

    @IsUUID()
    @IsOptional()
    servicebooking_id?: string;

    @IsEnum($Enums.PaymentStatus)
    @IsNotEmpty()
    paymentStatus: $Enums.PaymentStatus;

    @IsEnum($Enums.BookingStatus)
    @IsNotEmpty()
    status: $Enums.BookingStatus;

    @IsUUID()
    @IsOptional()
    rescheduled_by: string;

    @IsDateString()
    @IsOptional()
    rescheduledAt?: Date;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    previousDates?: string[];

    @IsUUID()
    @IsOptional()
    cancelled_by?: string;

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
    deleted_by?: string;
}



export class UpdateEventBookingDto extends PartialType(CreateBookingDto) {

    @IsDateString()
    @IsOptional()
    deletedAt?: Date;

    @IsUUID()
    @IsOptional()
    deleted_by?: string;
}
