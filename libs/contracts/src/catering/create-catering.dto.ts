import {
    IsOptional,
    IsNotEmpty,
    IsInt,
    IsArray,
    IsString,
    IsNumber,
} from 'class-validator';


export class CreateCuisineDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}

export class CreateMenuItemDto {
    @IsString()
    @IsNotEmpty()
    menuId: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    
    @IsNotEmpty()
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 })
    pricePerPerson: number;

    @IsNotEmpty()
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 })
    pricePerTenPerson: number;

    @IsNotEmpty()
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 })
    pricePerFiftyPerson: number;

    @IsNotEmpty()
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 })
    pricePerHundredPerson: number;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    dietaryCategoryIds?: string[];

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    menuCategoryIds?: string[];
}


export class CreateMenuCategoryDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}

export class CreateDietaryCategoryDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}


export class CreateCateringDto {
    @IsString()
    @IsNotEmpty()
    serviceProviderId: string;

    @IsString()
    @IsNotEmpty()
    tagLine: string;

    @IsInt()
    @IsNotEmpty()
    depositAmount: number;

    @IsInt()
    @IsNotEmpty()
    amountPerPerson: number;

    @IsInt()
    @IsNotEmpty()
    maxCapacity: number;

    @IsString()
    @IsOptional()
    description?: string;

    @IsArray()
    @IsString({ each: true })
    dishTypes: string[];

    @IsArray()
    @IsString({ each: true })
    images: string[];

    @IsString()
    @IsNotEmpty()
    termsOfUse: string;

    @IsString()
    @IsNotEmpty()
    cancellationPolicy: string;

    @IsString()
    @IsNotEmpty()
    streetAddress: string;

    @IsString()
    @IsOptional()
    streetAddress2?: string;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsNotEmpty()
    state: string;

    @IsString()
    @IsNotEmpty()
    country: string;

    @IsString()
    @IsNotEmpty()
    postal: string;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    cuisineIds?: string[];

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    dietaryCategoryIds?: string[];
}

export class CreateMenuDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    cuisineIds?: string[]; // List of cuisine IDs

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    dietaryCategoryIds?: string[]; // List of dietary category IDs

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    menuCategoryIds?: string[]; // List of menu category IDs
}