import { Inject, Injectable } from '@nestjs/common';
import { CreateNotificationDto, CreateReviewDto, NotificationDto, NotificationFilter, NOTIFICATIONPATTERN, ReviewDto, REVIEWPATTERN, UpdateNotificationDto, UpdateReviewDto } from '@shared/contracts/notifications';
import { ClientProxy } from '@nestjs/microservices';
import { NOTIFICATION_CLIENT, REVIEW_CLIENT } from '@shared/contracts';
import { NotificationInterface } from '@shared/interfaces/Notification/notification.interface';


@Injectable()
export class NotificationService {
    constructor(
        @Inject(NOTIFICATION_CLIENT) private readonly notificationClient: ClientProxy
    ) { }

    create(createNotificationDto: CreateNotificationDto) {
        return this.notificationClient.send<NotificationDto, CreateNotificationDto>(NOTIFICATIONPATTERN.CREATE, createNotificationDto)
    }

    findAll(limit: number, offset: number, search?: string, filter?: NotificationFilter) {
        return this.notificationClient.send<{ count: number; docs: NotificationDto[] }, {limit: number, offset: number, search?: string, filter?: NotificationFilter}>(NOTIFICATIONPATTERN.FINDALL, {limit, offset, search, filter})
    }

    findOne(id: string) {
        return this.notificationClient.send<NotificationDto, string>(NOTIFICATIONPATTERN.FINDBYID, id)
    }

    update(id: string, updateNotificationDto: UpdateNotificationDto) {
        return this.notificationClient.send<NotificationDto, { id: string, updateNotificationDto: UpdateNotificationDto }>(NOTIFICATIONPATTERN.UPDATE, {
            id,
            updateNotificationDto
        })
    }

    read(id: string) {
        return this.notificationClient.send<NotificationDto, { id: string}>(NOTIFICATIONPATTERN.UPDATE, { id})
    }

    readAll(userId: string) {
        return this.notificationClient.send<NotificationDto, {userId: string}>(NOTIFICATIONPATTERN.UPDATE, {userId})
    }

    remove(id: string, updaterId: any) {
        return this.notificationClient.send<NotificationDto, { id: string, updaterId: string }>(NOTIFICATIONPATTERN.DELETE, { id, updaterId })
    }

    permanentDelete(id: string) {
        return this.notificationClient.send<NotificationDto, { id: string}>(NOTIFICATIONPATTERN.DELETE, { id})
    }

    send(createNotificationDto: NotificationInterface) {
        return this.notificationClient.send<NotificationDto, { createNotificationDto: NotificationInterface}>(NOTIFICATIONPATTERN.DELETE, { createNotificationDto})
    }
    
}

@Injectable()
export class ReviewService {
    constructor(
        @Inject(REVIEW_CLIENT) private readonly reviewClient: ClientProxy
    ) { }

    create(createReviewDto: CreateReviewDto) {
        return this.reviewClient.send<ReviewDto, CreateReviewDto>(REVIEWPATTERN.CREATE, createReviewDto)
    }

    findAll(limit: number, offset: number, search?: string) {
        return this.reviewClient.send<{ count: number; docs: NotificationDto[] }, {limit: number, offset: number, search?: string}>(NOTIFICATIONPATTERN.FINDALL, {limit, offset, search})
    }


    findOne(id: string) {
        return this.reviewClient.send<ReviewDto, string>(REVIEWPATTERN.FINDBYID, id)
    }

    update(id: string, updateReviewDto: UpdateReviewDto) {
        return this.reviewClient.send<ReviewDto, { id: string, updateReviewDto: UpdateReviewDto }>(REVIEWPATTERN.UPDATE, {
            id,
            updateReviewDto
        })
    }

    permanentDelete(id: string) {
        return this.reviewClient.send<ReviewDto, { id: string}>(REVIEWPATTERN.PERMENENTDELETE, { id})
    }
}
