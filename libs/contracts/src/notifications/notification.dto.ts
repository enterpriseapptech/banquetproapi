
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
