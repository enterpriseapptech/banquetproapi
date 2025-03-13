import { IsEmail, IsEnum, IsNotEmpty, Length, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum UserType {
    ADMIN = 'ADMIN',
    SERVICE_PROVIDER = 'SERVICE_PROVIDER',
    CUSTOMER = 'CUSTOMER',
    STAFF = 'STAFF'
}

export enum ServiceType {
    EVENTCENTERS= 'EVENTCENTERS',
    CATERING= 'CATERING',
    ALL= 'ALL'
    
}


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
    @IsEnum(UserType, { message: 'userType must be one of ADMIN, USER, or GUEST' })
    @IsNotEmpty()
    userType: UserType;
    
    @ApiProperty({ type: 'string', required: true })
    @IsOptional()
    @IsEnum(ServiceType, { message: 'service type must be event centers, catering or all' })
    serviceType: ServiceType;

    @ApiProperty({ type: 'string', required: false })
    @IsOptional()
    @IsUUID()
    @Length(2, 50)
    serviceProviderId: string


}
