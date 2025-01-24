import { Optional } from '@nestjs/common';
import { IsEmail, IsEnum, IsNotEmpty, Length } from 'class-validator';
// import { confirmFieldDecorator } from '../../validations/confirm_field.decorator';

export enum UserType {
    ADMIN = 'ADMIN',
    CUSTOMER = 'CUSTOMER',
    SERVICE_PROVIDER = 'SERVICE_PROVIDER',
    STAFF = 'STAFF',
}

export enum UserStatus {
    ACTIVE = 'ACTIVE',
    DEACTIVATED = 'DEACTIVATED',
    RESTRICTED = 'RESTRICTED',
}

export class CreateUserDto {
    @IsEmail()
    @Length(6, 100)
    email: string;

    @Length(2, 50)
    @IsNotEmpty()
    firstName: string;

    @Length(2, 50)
    @IsNotEmpty()
    lastName: string;

    @Length(2, 50)
    @Optional()
    businessName: string;

    @Length(10, 20)
    @IsNotEmpty()
    password: string;

    @IsEnum(UserType, { message: 'userType must be one of ADMIN, USER, or GUEST' })
    @IsNotEmpty()
    userType: UserType;
    

    // @confirmFieldDecorator('password')
    // password_confirmation: string;

}
