import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto,} from './create-user.dto';
import { IsOptional, IsPhoneNumber, IsString, Length, MaxLength, Matches, IsUrl, IsObject, ValidateNested, IsEnum, IsUUID, IsNotEmpty, IsStrongPassword } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { UserStatus } from './user.dto';

const TIME_HHMM_REGEX = /^([01]\d|2[0-3]):([0-5]\d)$/;
const NAME_PATTERN = /^[a-zA-Z\s'-]+$/;
const PLACE_NAME_PATTERN = /^[a-zA-Z\s.'-]+$/;

class WorkingHoursDay {
    @IsOptional()
    @IsString()
    @Matches(TIME_HHMM_REGEX, { message: 'start must be in 24-hour HH:MM format' })
    start?: string; // Format: "HH:MM"

    @IsOptional()
    @IsString()
    @Matches(TIME_HHMM_REGEX, { message: 'end must be in 24-hour HH:MM format' })
    end?: string; // Format: "HH:MM"
}

export class UpdateUserPasswordDto{
    @ApiProperty({ type: 'string', required: false })
    @IsUUID()
    @IsOptional()
    id?: string; // this is not a user ID but the personalAccesstoken Id

    @ApiProperty({ type: 'string', required: false })
    @IsUUID()
    @IsOptional()
    userId?: string; // this is a user ID for logged in users

    @ApiProperty({ type: 'string', required: false })
    @IsOptional()
    @IsStrongPassword()
    @Length(10, 15)
    oldPassword?: string;

    @ApiProperty({ type: 'string', required: true })
    @IsOptional()
    @IsStrongPassword()
    @Length(10, 15)
    password: string;

    @ApiProperty({ type: 'string', required: false })
    @IsString()
    @IsOptional()
    token?: string;
}

// export class UpdateUserDto extends PartialType(CreateUserDto) {







//     @ApiPropertyOptional({ type: 'string', required: false })
//     @IsOptional()
//     @IsPostalCode()
//     postalCode?: string

//     @ApiPropertyOptional({ type: 'string', required: false })
//     @IsOptional()
//     @IsString()
//     country?: string

//     @ApiPropertyOptional({ type: 'string', required: false })
//     @IsOptional()
//     @IsString()
//     state?: string

//     @ApiPropertyOptional({ type: 'string', required: false })
//     @IsOptional()
//     @IsString()
//     city?: string

//     @ApiPropertyOptional({ type: 'string', required: false })
//     @IsOptional()
//     @IsString()
//     street?: string

//     @ApiPropertyOptional({ type: 'string', required: false })
//     @IsOptional()
//     @IsString()
//     street2?: string

//     @ApiPropertyOptional({ type: 'string', required: false })
//     @IsOptional()
//     @IsString()
//     location?: string


//     // profixer and admin
//     @ApiPropertyOptional({ type: 'string', required: false })
//     @IsOptional()
//     @IsString()
//     companyName?: string

//     @ApiPropertyOptional({ type: 'string', required: false })
//     @IsOptional()
//     @IsString()
//     bio?: string

//     @ApiPropertyOptional({ type: 'string', required: false })
//     @IsOptional()
//     @IsString()
//     businessSlogan?: string


//     @IsOptional()
//     @IsEnum(UserStatus)
//     status?: UserStatus;

// }

export class UpdateAdminDto {
  @IsOptional()
  @IsString()
  @Length(2, 50)
  role?: string;
}

export class UpdateCustomerDto {
  @IsOptional()
  @IsString()
  @Length(2, 50)
  role?: string;
}


export class UpdateServiceProviderDto {
    @IsOptional()
    @IsString()
    @Length(2, 100)
    businessName?: string;

    @IsOptional()
    @IsUrl()
    businessLogo?: string;

    @IsOptional()
    @IsString()
    @MaxLength(2000)
    pricingInfo?: string;

    @IsOptional()
    @IsString()
    @MaxLength(2000)
    regulations?: string;

    @ApiProperty({
    type: 'object',
    additionalProperties: {
        type: 'object',
        properties: {
            startTime: { type: 'string', example: '09:00' },
            endTime: { type: 'string', example: '17:00' },
        },
        nullable: true,
    },
    example: {
        0: { startTime: "09:00", endTime: "17:00" },
        1: { startTime: "09:00", endTime: "17:00" },
        2: { startTime: "09:00", endTime: "17:00" },
        3: { startTime: "09:00", endTime: "17:00" },
        4: { startTime: "09:00", endTime: "17:00" },
        5: { startTime: "10:00", endTime: "14:00" },
        6: null // Closed on Sunday
    },
    })
    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => Object)
    @Transform(({ value }) => {
        try {
            return JSON.parse(value); // Convert string to JSON object
        } catch {
            return value; // Return as-is if parsing fails
        }
    })
    workingHours?: Record<number, WorkingHoursDay>;

}

export class UpdateUserDto {

    @ApiPropertyOptional({ type: 'string' })
    @IsOptional()
    @IsPhoneNumber()
    @Length(10, 15)
    phoneNumber?: string

    @ApiPropertyOptional({ type: 'string' })
    @IsOptional()
    @IsString()
    @Length(2, 50)
    @Matches(NAME_PATTERN, { message: 'firstName may only contain letters, spaces, hyphens and apostrophes' })
    firstName?: string;

    @ApiPropertyOptional({ type: 'string' })
    @IsOptional()
    @IsString()
    @Length(2, 50)
    @Matches(NAME_PATTERN, { message: 'lastName may only contain letters, spaces, hyphens and apostrophes' })
    lastName?: string;

    @ApiPropertyOptional({ type: 'string' })
    @IsOptional()
    @IsString()
    @Length(2, 60)
    @Matches(PLACE_NAME_PATTERN, { message: 'city may only contain letters, spaces, periods, hyphens and apostrophes' })
    city?: string;

    @ApiPropertyOptional({ type: 'string' })
    @IsOptional()
    @IsString()
    @Length(2, 60)
    @Matches(PLACE_NAME_PATTERN, { message: 'state may only contain letters, spaces, periods, hyphens and apostrophes' })
    state?: string;

    @ApiPropertyOptional({ type: 'string' })
    @IsOptional()
    @IsString()
    @Length(2, 60)
    @Matches(PLACE_NAME_PATTERN, { message: 'country may only contain letters, spaces, periods, hyphens and apostrophes' })
    country?: string;

    @ApiPropertyOptional({ type: 'string' })
    @IsOptional()
    @IsString()
    @Length(2, 255)
    streetAddress?: string;

    @ApiPropertyOptional({ type: 'string' })
    @IsOptional()
    @IsString()
    @MaxLength(255)
    streetAddress2?: string;

    @ApiPropertyOptional({ type: 'string' })
    @IsOptional()
    @IsString()
    @MaxLength(255)
    location?: string;


    @ApiPropertyOptional({ type: () => UpdateAdminDto })
    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => UpdateAdminDto)
    admin?: UpdateAdminDto;

    @ApiPropertyOptional({ type: () => UpdateServiceProviderDto })
    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => UpdateServiceProviderDto)
    serviceProvider?: UpdateServiceProviderDto;

    @ApiPropertyOptional({ type: () => UpdateCustomerDto })
    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => UpdateCustomerDto)
    customer?: UpdateCustomerDto;

}


