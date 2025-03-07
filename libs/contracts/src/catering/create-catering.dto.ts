import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsOptional,
    IsNotEmpty,
    IsInt,
    IsArray,
    IsString,
    IsNumber,
} from 'class-validator';


export class CreateCateringDto {
    @ApiProperty({ type: 'string', required: true })
    @IsString()
    @IsNotEmpty()
    serviceProviderId: string;

    @ApiProperty({ type: 'string', required: true })
    @IsString()
    @IsNotEmpty()
    tagLine: string;

    @ApiProperty({ type: 'number', required: true })
    @IsInt()
    @IsNotEmpty()
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 })
    depositAmount: number;

    @ApiProperty({ type: 'number', required: true })
    @IsNotEmpty()
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 })
    startPrice: number;

    @ApiPropertyOptional({ type: 'number', required: false })
    @IsOptional()
    @IsInt()
    minCapacity?: number;

    @ApiPropertyOptional({ type: 'number', required: false })
    @IsOptional()
    @IsInt()
    maxCapacity?: number;

    @ApiPropertyOptional({ type: 'array', required: false, example: ["Italian", "Mexican", "Indian"] })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    cuisine?: string[];

    @ApiPropertyOptional({ type: 'string', required: false })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ type: 'string', required: true, example: ["Vegetarian", "Non-Vegetarian", "Vegan"] })
    @IsArray()
    @IsString({ each: true })
    dishTypes?: string[];

    @ApiPropertyOptional({ type: 'array', format: 'string', required: false })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    images?: any[];
   

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

    @ApiProperty({ type: 'string', required: true })
    @IsString()
    @IsNotEmpty()
    state: string;

    @ApiProperty({ type: 'string', required: true })
    @IsString()
    @IsNotEmpty()
    country: string;

    @ApiProperty({ type: 'string', required: true })
    @IsString()
    @IsNotEmpty()
    postal: string;

    @ApiProperty({ type: 'string', required: true })
    @IsString()
    @IsNotEmpty()
    location: string;

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


