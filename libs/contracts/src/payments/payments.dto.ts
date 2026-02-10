import { IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  FeesType,
  InvoiceStatus,
  IPaymentStatus,
  PaymentReason,
  RefundStatus,
  Status,
} from "./create-payments.dto";
import { UserDto } from "../users";


export class InvoiceItem {
  @ApiProperty({ description: "Item name", example: "Laptop" })
  @IsString()
  item: string;

  @ApiProperty({ description: "Item amount", example: 1200 })
  @IsNumber()
  amount: number;
}

export class BillingAddress {
  @ApiProperty({ example: "123 Main St" })
  @IsString()
  street: string;

  @ApiProperty({ example: "123 Main St" })
  @IsOptional()
  @IsString()
  street2?: string;

  @ApiProperty({ example: "Ikeja" })
  @IsString()
  city: string;

  @ApiProperty({ example: "Lagos" })
  @IsString()
  state: string;

  @ApiProperty({ example: "Nigeria" })
  @IsString()
  country: string;

  @ApiProperty({ example: "200911" })
  @IsString()
  postal: string;
}

export class PaymentMethodDto {
  @ApiProperty({ example: "pm_123" })
  id: string;

  @ApiProperty({ example: "stripe" })
  provider: string;

  @ApiPropertyOptional({ example: "https://cdn.example.com/logo.png" })
  providerLogo: string;

  @ApiProperty({ enum: Status })
  status: Status;

  @ApiProperty({ example: "2024-01-01T00:00:00.000Z" })
  createdAt: Date;

  @ApiPropertyOptional({ example: "user_123" })
  createdBy?: string;

  @ApiProperty({ example: "2024-01-01T00:00:00.000Z" })
  updatedAt: Date;

  @ApiPropertyOptional({ example: "2024-01-01T00:00:00.000Z" })
  deletedAt?: Date;
}

export class PaymentDto {
  @ApiProperty({ example: "uuid" })
  id: string;

  @ApiPropertyOptional({ example: 5000 })
  totalPaymentDue?: number;

  @ApiPropertyOptional({ example: 2500 })
  totalPaymentPaid?: number;

  @ApiPropertyOptional({ example: "book_123" })
  bookingId?: string;

  @ApiPropertyOptional({ example: "sub_123" })
  subscritpionId?: string;

  @ApiProperty({ example: "user_123" })
  userId: string;

  @ApiPropertyOptional({ type: "object", additionalProperties: { type: 'object' }})
  user?: UserDto; 

  @ApiProperty({ example: 2500 })
  amount: number;

  @ApiProperty({ example: 2500 })
  amountCharged: number;

  @ApiProperty({ example: "ref_123" })
  reference: string;

  @ApiProperty({ type: "object", additionalProperties: { type: 'object' },})
  paymentAuthorization: Record<string, any>;

  @ApiProperty({ example: "NGN" })
  currency: string;

  @ApiProperty({ enum: PaymentReason })
  paymentReason: PaymentReason;

  @ApiProperty({ enum: IPaymentStatus })
  status: IPaymentStatus;

  @ApiProperty({ example: "txn_123" })
  transactionId: string;

  @ApiProperty({ example: "2024-01-01T00:00:00.000Z" })
  createdAt: Date;

  @ApiProperty({ example: "2024-01-01T00:00:00.000Z" })
  updatedAt: Date;

  @ApiPropertyOptional({ example: "user_123" })
  updatedBy?: string;

  @ApiPropertyOptional({ example: "2024-01-01T00:00:00.000Z" })
  deletedat?: Date;

  @ApiPropertyOptional({ example: "user_123" })
  deletedBy?: string;

  @ApiProperty({
    oneOf: [{ $ref: "#/components/schemas/PaymentMethodDto" }, { type: "string" }],
  })
  paymentMethod: PaymentMethodDto | string;
}

export class InvoiceDto {
  @ApiProperty({ example: "inv_123" })
  id: string;

  @ApiProperty({ example: "user_123" })
  userId: string;

  @ApiProperty({ example: "book_123" })
  bookingId: string;

  @ApiPropertyOptional({ example: "pay_123" })
  paymentId?: string;

  @ApiProperty({ type: [InvoiceItem] })
  items: InvoiceItem[];

  @ApiPropertyOptional({ example: 5000 })
  subTotal?: number;

  @ApiPropertyOptional({ example: 500 })
  discount?: number;

  @ApiPropertyOptional({ example: 4500 })
  total?: number;

  @ApiProperty({ example: 4500 })
  amountDue: number;

  @ApiPropertyOptional({ example: "NGN" })
  currency?: string;

  @ApiPropertyOptional({ example: "Thanks for your business" })
  note?: string;

  @ApiProperty({ type: BillingAddress })
  billingAddress: BillingAddress;

  @ApiProperty({ enum: InvoiceStatus })
  status: InvoiceStatus;

  @ApiProperty({ example: "2024-01-01T00:00:00.000Z" })
  dueDate: Date;

  @ApiProperty({ example: "2024-01-01T00:00:00.000Z" })
  createdAt: Date;

  @ApiProperty({ example: "2024-01-01T00:00:00.000Z" })
  updatedAt: Date;

  @ApiPropertyOptional({ example: "2024-01-01T00:00:00.000Z" })
  deletedat?: Date;

  @ApiPropertyOptional({ example: "user_123" })
  deletedBy?: string;

  @ApiPropertyOptional({ type: PaymentDto })
  payment?: PaymentDto;
}

export class RefundDto {
  @ApiProperty({ example: "ref_123" })
  id: string;

  @ApiProperty({ example: "pay_123" })
  paymentId: string;

  @ApiProperty({ example: 2500 })
  amount: number;

  @ApiProperty({ example: "Duplicate payment" })
  reason: string;

  @ApiProperty({ enum: InvoiceStatus })
  status: InvoiceStatus;

  @ApiProperty({ example: "2024-01-01T00:00:00.000Z" })
  createdAt: Date;

  @ApiProperty({ example: "2024-01-01T00:00:00.000Z" })
  updatedAt: Date;

  @ApiPropertyOptional({ example: "2024-01-01T00:00:00.000Z" })
  deletedat?: Date;

  @ApiPropertyOptional({ example: "user_123" })
  deletedBy?: string;

  @ApiProperty({ type: PaymentDto })
  payment: PaymentDto;
}

export class DisputeDto {
  @ApiProperty({ example: "disp_123" })
  id: string;

  @ApiProperty({ example: "user_123" })
  userId: string;

  @ApiProperty({ example: "pay_123" })
  paymentId: string;

  @ApiProperty({ example: "srv_123" })
  serviceRequestId: string;

  @ApiProperty({ example: "Chargeback" })
  reason: string;

  @ApiProperty({ enum: RefundStatus })
  status: RefundStatus;

  @ApiProperty({ example: "2024-01-01T00:00:00.000Z" })
  dueDate: Date;

  @ApiProperty({ example: "2024-01-01T00:00:00.000Z" })
  createdAt: Date;

  @ApiProperty({ example: "2024-01-01T00:00:00.000Z" })
  updatedAt: Date;

  @ApiPropertyOptional({ example: "2024-01-01T00:00:00.000Z" })
  deletedat?: Date;

  @ApiPropertyOptional({ example: "user_123" })
  deletedBy?: string;

  @ApiProperty({ type: PaymentDto })
  payment: PaymentDto;
}

export class SubscriptionPlanDto {
  @ApiProperty({ example: "plan_123" })
  id: string;

  @ApiProperty({ example: "Gold" })
  plan: string;

  @ApiProperty({ example: 10000 })
  amount: number;

  @ApiProperty({ example: 12 })
  timeFrame: number;

  @ApiProperty({ enum: Status })
  status: Status;

  @ApiProperty({ example: "2024-01-01T00:00:00.000Z" })
  createdAt: Date;

  @ApiProperty({ example: "2024-01-01T00:00:00.000Z" })
  updatedAt: Date;

  @ApiPropertyOptional({ example: "2024-01-01T00:00:00.000Z" })
  deletedat?: Date;

  @ApiPropertyOptional({ example: "user_123" })
  deletedBy?: string;
}

export class FeaturedPlanDto {
  @ApiProperty({ example: "plan_123" })
  id: string;

  @ApiProperty({ example: "Platinum" })
  plan: string;

  @ApiProperty({ example: 15000 })
  amount: number;

  @ApiProperty({ example: 12 })
  timeFrame: number;

  @ApiProperty({ enum: Status })
  status: Status;

  @ApiProperty({ example: "2024-01-01T00:00:00.000Z" })
  createdAt: Date;

  @ApiProperty({ example: "2024-01-01T00:00:00.000Z" })
  updatedAt: Date;

  @ApiPropertyOptional({ example: "2024-01-01T00:00:00.000Z" })
  deletedat?: Date;

  @ApiPropertyOptional({ example: "user_123" })
  deletedBy?: string;
}

export class FeesDto {
  @ApiProperty({ example: "fee_123" })
  id: string;

  @ApiProperty({ enum: FeesType })
  name: FeesType;

  @ApiProperty({ example: 250 })
  amount: number;

  @ApiProperty({ enum: Status })
  status: Status;

  @ApiProperty({ example: "2024-01-01T00:00:00.000Z" })
  createdAt: Date;

  @ApiProperty({ example: "2024-01-01T00:00:00.000Z" })
  updatedAt: Date;

  @ApiPropertyOptional({ example: "2024-01-01T00:00:00.000Z" })
  deletedat?: Date;

  @ApiPropertyOptional({ example: "user_123" })
  deletedBy?: string;

}
