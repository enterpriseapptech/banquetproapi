import { Amenities, EventType, ServiceStatus } from "./create-event-center.dto";

export class EventCenterDto {
    id: string;
    serviceProviderId: string;
    name: string;
    eventTypes: EventType[];
    discountPercentage?: number;
    depositPercentage: number;
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

export class EventCenterFilterDto {
    /** Match venues that support any of these event types */
    eventTypes?: EventType[];
    /** Filter by city name (case-insensitive) */
    city?: string;
    /** Filter by state UUID */
    location?: string;
    /** Filter venues that have all of these amenities */
    amenities?: Amenities[];
    /** Minimum sitting capacity */
    minCapacity?: number;
    /** Maximum price per slot */
    maxPrice?: number;
    /** Full-text search across name, description, city */
    search?: string;
}

export class ManyRequestEventCenterDto {
    limit?: number;
    offset?: number;
    /** Scope results to a single service provider */
    serviceProvider?: string;
    filter?: EventCenterFilterDto;
}

export class ManyEventCentersDto {
    count: number;
    data: EventCenterDto[];
}


