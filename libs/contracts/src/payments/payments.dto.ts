import { FeesType, Status } from "./create-payments.dto";

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
