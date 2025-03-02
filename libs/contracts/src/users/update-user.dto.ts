import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsPhoneNumber, IsPostalCode, IsString, Length, IsObject, ValidateNested, } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

class WorkingHoursDay {
    @IsOptional()
    @IsString()
    start?: string; // Format: "HH:MM"

    @IsOptional()
    @IsString()
    end?: string; // Format: "HH:MM"
}
export class UpdateUserDto extends PartialType(CreateUserDto) {


    @ApiPropertyOptional({ type: 'string', required: false })
    @IsOptional()
    @IsPhoneNumber()
    @Length(10, 15)
    phoneNumber

    @ApiPropertyOptional({
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
    street

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
    companyName

    @ApiPropertyOptional({ type: 'string', required: false })
    @IsOptional()
    @IsString()
    bio?: string

    @ApiPropertyOptional({ type: 'string', required: false })
    @IsOptional()
    @IsString()
    businessSlogan?: string

}
