import { ServiceType, UserType } from './create-user.dto';

export enum UserStatus{
    ACTIVE = 'ACTIVE',
    DEACTIVATED = 'DEACTIVATED',
    RESTRICTED = 'RESTRICTED'
};

export enum BookMarkType{
    catering ="catering",
    eventcenter = "eventcenter"
}

export class ServiceProviderDto {
 
    id: string;
    businessName: string;
    serviceType:  ServiceType  // Type of service (e.g., catering, event center)
    businessLogo?: string; // URL to business logo
    pricingInfo? : string;    // Pricing details (could be JSON for flexibility)
    regulations? : string;   
    additionalInformation?: string;  
    workingHours?: {
        0: { startTime: string; endTime: string } | null;
        1: { startTime: string; endTime: string } | null;
        2: { startTime: string; endTime: string } | null;
        3: { startTime: string; endTime: string } | null;
        4: { startTime: string; endTime: string } | null;
        5: { startTime: string; endTime: string } | null;
        6: { startTime: string; endTime: string } | null;
    }; 
    createdAt: Date;
    updatedAt: Date;
}

export class UserDto {
    id: string;
    email: string;
    isEmailVerified: boolean;
    firstName?: string;
    lastName?: string;
    businessName?: string;
    password: string;
    userType: UserType;
    status: UserStatus; 
    refreshToken?: string;
    lastLoginAt?: Date;
    streetAddress?: string;
    streetAddress2?: string;
    state?: string;
    country?: string;
    location?: string
    createdAt: Date;
    updatedAt: Date;
    deletedat?: Date;
    deletedBy?: string;
    serviceProvider?: ServiceProviderDto
}
