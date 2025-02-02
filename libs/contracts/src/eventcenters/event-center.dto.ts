import { $Enums } from '@prisma/client';
// import { confirmFieldDecorator } from '../../validations/confirm_field.decorator';
export class EventCenterDto {
    id: string;
    email: string;
    isEmailVerified: boolean;
    firstName?: string;
    lastName?: string;
    businessName?: string;
    password: string;
    userType: $Enums.UserType;
    status: $Enums.UserStatus; 
    refreshToken?: string;
    lastLoginAt?: Date;
    streetAddress?: string;
    streetAddress2?: string;
    state?: string;
    country?: string;
    createdAt: Date;;
    updatedAt: Date;;
    deleted_at?: Date;;
}
