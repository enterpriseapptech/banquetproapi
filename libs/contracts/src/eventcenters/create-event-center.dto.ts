import { IsEnum, IsNotEmpty, Length, IsOptional, IsString, IsInt, Min, IsArray, IsNumber, IsBoolean, ValidateNested, IsEmail, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ImageUploadDto, } from '../media/images';
import { Type } from 'class-transformer';

export enum ServiceStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
}

export enum Amenities {
    WIFI = 'WIFI',
    PACKINGSPACE = 'PACKINGSPACE',
    SECURITY = 'SECURITY'
}

export class CreateEventCenterDto {
    @ApiProperty({
        description: 'Unique ID of the service provider',
        minLength: 26,
        maxLength: 40,
        example: '550e8400-e29b-41d4-a716-446655440000'
    })
    @IsUUID()
    @IsNotEmpty()
    serviceProviderId: string;


    @ApiProperty({
        description: 'Unique ID of the service provider',
        minLength: 26,
        maxLength: 40,
        example: '550e8400-e29b-41d4-a716-446655440000'
    })
    @IsEmail()
    @IsOptional()
    serviceProviderEmail?: string;
    
    @ApiProperty({
        description: 'Name of the event center',
        minLength: 3,
        maxLength: 40,
        example: 'Virtues Event place'
    })
    @IsString()
    @IsNotEmpty()
    name: string;


    @ApiProperty({
        description: 'List of event types supported (e.g. weddings, conferences)',
        example: ['wedding', 'conference', 'birthday'],
        type: [String]
    })
    @IsString({ each: true })
    @IsArray()
    eventTypes: string[];

    @ApiProperty({ type: 'number', required: false })
    @IsInt()
    @IsOptional()
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 })
    discountPercentage?: number;

    @ApiProperty({
        description: 'Deposit amount required for booking',
        example: 5000.00,
        minimum: 10,
        type: Number
    })
    @Min(10)
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 })
    depositPercentage: number;

    @ApiPropertyOptional({
        description: 'Detailed description of the event center',
        minLength: 30,
        maxLength: 1000,
        example: 'A spacious venue perfect for corporate and social events.'
    })
    @IsOptional()
    @IsString()
    @Length(30, 1000)
    description?: string;

    @ApiProperty({
        description: 'Pricing per slot (e.g. per hour or per day)',
        example: 2500.00,
        type: Number
    })
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 })
    pricingPerSlot: number;

    @ApiProperty({
        description: 'Number of people the venue can seat',
        example: 200,
        minimum: 10
    })
    @IsInt()
    @Min(10)
    sittingCapacity: number;

    @ApiPropertyOptional({
        description: 'Venue layout design (optional)',
        example: 'Banquet style seating'
    })
    @IsOptional()
    @IsString()
    venueLayout?: string;

    @ApiProperty({
        description: 'List of available amenities',
        example: ['WIFI', 'SECURITY'],
        enum: Amenities,
        isArray: true
    })
    @IsArray()
    @IsNotEmpty()
    @IsEnum(Amenities, { each: true })
    amenities: string[];

    @ApiProperty({
        description: 'List of image URLs',
        example: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
        type: [String]
    })
    @IsArray()
    @IsOptional()
    images: string[];


    @ApiProperty({
        description: 'List of image files',
        example: ['base64:jdxnvbfcdn',],
        type: [String]
    })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ImageUploadDto)
    imagefiles: ImageUploadDto[];

    @ApiProperty({
        description: 'Terms of use for the event center',
        example: 'Full payment must be made 3 days before the event.'
    })
    @IsNotEmpty()
    termsOfUse: string;

    @ApiProperty({
        description: 'Cancellation policy',
        example: 'Free cancellation up to 7 days before the event.'
    })
    @IsNotEmpty()
    @IsString()
    cancellationPolicy: string;

    @ApiPropertyOptional({
        description: 'Street address of the venue',
        example: '123 Festivity Road'
    })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    streetAddress: string;

    @ApiPropertyOptional({
        description: 'Additional address details (optional)',
        example: 'Suite 5B'
    })
    @IsOptional()
    @IsString()
    streetAddress2?: string;

    @ApiProperty({
        description: 'City where the event center is located',
        example: 'Lagos'
    })
    @IsNotEmpty()
    @IsString()
    city: string;

    @ApiProperty({
        description: 'uuid of State where the event center is located',
        example: '550e8400-e29b-41d4-a716-446655440000'
    })
    @IsNotEmpty()
    @IsString()
    location: string;

    @ApiProperty({
        description: 'Postal code of the venue location',
        example: '100001'
    })
    @IsNotEmpty()
    @IsString()
    postal: string;

    @ApiProperty({
        description: 'Status of the event center service',
        example: ServiceStatus.ACTIVE,
        enum: ServiceStatus
    })
    @IsNotEmpty()
    @IsEnum(ServiceStatus, { message: 'service status must either be active or inactive' })
    status: ServiceStatus;

    @ApiProperty({
        description: 'Average rating of the event center (1.0 to 5.0)',
        example: 4.5,
        minimum: 1,
        maximum: 5.0,
        type: Number
    })
    @IsOptional()
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 })
    rating?: number;

    @ApiProperty({
        description: 'Indicates if payment is required upfront',
        example: 'true',
        type: Boolean
    })
    @IsOptional()
    @IsBoolean()
    paymentRequired?: boolean;

    @ApiProperty({
        description: 'Contact information (e.g. phone number or email)',
        example: '+2348012345678'
    })
    @IsOptional()
    @IsString()
    contact?: string;
}
