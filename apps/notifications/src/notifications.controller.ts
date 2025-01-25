/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto, UpdateNotificationDto, NotificationDto } from '@shared/contracts'
import { NOTIFICATIONPATTERN } from '@shared/contracts';
import { NotificationInterface } from '@shared/interfaces/Notification/notification.interface';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) { }

  @MessagePattern('createNotification')
  create(@Payload() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  @MessagePattern('findAllNotification')
  findAll() {
    return this.notificationsService.findAll();
  }

  @MessagePattern('findOneNotification')
  findOne(@Payload() id: number) {
    return this.notificationsService.findOne(id);
  }

  @MessagePattern('updateNotification')
  update(@Payload() updateNotificationDto: UpdateNotificationDto) {
    return this.notificationsService.update(updateNotificationDto.id, updateNotificationDto);
  }

  @MessagePattern('removeNotification')
  remove(@Payload() id: number) {
    return this.notificationsService.remove(id);
  }

  @MessagePattern(NOTIFICATIONPATTERN.SENDNOTIFICATION)
  send(@Payload() createNotificationDto: NotificationInterface) {
    console.log('receiving notifications ....')
    // return this.notificationsService.create(createNotificationDto);
  }
}
