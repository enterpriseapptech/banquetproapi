import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsUUID, IsInt, Min, Max, IsString, IsOptional, ValidateIf, IsBoolean } from 'class-validator';


export enum NotificationType {
    INFO = 'INFO',
    WARNING = 'WARNING',
    ERROR = 'ERROR',
    SUCCESS = 'SUCCESS',
}

export enum ServiceType {
  CATERING = 'CATERING',
  EVENTCENTER = 'EVENTCENTER',
  
}

export class NotificationFilter {
  @ApiProperty({ description: 'Filter unread notifications' })
  @IsOptional()
  @IsBoolean()
  unread?: boolean;

  @ApiProperty({ description: 'Filter read notifications' })
  @IsOptional()
  @IsBoolean()
  read?: boolean;

  @ApiProperty({ description: 'Filter notifications sent today' })
  @IsOptional()
  @IsBoolean()
  today?: boolean;

  @ApiProperty({ description: 'Filter by sender ID (must be UUID)' })
  @IsOptional()
  @IsUUID()
  senderId?: string;

  @ApiProperty({ description: 'Filter by receiver ID (must be UUID)' })
  @IsOptional()
  @IsUUID()
  recieverId?: string;

  @ApiProperty({ description: 'Filter system-generated notifications' })
  @IsOptional()
  @IsBoolean()
  systemNotification?: boolean;


  @ApiProperty({ example: 'INFO', enum: NotificationType, description: 'Type of notification' })
  @IsEnum(NotificationType)
  @IsOptional()
  type?: NotificationType;
}


export class CreateNotificationDto {

    @ApiProperty({ description: 'ID of the user receiving the notification' })
    @IsString()
    @IsNotEmpty()
    userId: string;
  
    @IsOptional()
    internalId?: string

    @ApiProperty({
      description: 'Sender ID (must be UUID, system_notification is restricted to internal use)',
      example: 'c56a4180-65aa-42ec-a945-5fd21dec0538',
    })
    @ValidateIf((o) => !o.internalId)
    @IsOptional()
    @IsUUID()
    senderId?: string


    @ApiProperty({ example: 'You have a new message', description: 'Notification message' })
    @IsString()
    @IsNotEmpty()
    message: string;
  
    @ApiProperty({ example: 'INFO', enum: NotificationType, description: 'Type of notification' })
    @IsEnum(NotificationType)
    @IsNotEmpty()
    type: NotificationType;
  
    @ApiProperty({ example: false, description: 'Indicates whether the notification has been read' })
    @IsOptional()
    isRead?: boolean;
}


export class CreateReviewDto {
  @ApiProperty({
    description: 'ID of the user submitting the review (must be a UUID)',
    example: '6e6c92a4-6b77-4b91-9d19-8b495ebd76ee',
  })
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'Booking ID associated with this review. Only completed bookings are allowed.',
    example: 'fbb7a0f5-4d2e-4baf-80fc-e3e827f83e6c',
  })
  @IsUUID()
  bookingId: string;

  @ApiProperty({
    description: 'ID of the service/product being reviewed',
    example: '2a5c8777-c6f0-4db3-bbb5-29872e8c4b26',
  })
  @IsUUID()
  serviceId: string;

  @ApiProperty({
    description: 'The type of service being reviewed',
    enum: ServiceType,
    example: 'CLEANING',
  })
  @IsString()
  serviceType: ServiceType;

  @ApiProperty({
    description: 'Rating given by the user (1 to 5)',
    minimum: 1,
    maximum: 5,
    example: 4,
  })
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
}

