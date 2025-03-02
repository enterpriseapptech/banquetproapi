// import { confirmFieldDecorator } from '../../validations/confirm_field.decorator';
import { $Enums } from "@prisma/eventcenters";
export class EventCenterDto {
    id: string;
    serviceProviderId: string;
    depositAmount: number;
    description?: string;
    pricingPerSlot: number;
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
    deletedBy?: string;
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


