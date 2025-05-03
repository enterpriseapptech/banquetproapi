/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, EventPattern } from '@nestjs/microservices';
import { NotificationsService, ReviewService } from './notifications.service';
import { CreateNotificationDto, UpdateNotificationDto, NotificationDto, NOTIFICATIONPATTERN, CreateReviewDto, UpdateReviewDto } from '@shared/contracts/notifications'
import { NotificationInterface } from '@shared/interfaces/Notification/notification.interface';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) { }

  @EventPattern(NOTIFICATIONPATTERN.CREATE)
  create(@Payload() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  @MessagePattern(NOTIFICATIONPATTERN.FINDALL)
  findAll(@Payload() data: {limit: number, offset: number, search?: string}) {
    return this.notificationsService.findAll(data.limit, data.offset, data.search);
  }

  @MessagePattern(NOTIFICATIONPATTERN.FINDBYID)
  findOne(@Payload() id: string) {
    return this.notificationsService.findOne(id);
  }

  @MessagePattern(NOTIFICATIONPATTERN.SEND)
  update(@Payload()  data: {id: string,updateNotificationDto: UpdateNotificationDto}) {
    return this.notificationsService.update(data.id, data.updateNotificationDto);
  }

  @EventPattern(NOTIFICATIONPATTERN.MARKASREAD)
  read(@Payload() id: string) {
    return this.notificationsService.read(id);
  }

  @EventPattern(NOTIFICATIONPATTERN.MARKALLASREAD)
  readAll(@Payload() userId: string) {
    return this.notificationsService.read(userId);
  }


  @MessagePattern(NOTIFICATIONPATTERN.DELETE)
  remove(@Payload() id: string) {
    return this.notificationsService.remove(id);
  }

  @MessagePattern(NOTIFICATIONPATTERN.PERMENENTDELETE)
  permanentDelete(@Payload() id: string) {
    return this.notificationsService.remove(id);
  }

  @EventPattern(NOTIFICATIONPATTERN.SEND)
  send(@Payload() createNotificationDto: NotificationInterface) {
    console.log('receiving notifications ..., payload:', createNotificationDto)
    // return this.notificationsService.create(createNotificationDto);
  }
}


@Controller()
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  // @MessagePattern({ cmd: 'create_review' })
  // create(@Payload() dto: CreateReviewDto) {
  //   return this.reviewService.create(dto);
  // }

  @MessagePattern({ cmd: 'update_review' })
  update(@Payload() data: { reviewId: string; dto: UpdateReviewDto }) {
    return this.reviewService.update(data.reviewId, data.dto);
  }

  @MessagePattern({ cmd: 'approve_review' })
  approve(@Payload() data: { reviewId: string; approverId: string }) {
    return this.reviewService.approve(data.reviewId, data.approverId);
  }

  @MessagePattern({ cmd: 'delete_review' })
  delete(@Payload() data: { reviewId: string; deletedBy: string }) {
    return this.reviewService.softDelete(data.reviewId, data.deletedBy);
  }

  @MessagePattern({ cmd: 'get_approved_reviews' })
  getApproved(@Payload() serviceId: string) {
    return this.reviewService.getApprovedReviews(serviceId);
  }

  @MessagePattern({ cmd: 'get_user_reviews' })
  getAll(@Payload() userId: string) {
    return this.reviewService.getAll(userId);
  }
}
