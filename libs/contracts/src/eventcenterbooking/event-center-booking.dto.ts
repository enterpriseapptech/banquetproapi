export class EventCenterBookingDto {
    id: string;
    eventcenterId: string;
    bookingId: string;
    eventStartDate: Date;
    eventEndDate: Date;
    eventName?: string;
    eventTheme?: string;
    eventType?: string;
    description?: string;
    noOfGuest?: number;
    specialRequirements: string[];
    images: string[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    deletedBy?: string;
}

export class ManyEventCenterBookingsDto {
    count: number;
    data: EventCenterBookingDto[];
}
