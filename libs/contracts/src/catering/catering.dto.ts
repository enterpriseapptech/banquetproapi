export enum ServiceStatus {
    ACTIVE ="ACTIVE",
  INACTIVE ="INACTIVE"
}

export class CateringDto {
    id: string;
    serviceProviderId: string; // Owner of the service
    name: string;
    eventTypes: string[];
    tagLine: string;
    depositAmount: number;
    startPrice: number;
    minCapacity?: number;
    maxCapacity?: number;
    description?: string;
    dishTypes: string[];
    images: string[];
    termsOfUse: string;
    cancellationPolicy: string;
    streetAddress: string;
    streetAddress2: string;
    city: string;
    location: string[];
    postal: string;
    status: ServiceStatus;
    isFeatured: boolean;
    featureExpiringAt?: Date;
    paymentRequired?: boolean;
    rating?: number;
    contact?: string;
    createdAt: Date;
    updatedAt: Date;
    updatedBy?: string;
    deletedAt?: Date;
    deletedBy?: string;
}

export class MenuDto {
    id: string;
    cateringId?: string;
    cuisineId?: string;
    name: string;
    description?: string;
    isCustomizable: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    deletedBy?: string;
    cateringService?: CateringDto;
}

export class ManyCateringDto {
    count: number;
    data: CateringDto[];
}


export class ManyRequestCateringDto {
    limit: number;
    offset: number;
    serviceProvider?: string;
    city?: string;
    state?: string;
    country?: string;
}

// export class ManyBookingDto {
//     count: number;
//     data: BookingDto[];
// }