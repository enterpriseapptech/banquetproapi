
import { FeesType, InvoiceStatus, PaymentReason, RefundStatus, Status, IPaymentStatus } from "./create-payments.dto";


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
    paymentId: string;
    status: RefundStatus;
    dueDate: Date;
    createdAt: Date;
    updatedAt: Date;
    deletedat?: Date;
    deletedBy?: string;
    payment: PaymentDto;

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
