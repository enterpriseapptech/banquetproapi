import { PartialType } from '@nestjs/mapped-types';
import { CreateNotificationDto, ServiceType } from './create-notification.dto';
import { IsBoolean, IsInt, IsOptional, IsString, IsUUID, Max, Min, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateNotificationDto extends PartialType(CreateNotificationDto) {
  @IsOptional()
  @IsBoolean()
  isRead?: boolean
}

export class ReviewFilter {
  serviceId?: string
  serviceType?: string
  isApproved?: boolean
  approvedBy?: string
}
export class UpdateReviewDto{
  @ApiProperty({
    description: 'The type of service being reviewed',
    enum: ServiceType,
    example: 'CLEANING',
  })
  @IsOptional()
  @IsString()
  serviceType: ServiceType;

  @ApiProperty({
    description: 'Rating given by the user (1 to 5)',
    minimum: 1,
    maximum: 5,
    example: 4,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({
    description: 'Optional text comment about the service',
    example: 'Great service and timely delivery!',
  })
  @IsOptional()
  @IsString()
  comment?: string;

  @ApiProperty({
    type: Boolean,
    description: 'Is this review approved',
    example: 'true',
  })
  @IsOptional()
  @IsBoolean()
  isApproved?: boolean


  @ApiProperty({
    format: 'uuid',
    description: 'UUid of staff or admin who approved comments',
    example: 'Great service and timely delivery!',
  })
  @ValidateIf((o) => o.isApproved !== undefined)
  @IsOptional()
  @IsUUID()
  approvedBy?: string
}