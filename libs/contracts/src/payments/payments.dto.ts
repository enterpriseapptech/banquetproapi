
import { IsNumber, IsOptional, IsString } from "class-validator";
import { FeesType, InvoiceStatus, PaymentReason, RefundStatus, Status, IPaymentStatus } from "./create-payments.dto";
import { ApiProperty } from "@nestjs/swagger";

export class InvoiceItem {
  @ApiProperty({ description: 'Item name', example: 'Laptop' })
  @IsString()
  item: string;

  @ApiProperty({ description: 'Item amount', example: 1200 })
  @IsNumber()
  amount: number;
}

export class BillingAddress {
  @ApiProperty({ example: '123 Main St' })
  @IsString()
  street: string;

  @ApiProperty({ example: '123 Main St' })
  @IsOptional()
  @IsString()
  street2?: string;

  @ApiProperty({ example: 'Ikeja' })
  @IsString()
  city: string;

  @ApiProperty({ example: 'Lagos' })
  @IsString()
  state: string;

  @ApiProperty({ example: 'Nigeria' })
  @IsString()
  country: string;

  @ApiProperty({ example: '200911' })
  @IsString()
  postal: string;
}

export class PaymentMethodDto {
    id: string;
    provider: string;
    providerLogo: string;
    status: Status;
    createdAt: Date;
    createdBy?: string;
    updatedAt: Date;
    deletedAt?: Date;
}


export class PaymentDto {
    id: string;
    userId: string;
    user?: {name: string}; // can populate the user object depending on use case
    amount: number;
    amountCharged: number;
    reference: string;
    paymentAuthorization: Record<string, any>;
    currency: string;
    paymentReason: PaymentReason;
    status: IPaymentStatus;
    transactionId: string;
    createdAt: Date;
    updatedAt: Date;
    updatedBy?: string
    deletedat?: Date;
    deletedBy?: string;
    paymentMethod: PaymentMethodDto | string;
}



export class InvoiceDto  {
    id: string;
    userId: string;
    bookingId: string;
    paymentId?: string;
    items: InvoiceItem[];
    subTotal?: number;
    discount?: number;
    total?: number;
    amountDue: number;
    currency?: string;
    note?: string;
    billingAddress: BillingAddress;
    status: InvoiceStatus;
    dueDate: Date;
    createdAt: Date;
    updatedAt: Date;
    deletedat?: Date;
    deletedBy?: string;
    payment?: PaymentDto;

}

export class RefundDto{
    id: string;
    paymentId: string;
    amount: number;
    reason: string;
    status: InvoiceStatus;
    createdAt: Date;
    updatedAt: Date;
    deletedat?: Date;
    deletedBy?: string;
    payment: PaymentDto;

}

export class DisputeDto {
    id: string;
    userId: string;
    paymentId: string;
    serviceRequestId: string;
    reason: string;
    status: RefundStatus;
    dueDate: Date;
    createdAt: Date;
    updatedAt: Date;
    deletedat?: Date;
    deletedBy?: string;
    payment: PaymentDto;

}


export class SubscriptionPlanDto {
    id: string;
    plan: string;
    amount: number;
    timeFrame: number;
    status: Status;
    createdAt: Date;
    updatedAt: Date;
    deletedat?: Date;
    deletedBy?: string;
}


export class FeaturedPlanDto {
    id: string;
    plan: string;
    amount: number;
    timeFrame: number;
    status: Status;
    createdAt: Date;
    updatedAt: Date;
    deletedat?: Date;
    deletedBy?: string;
}

export class FeesDto {
    id: string;
    name: FeesType;
    amount: number;
    status: Status;
    createdAt: Date;
    updatedAt: Date;
    deletedat?: Date;
    deletedBy?: string;
}
