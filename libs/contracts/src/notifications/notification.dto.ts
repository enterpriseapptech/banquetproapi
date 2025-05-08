import { ServiceType } from "./create-notification.dto";

export class NotificationDto {
    id: string;
    userId: string;
    message: string;
    type: string;
    isRead: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    deletedBy: string;
}

export class ReviewDto {
    id: string;
    userId: string;
    bookingId: string;
    serviceId: string;
    serviceType: ServiceType;
    rating: number;
    comment?: string;
    isApproved: boolean;
    approvedBy?: string;
    deletedAt?: Date | null;
    deletedBy?: string;
    createdAt: Date;
    updatedAt: Date;
  }