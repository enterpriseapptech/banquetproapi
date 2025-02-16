import { IsEmail, IsEnum, IsNotEmpty, Length, IsOptional } from 'class-validator';
import { $Enums } from '@prisma/users';

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
    
    @IsOptional()
    @IsEnum($Enums.ServiceType, { message: 'service type must be event centers, catering or all' })
    serviceType: $Enums.ServiceType;

    // @IsOptional()
    // @Length(2, 50)
    // serviceProviderId: string
    // @confirmFieldDecorator('password')
    // password_confirmation: string;

}
