import { $Enums } from '@prisma/catering';

export class CuisineDto {
    id: string;
    name: string; // e.g., Italian, Indian, Mexican
    createdAt: Date;
    updatedAt: Date;
    updatedBy?: string;
    deletedAt?: Date;
    deletedBy?: string;
}

export class DietaryCategoryDto {
    id: string;
    name: string; // e.g., Vegetarian, Vegan, Halal, Gluten-Free
    createdAt: Date;
    updatedAt: Date;
    updatedBy?: string;
    deletedAt?: Date;
    deletedBy?: string;
}

export class MenuCategoryDto {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    updatedBy?: string;
    deletedAt?: Date;
    deletedBy?: string;
}


export class MenuItemDto {
    id: string;
    menuId: string;
    name: string;
    description?: string;
    pricePerPerson: number;
    pricePerTenPerson: number;
    pricePerFiftyPerson: number;
    pricePerHundredPerson: number;
    createdAt: Date;
    updatedAt: Date;
    updatedBy?: string;
    deletedAt?: Date;
    deletedBy?: string;
    dietaryCategories?: DietaryCategoryDto[]; // Assuming these are category names or IDs
    menuCategory?: MenuCategoryDto[]; // Assuming these are category names or IDs
}

export class CateringDto {
    id: string;
    serviceProviderId: string; // Owner of the service
    tagLine: string;
    depositAmount: number;
    amountPerPerson: number;
    maxCapacity: number;
    description?: string;
    dishTypes: string[];
    images: string[];
    termsOfUse: string;
    cancellationPolicy: string;
    streetAddress: string;
    streetAddress2: string;
    city: string;
    state: string;
    country: string;
    postal: string;
    status: $Enums.ServiceStatus;
    isFeatured: boolean;
    featureExpiringAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    updatedBy?: string;
    deletedAt?: Date;
    deletedBy?: string;
    cuisine?: CuisineDto[]; // List of cuisines
    dietaryCategories?: DietaryCategoryDto[]; // List of dietary categories
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
    cuisine?: CuisineDto[];// Optional if linked to an event center booking
    menuItems?: MenuItemDto[];
}


// export class ManyRequestBookingDto {
//     limit: number;
//     offset: number;
//     serviceProvider?: string;
//     startDate?: Date;
//     endDate?: Date;
// }

// export class ManyBookingDto {
//     count: number;
//     data: BookingDto[];
// }