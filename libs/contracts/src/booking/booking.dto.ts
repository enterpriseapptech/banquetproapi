import { $Enums } from '@prisma/booking';

export class BookingDto {
    id: string;
    customerId?: string;
    confirmedBy?: string;
    confirmedAt?: Date;
    servicebooking_id?: string;
    serviceType: $Enums.ServiceType;
    totalBeforeDiscount: number;
    discount?: number;
    totalAfterDiscount: number;
    paymentStatus: $Enums.PaymentStatus;
    status: $Enums.BookingStatus;
    bookingDates: string[];
    isTermsAccepted: boolean;
    isCancellationPolicyAccepted: boolean;
    isLiabilityWaiverSigned: boolean;
    bookingReference: string;
    source?: $Enums.BookingSource;
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
    specialRequirements?: $Enums.SpecialRequirement[];
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
    limit?: number;
    offset?: number;
    serviceId: string;
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