import { PartialType } from '@nestjs/mapped-types';
import { CreateAppSettingDto, CreateCountryDto, CreateStateDto, } from './create-management.dto';



export class UpdateAppSettingDto extends PartialType(CreateAppSettingDto){}

export class UpdateCountryDto  extends PartialType(CreateCountryDto) {


}
export class UpdateStateDto extends PartialType(CreateStateDto) {


}


  