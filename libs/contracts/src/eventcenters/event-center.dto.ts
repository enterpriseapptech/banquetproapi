import { ServiceStatus } from "./create-event-center.dto";
export class EventCenterDto {
    id: string;
    serviceProviderId: string;
    name: string;
    eventTypes: string[];
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
    location: string;
    postal: string;
    status: ServiceStatus;
    paymentRequired?: boolean;
    rating?: number;
    contact?: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    deletedBy?: string;
}

export class ManyRequestEventCenterDto {
    limit?: number;
    offset?: number;
    serviceProvider?: string;
    city?: string;
    state?: string;
    country?: string;
}

export class ManyEventCentersDto {
    count: number;
    data: EventCenterDto[];
}


