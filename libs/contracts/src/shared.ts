import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsUUID } from "class-validator";

export enum SubscriptionStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE"
}

export const CATERINGPATTERN = {
    FINDALLBYUNIQUEEVENTCENTER:  'catering.findAllByUnique',
    FINDALL: 'catering.findAll',
    FINDONEBYID: 'catering.findOneById',
    CREATE: 'catering.create',
    UPDATE: 'catering.update',
    DELETE: 'catering.delete',
    UPDATESUBSCRIPTION: 'catering.updateSubscription',
}

export const EVENTCENTERPATTERN = {
    FINDALLEVENTCENTER: 'event.center.findAll',
    FINDALLBYUNIQUEEVENTCENTER: 'event.center.findAllByUnique',
    FINDONEBYID: 'event.center.findOneById',
    FINDALLBYLOCATION: 'event.center.findOneAllLocation',
    FINDALLBYSERVICEPROVIDER: 'event.center.findOneAllServiceProvider',
    CREATEEVENTCENTER: 'event.center.create',
    UPDATEEVENTCENTER: 'event.center.update',
    DELETEEVENTCENTER: 'event.center.delete',
    UPDATESUBSCRIPTION: 'event.center.updateSubscription',
}


export const NOTIFICATIONPATTERN = {
    FINDALL: 'notification.findAll',
    FINDBYID: 'notification.findOneById',
    FINDBYUSERID: 'notification.findAllByUserId',
    CREATE: 'notification.create',
    SEND: 'notification.send',
    FINDANDSEND: 'notification.send',
    UPDATE: 'notification.update',
    DELETE: 'notification.delete',
    PERMENENTDELETE: 'notification.permanentdelete',
    MARKALLASREAD: 'notification.markAllAsRead',
    MARKASREAD: 'notification.markAsRead',
}

export const WALLETPATTERN = {
    CREATE: 'wallet.create',              // internal: create wallet on user creation
    FINDBYUSERID: 'wallet.findByUserId',
    TOPUP: 'wallet.topup',               // create wallet-funding invoice + initiate payment
    PAYINVOICE: 'wallet.payInvoice',     // pay invoice from wallet balance
    TRANSACTIONS: 'wallet.transactions', // list wallet transactions
    PLATFORM_TRANSACTIONS: 'wallet.platformTransactions', // list platform wallet transactions (admin)
    RELEASEESCROW: 'wallet.releaseEscrow', // release held funds to SP on booking complete
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
  serviceId: string;

  @ApiProperty({ example: 'uuid' })
  @IsNotEmpty()
  @IsUUID()
  subscriptionPlanId: string;

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

