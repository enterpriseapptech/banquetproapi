import { PartialType } from '@nestjs/mapped-types';
import { CreateNotificationDto, CreateReviewDto } from './create-notification.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateNotificationDto extends PartialType(CreateNotificationDto) {
  @IsOptional()
  @IsBoolean()
  isRead?: boolean
}


export class UpdateReviewDto extends CreateReviewDto{}