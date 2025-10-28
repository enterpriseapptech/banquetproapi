import { IsEmail, IsEnum, IsNotEmpty, Length, IsOptional, IsUUID, IsString, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserStatus } from './user.dto';

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


export class UniqueIdentifierDto {
    @ApiProperty({ description: 'find unique by id of user', enum: UserType })
    @IsOptional()
    @ValidateIf((o) => o.email == undefined)
    id?: string

    @ApiProperty({ description: 'find unique by email of user', enum: UserType })
    @IsOptional()
    @ValidateIf((o) => o.id == undefined)
    email?: string

}
export class UserFilterDto {
  @ApiProperty({ description: 'Filter by user type', enum: UserType })
  @IsOptional()
  @IsEnum(UserType)
  userType?: UserType;

  @ApiProperty({ description: 'Filter by user status', enum: UserStatus })
  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;

  @ApiProperty({ description: 'Filter by city' })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({ description: 'Filter by state' })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiProperty({ description: 'Filter by country' })
  @IsOptional()
  @IsString()
  country?: string;
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
