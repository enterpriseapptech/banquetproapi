import { ServiceStatus } from "./create-event-center.dto";

export enum SubscriptionStatus {
    PENDING = 'PENDING',
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    EXPIRED = 'EXPIRED',
}

export class CreateServiceSubscriptionDto {
    serviceId: string;
    subscriptionPlanId: string;
    invoiceId: string;
    status?: SubscriptionStatus;
    expiryDate: Date;
}

export class UpdateServiceSubscriptionDto {
    status?: SubscriptionStatus;
    expiryDate?: Date;
    deletedAt?: Date;
    deletedBy?: string;
}

export class ServiceSubscriptionDto {
    id: string;
    serviceId: string;
    subscriptionPlanId: string;
    invoiceId: string;
    status: SubscriptionStatus;
    expiryDate: Date;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    deletedBy?: string;
}
export class EventCenterDto {
    id: string;
    serviceProviderId: string;
    name: string;
    eventTypes: string[];
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

export class ManyRequestEventCenterDto {
    limit?: number;
    offset?: number;
    serviceProvider?: string;
    city?: string;
    location?: string;
    search?: string;
}

export class ManyEventCentersDto {
    count: number;
    data: EventCenterDto[];
}


