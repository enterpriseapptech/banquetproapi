// import { Optional } from '@nestjs/common';
// import { IsEmail, IsEnum, IsNotEmpty, Length } from 'class-validator';
import { $Enums } from '@prisma/users';
// import { confirmFieldDecorator } from '../../validations/confirm_field.decorator';
export class UserDto {
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
    createdAt: Date;
    updatedAt: Date;
    deletedat?: Date;
    deletedBy?: string;
}
