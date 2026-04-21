import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsUUID } from "class-validator";

export enum SubscriptionStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE"
}


export class DataWithCountDto<T> {
  @ApiProperty({ example: 0 })
  @IsNotEmpty()
  @IsNumber()
  count: number;

  @ApiProperty({ example: "Platinum" })
  @IsNotEmpty()
  data: T[];

}

export class UpdateServiceSubscriptionDto {
  @ApiProperty({ example: 'uuid'})
  @IsNotEmpty()
  @IsUUID()
  serviceId?: string;


  @ApiProperty({ example: 'uuid' })
  @IsOptional()
  @IsUUID()
  subscriptionPlanId?: string;

  @ApiProperty({ example: 0 })
  @IsEnum(SubscriptionStatus)
  @IsNotEmpty()
  subscriptionStatus: SubscriptionStatus;

  @ApiProperty({ example: 4 })
  @IsOptional()
  @IsNumber()
  timeframe?: number; // number of days to extend the subscription by, if applicable
}

export enum ServiceType {
    CATERING = "CATERING",
    EVENTCENTER = "EVENTCENTER"
}

export enum UserType {
    ADMIN = 'ADMIN',
    SERVICE_PROVIDER = 'SERVICE_PROVIDER',
    CUSTOMER = 'CUSTOMER',
    STAFF = 'STAFF'
}

