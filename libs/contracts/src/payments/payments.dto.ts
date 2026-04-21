import { IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  Currency,
  FeesType,
  InvoiceStatus,
  IPaymentStatus,
  PaymentReason,
  PaymentType,
  RefundStatus,
  ServiceType,
  Status,
  WalletTxReason,
  WalletTxType,
  WalletType,
  WithdrawalStatus,
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

  @ApiProperty({ example: "inv_123" })
  invoiceId: string;

  @ApiPropertyOptional({ example: 5000 })
  totalPaymentDue?: number;

  @ApiPropertyOptional({ example: 2500 })
  totalPaymentPaid?: number;

  @ApiPropertyOptional({ example: "book_123" })
  bookingId?: string;

  @ApiPropertyOptional({ example: "sub_123" })
  subscriptionId?: string;

  @ApiPropertyOptional({ enum: ServiceType })
  serviceType?: ServiceType;

  @ApiPropertyOptional({ example: "svc_123" })
  serviceId?: string;

  @ApiPropertyOptional({ example: "plan_123" })
  subscriptionPlanId?: string;

  @ApiPropertyOptional({ example: 30 })
  timeframe?: number;

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

  @ApiPropertyOptional({ example: "book_123" })
  bookingId?: string;

  @ApiPropertyOptional({ example: "pay_123" })
  paymentId?: string;

  @ApiPropertyOptional({ enum: ServiceType })
  serviceType?: ServiceType;

  @ApiPropertyOptional({ example: "svc_123" })
  serviceId?: string;

  @ApiPropertyOptional({ example: "plan_123" })
  subscriptionId?: string;

  @ApiPropertyOptional({ example: "plan_123" })
  subscriptionPlanId?: string;

  @ApiPropertyOptional({ example: "sp_123" })
  serviceProviderId?: string;

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

export class SubscriptionDto {
  @ApiProperty({ example: 'sub_123' })
  id: string;

  @ApiProperty({ example: 'sp_123' })
  serviceProviderId: string;

  @ApiProperty({ example: 'svc_123' })
  serviceId: string;

  @ApiProperty({ enum: PaymentType })
  type: PaymentType;

  @ApiProperty({ example: 'fee_123' })
  feesId: string;

  @ApiProperty({ example: 'plan_123' })
  subscriptionplanId: string;

  @ApiProperty({ example: 'fp_123' })
  featuredPlanId: string;

  @ApiProperty({ enum: Status })
  status: Status;

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
  expiryDate: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  updatedAt: Date;

  @ApiPropertyOptional({ example: '2024-01-01T00:00:00.000Z' })
  deletedAt?: Date;

  @ApiPropertyOptional({ example: 'user_123' })
  deletedBy?: string;

  @ApiPropertyOptional({ type: () => InvoiceDto, description: 'Invoice created alongside this subscription' })
  invoice?: InvoiceDto;
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

export class WalletTransactionDto {
  @ApiProperty({ example: "wtx_123" })
  id: string;

  @ApiProperty({ example: "wallet_123" })
  walletId: string;

  @ApiProperty({ enum: WalletTxType })
  type: WalletTxType;

  @ApiProperty({ enum: WalletTxReason })
  reason: WalletTxReason;

  @ApiProperty({ example: 5000 })
  amount: number;

  @ApiProperty({ example: 10000 })
  balanceBefore: number;

  @ApiProperty({ example: 15000 })
  balanceAfter: number;

  @ApiPropertyOptional({ example: "Wallet top-up" })
  description?: string;

  @ApiPropertyOptional({ example: "inv_123" })
  invoiceId?: string;

  @ApiPropertyOptional({ example: "pay_123" })
  paymentId?: string;

  @ApiPropertyOptional({ example: "ref_123" })
  refundId?: string;

  @ApiPropertyOptional({ example: "wdr_123" })
  withdrawalId?: string;

  @ApiProperty({ example: "2024-01-01T00:00:00.000Z" })
  createdAt: Date;
}

export class WalletDto {
  @ApiProperty({ example: "wallet_123" })
  id: string;

  @ApiPropertyOptional({ example: "user_123" })
  userId?: string;

  @ApiProperty({ enum: WalletType })
  type: WalletType;

  @ApiProperty({ example: 15000 })
  balance: number;

  @ApiProperty({ enum: Currency })
  currency: Currency;

  @ApiProperty({ example: "2024-01-01T00:00:00.000Z" })
  createdAt: Date;

  @ApiProperty({ example: "2024-01-01T00:00:00.000Z" })
  updatedAt: Date;

  @ApiPropertyOptional({ type: [WalletTransactionDto] })
  transactions?: WalletTransactionDto[];
}

export class WithdrawalDto {
  @ApiProperty({ example: "wdr_123" })
  id: string;

  @ApiProperty({ example: "wallet_123" })
  walletId: string;

  @ApiProperty({ example: "user_123" })
  userId: string;

  @ApiProperty({ example: 2000 })
  amount: number;

  @ApiProperty({ enum: Currency })
  currency: Currency;

  @ApiProperty({ type: Object, example: { accountNumber: '0123456789', bankName: 'First Bank' } })
  bankDetails: Record<string, any>;

  @ApiProperty({ enum: WithdrawalStatus })
  status: WithdrawalStatus;

  @ApiProperty({ example: "wdr_ref_123" })
  reference: string;

  @ApiProperty({ example: "2024-01-01T00:00:00.000Z" })
  createdAt: Date;

  @ApiProperty({ example: "2024-01-01T00:00:00.000Z" })
  updatedAt: Date;
}

export class RefundPolicyTierResponseDto {
  @ApiProperty({ example: "tier_123" })
  id: string;

  @ApiProperty({ example: 14 })
  minDaysBeforeEvent: number;

  @ApiProperty({ example: 25 })
  deductionPercentage: number;

  @ApiPropertyOptional({ example: "14-30 days: 25% deduction" })
  description?: string;
}

export class RefundPolicyDto {
  @ApiProperty({ example: "policy_123" })
  id: string;

  @ApiPropertyOptional({ example: "ec_123" })
  eventCenterId?: string;

  @ApiPropertyOptional({ example: "cat_123" })
  cateringId?: string;

  @ApiProperty({ example: true })
  allowRefunds: boolean;

  @ApiProperty({ example: 3 })
  refundWindowDays: number;

  @ApiProperty({ type: [RefundPolicyTierResponseDto] })
  tiers: RefundPolicyTierResponseDto[];

  @ApiProperty({ example: "2024-01-01T00:00:00.000Z" })
  createdAt: Date;

  @ApiProperty({ example: "2024-01-01T00:00:00.000Z" })
  updatedAt: Date;
}
