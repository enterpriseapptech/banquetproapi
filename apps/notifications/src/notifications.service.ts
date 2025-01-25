/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateNotificationDto, UpdateNotificationDto } from '@shared/contracts';
import { NotificationInterface } from '@shared/interfaces/Notification/notification.interface';

@Injectable()
export class NotificationsService {
  create(createNotificationsDto: CreateNotificationDto) {
    return 'This action adds a new notification';
  }

  findAll() {
    return `This action returns all notification`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return `This action updates a #${id} notification`;
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }

  async send(payload: NotificationInterface): Promise<void> {
    const { type, recipientId, data } = payload;

    // if (type === 'EMAIL') {
    //   await this.sendEmail(data.subject, data.message, data.recipientEmail);
    // }

    // Handle other types like IN_APP, SMS, etc.
  }
}
