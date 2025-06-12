import { PartialType } from '@nestjs/mapped-types';
import { CreateAppSettingDto, CreateCountryDto, CreateStateDto, } from './create-management.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';


export class UpdateAppSettingDto extends PartialType(CreateAppSettingDto){}

export class UpdateCountryDto  extends PartialType(CreateCountryDto) {
    @ApiProperty({
        description: 'UUID of the user making this request',
        example: '1fdb9609-6e8a-45f0-9733-99c4d2ea0bd4',
        format: 'uuid',
        type: String,
      })
    @IsString()
    deletedBy?: string;

  }


export class UpdateStateDto extends PartialType(CreateStateDto) {
  @ApiProperty({
      description: 'UUID of the user making this request',
      example: '1fdb9609-6e8a-45f0-9733-99c4d2ea0bd4',
      format: 'uuid',
      type: String,
    })
  @IsString()
  deletedBy?: string;

}


  