import { PartialType } from '@nestjs/mapped-types';
import { CreateCateringDto } from './create-catering.dto';

export class UpdateCateringDto extends PartialType(CreateCateringDto) {}
