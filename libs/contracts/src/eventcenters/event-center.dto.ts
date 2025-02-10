// import { confirmFieldDecorator } from '../../validations/confirm_field.decorator';
import { $Enums } from "@prisma/eventcenters";
import { EventCenterBookingDto } from "../booking/booking.dto";

export class EventCenterDto {
    id: string;
    service_provider_id: string;
    depositAmount: number;
    totalAmount: number;
    description?: string;
    pricingType: $Enums.PricingType;
    sittingCapacity: number;
    venueLayout?: string;
    amenities: string[];
    images: string[];
    termsOfUse: string;
    cancellationPolicy: string;
    streetAddress: string;
    city: string;
    state: string;
    country: string;
    postal: string;
    status: $Enums.ServiceStatus;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    deleted_by?: string;
}

export class ManyRequestEventCenterDto {
    limit: number;
    offset: number;
    serviceProvider?: string;
    city?: string;
    state?: string;
    country?: string;
}

export class ManyEventCentersDto {
    count: number;
    data: EventCenterDto[];
}

export class ManyEventCenterBookingsDto {
    count: number;
    data: EventCenterBookingDto[];
}

