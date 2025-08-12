import { ApiProperty  } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsOptional,
    IsNotEmpty,
    IsInt,
    IsArray,
    IsString,
    IsNumber,
    IsDecimal,
    Min,
    Max,
    IsBoolean,
    ValidateNested,
} from 'class-validator';
import { ImageUploadDto } from '../media/images';


export class CreateCateringDto {
    @ApiProperty({ type: 'string', required: true })
    @IsString()
    @IsNotEmpty()
    serviceProviderId: string;


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
    

    @ApiProperty({ type: 'string', required: true })
    @IsString()
    @IsNotEmpty()
    tagLine: string;

    @ApiProperty({ type: 'number', required: true })
    @IsInt()
    @IsNotEmpty()
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 })
    depositPercentage: number;

    @ApiProperty({ type: 'number', required: true })
    @IsNotEmpty()
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 })
    startPrice: number;

    @ApiProperty({ type: 'number', required: false })
    @IsOptional()
    @IsInt()
    minCapacity?: number;

    @ApiProperty({ type: 'number', required: false })
    @IsOptional()
    @IsInt()
    maxCapacity?: number;

    @ApiProperty({ type: 'array', required: false, example: ["Italian", "Mexican", "Indian"] })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    cuisine?: string[];

    @ApiProperty({ type: 'string', required: false })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ type: 'string', required: true, example: ["Vegetarian", "Non-Vegetarian", "Vegan"] })
    @IsArray()
    @IsString({ each: true })
    dishTypes?: string[];

    @ApiProperty({
        description: 'List of image URLs',
        example: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
        type: [String]
    })
    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    images?: string[];


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

    @ApiProperty({ type: 'string', required: true })
    @IsString()
    @IsNotEmpty()
    termsOfUse: string;

    @ApiProperty({ type: 'string', required: true })
    @IsString()
    @IsNotEmpty()
    cancellationPolicy: string;

    @ApiProperty({ type: 'string', required: true })
    @IsString()
    @IsNotEmpty()
    streetAddress: string;

    @ApiProperty({ type: 'string', required: true })
    @IsString()
    @IsOptional()
    streetAddress2?: string;

    @ApiProperty({ type: 'string', required: true })
    @IsString()
    @IsNotEmpty()
    city: string;

    @ApiProperty({ type: 'string', 
        required: true, 
        example: ["550e8400-e29b-41d4-a716-446655440000",
             "550e8400-e29b-41d4-a716-446655440000"] 
    })
    @IsArray()
    @IsString({ each: true })
    location: string[];

    @ApiProperty({ type: 'string', required: true })
    @IsString()
    @IsNotEmpty()
    postal: string;

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

export class CreateMenuDto {
    @ApiProperty({ type: 'string', required: true })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ type: 'string', required: true })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ type: 'string', required: true })
    @IsString()
    cateringId?: string[]; // List of cuisine IDs

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    cuisine?: string[]; // List of dietary category IDs


    @ApiProperty({ type: 'array', format: 'string', required: true })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    image: any; // File input (Handled in Controller)

}


