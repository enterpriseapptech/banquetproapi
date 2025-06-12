import {IsBoolean, IsOptional, IsString} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export enum FeesType {
    CERTIFICATION = 'CERTIFICATION',
    KYC = 'KYC'
}

export enum Status {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE'
}


export class CreateAppSettingDto {

    @ApiProperty({ type: 'boolean', required: true })
    @IsBoolean()
    notifyOnRequest: boolean;

    @ApiProperty({ type: 'boolean', required: true })
    @IsBoolean()
    notifyCertifiedOnly: boolean;

    @ApiProperty({ type: 'boolean', required: true })
    @IsBoolean()
    visibleToCertifiedOnly: boolean;
}


export class CreateCountryDto {
    @ApiProperty({ example: 'Nigeria', description: 'Name of the country' })
    @IsString()
    name: string;
  
    @ApiProperty({ example: 'NG', description: 'Country code (2 letters)' })
    @IsString()
    code: string;

    @ApiProperty({ example: 'Nigerian Naira', description: 'Country currency' })
    @IsString()
    currency?: string;

    @ApiProperty({ example: 'NGN', description: 'Country currency code' })
    @IsString()
    currencyCode?: string;

    @ApiProperty({ example: 'NGN', description: 'Country currency code' })
    @IsString()
    currencySymbol?: string;

    @ApiProperty({
        description: 'UUID of the user making this request',
        example: '1fdb9609-6e8a-45f0-9733-99c4d2ea0bd4',
        format: 'uuid',
        type: String,
      })
    @IsOptional()
    @IsString()
    updatedBy?: string;
  }


export class CreateStateDto {
    @ApiProperty({ example: 'Lagos', description: 'Name of the state' })
    @IsString()
    name: string;
  
    @ApiProperty({ example: 'LA', description: 'State code', required: false })
    @IsOptional()
    @IsString()
    code?: string;
  
    @ApiProperty({ example: 'country-uuid', description: 'ID of the country', format: 'uuid', })
    @IsString()
    countryId: string;

    @ApiProperty({
        description: 'UUID of the user making this request',
        example: '1fdb9609-6e8a-45f0-9733-99c4d2ea0bd4',
        format: 'uuid',
        type: String,
      })
    @IsOptional()  
    @IsString()
    updatedBy?: string;
}
