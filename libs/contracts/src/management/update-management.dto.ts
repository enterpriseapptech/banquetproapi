import { PartialType } from '@nestjs/mapped-types';
import { CreateCountryDto, CreateStateDto, } from './create-management.dto';


export class UpdateCountryDto  extends PartialType(CreateCountryDto) {


}
export class UpdateStateDto extends PartialType(CreateStateDto) {


}


  