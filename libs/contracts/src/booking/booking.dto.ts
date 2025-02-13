import { $Enums } from '@prisma/booking';
import { $Enums as $EventBookingEnums} from '@prisma/eventcenters';

// enum SpecialRequirement {
//     // WHEELCHAIRACCESS = 'WHEELCHAIRACCESS',
//     TEMPERATUREADJUSTMENT = 'TEMPERATUREADJUSTMENT'
// }

export class BookingDto {
    id: string;
    customer_id?: string;
    confirmed_by?: string;
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
    rescheduled_by?: string;
    rescheduledAt?: Date;
    previousDates?: string[];
    canceledBy?: string;
    canceledAt?: Date;
    cancellationReason?: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    deleted_by?: string;
    eventCenterBooking?: EventCenterBookingDto; // Optional if linked to an event center booking
}


export class EventCenterBookingDto {
    id: string;
    eventcenter_id: string;
    booking_id: string;
    eventName?: string;
    eventTheme?: string;
    eventType?: string;
    description?: string;
    noOfGuest?: number;
    specialRequirements?: $EventBookingEnums.SpecialRequirement[];
    images: string[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    deleted_by?: string;
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