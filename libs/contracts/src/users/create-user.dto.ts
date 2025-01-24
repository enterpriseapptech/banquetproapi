import { IsEmail, IsEnum, IsNotEmpty, Length, IsOptional } from 'class-validator';
import { $Enums } from '@prisma/client';

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

    @IsOptional()
    @Length(2, 50)
    businessName: string;

    @Length(10, 20)
    @IsNotEmpty()
    password: string;

    @IsEnum($Enums.UserType, { message: 'userType must be one of ADMIN, USER, or GUEST' })
    @IsNotEmpty()
    userType: $Enums.UserType;
    

    // @confirmFieldDecorator('password')
    // password_confirmation: string;

}
