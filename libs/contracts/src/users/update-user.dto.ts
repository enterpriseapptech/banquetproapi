import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto,} from './create-user.dto';
import { IsOptional, IsPhoneNumber, IsPostalCode, IsString, Length, IsObject, ValidateNested, IsEnum, IsUUID, IsNotEmpty, IsStrongPassword } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { UserStatus } from './user.dto';

class WorkingHoursDay {
    @IsOptional()
    @IsString()
    start?: string; // Format: "HH:MM"

    @IsOptional()
    @IsString()
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

export class UpdateUserDto extends PartialType(CreateUserDto) {


    @ApiProperty({ type: 'string', required: false })
    @IsOptional()
    @IsPhoneNumber()
    @Length(10, 15)
    phoneNumber: any

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


    @ApiPropertyOptional({ type: 'string', required: false })
    @IsOptional()
    @IsPostalCode()
    postalCode?: string

    @ApiPropertyOptional({ type: 'string', required: false })
    @IsOptional()
    @IsString()
    country?: string

    @ApiPropertyOptional({ type: 'string', required: false })
    @IsOptional()
    @IsString()
    state?: string

    @ApiPropertyOptional({ type: 'string', required: false })
    @IsOptional()
    @IsString()
    city?: string

    @ApiPropertyOptional({ type: 'string', required: false })
    @IsOptional()
    @IsString()
    street?: string

    @ApiPropertyOptional({ type: 'string', required: false })
    @IsOptional()
    @IsString()
    street2?: string

    @ApiPropertyOptional({ type: 'string', required: false })
    @IsOptional()
    @IsString()
    location?: string


    // profixer and admin
    @ApiPropertyOptional({ type: 'string', required: false })
    @IsOptional()
    @IsString()
    companyName?: string

    @ApiPropertyOptional({ type: 'string', required: false })
    @IsOptional()
    @IsString()
    bio?: string

    @ApiPropertyOptional({ type: 'string', required: false })
    @IsOptional()
    @IsString()
    businessSlogan?: string


    @IsOptional()
    @IsEnum(UserStatus)
    status?: UserStatus;

}

// export class UpdateAdminDto {
//   @IsOptional()
//   @IsString()
//   role?: string;
// }

// export class UpdateServiceProviderDto {
//   @IsOptional()
//   businessName?: string;

//   @IsOptional()
//   @IsEnum(ServiceType)
//   serviceType?: ServiceType;

//   @IsOptional()
//   businessLogo?: string;

//   @IsOptional()
//   pricingInfo?: string;

//   @IsOptional()
//   regulations?: string;

//   @IsOptional()
//   additionalInformation?: string;

//     @ApiProperty({
//         type: 'object',
//         additionalProperties: {
//             type: 'object',
//             properties: {
//                 startTime: { type: 'string', example: '09:00' },
//                 endTime: { type: 'string', example: '17:00' },
//             },
//             nullable: true,
//         },
//         example: {
//             0: { startTime: "09:00", endTime: "17:00" },
//             1: { startTime: "09:00", endTime: "17:00" },
//             2: { startTime: "09:00", endTime: "17:00" },
//             3: { startTime: "09:00", endTime: "17:00" },
//             4: { startTime: "09:00", endTime: "17:00" },
//             5: { startTime: "10:00", endTime: "14:00" },
//             6: null // Closed on Sunday
//         },
//     })
//     @IsOptional()
//     @IsObject()
//     @ValidateNested()
//     @Type(() => Object)
//     @Transform(({ value }) => {
//         try {
//             return JSON.parse(value); // Convert string to JSON object
//         } catch {
//             return value; // Return as-is if parsing fails
//         }
//     })
//     workingHours?: Record<number, WorkingHoursDay>;

// }

// export class UpdateUserDto {
//   @IsOptional()
//   firstName?: string;

//   @IsOptional()
//   lastName?: string;

//   @IsOptional()
//   @IsEnum(UserStatus)
//   status?: UserStatus;

//   @IsOptional()
//   @IsEnum(UserType)
//   userType?: UserType;

//   @IsOptional()
//   city?: string;

//   @IsOptional()
//   state?: string;

//   @IsOptional()
//   country?: string;

//   @IsOptional()
//   streetAddress?: string;

//   @IsOptional()
//   streetAddress2?: string;

//   @IsOptional()
//   location?: string;

//   @IsOptional()
//   admin?: UpdateAdminDto;

//   @IsOptional()
//   serviceProvider?: UpdateServiceProviderDto;

//   // Add similar optional fields for customer or staff if needed
// }
