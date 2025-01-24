// import { Optional } from '@nestjs/common';
// import { IsEmail, IsEnum, IsNotEmpty, Length } from 'class-validator';
import { UserStatus, UserType } from './create-user.dto';
// import { confirmFieldDecorator } from '../../validations/confirm_field.decorator';
export class UserDto {
    id: string;
    email: string;
    isEmailVerified: boolean;
    firstName: string;
    lastName: string;
    businessName?: string;
    password: string;
    userType: UserType;
    status: UserStatus; 
    refreshToken: string;
    lastLoginAt: string;
    streetAddress: string;
    streetAddress2: string;
    state: string;
    country: string;
    createdAt: string;
    updatedAt: string;
    deleted_at: string;
}
