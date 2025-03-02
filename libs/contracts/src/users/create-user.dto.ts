import { IsEmail, IsEnum, IsNotEmpty, Length, IsOptional, IsUUID } from 'class-validator';
import { $Enums } from '@prisma/users';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ example: 'test@gmail.com', description: 'email of the user' })
    @IsEmail()
    @Length(6, 100)
    email: string;

    @ApiProperty({ type: 'string', required: true })
    @Length(2, 50)
    @IsNotEmpty()
    firstName: string;


    @ApiProperty({ type: 'string', required: true })
    @Length(2, 50)
    @IsNotEmpty()
    lastName: string;

    @ApiProperty({ type: 'string', required: true })
    @IsOptional()
    @Length(2, 50)
    businessName?: string;

    @ApiProperty({ type: 'string', required: true })
    @Length(10, 20)
    @IsNotEmpty()
    password: string;

    @ApiProperty({ type: 'string', required: true })
    @IsEnum($Enums.UserType, { message: 'userType must be one of ADMIN, USER, or GUEST' })
    @IsNotEmpty()
    userType: $Enums.UserType;
    
    @ApiProperty({ type: 'string', required: true })
    @IsOptional()
    @IsEnum($Enums.ServiceType, { message: 'service type must be event centers, catering or all' })
    serviceType: $Enums.ServiceType;

    @ApiProperty({ type: 'string', required: false })
    @IsOptional()
    @IsUUID()
    @Length(2, 50)
    serviceProviderId: string


}
