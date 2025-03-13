/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateNotificationDto, UpdateNotificationDto } from '@shared/contracts/notifications';
import { NotificationInterface } from '@shared/interfaces/Notification/notification.interface';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class NotificationsService {
	constructor(private readonly mailService: MailerService) { }

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

		if (type === 'EMAIL') {
			await this.retryOperation(() => this.sendEmail(payload));
		}

		// Handle other types like IN_APP, SMS, etc.
	}

	private async sendEmail(payload: NotificationInterface): Promise<void> {
		const { type, recipientId, data } = payload;
		const sendMail = await this.mailService.sendMail({
			from: "Banquet Pro",
			to: data.recipientEmail,
			subject: data.subject,
			text: data.message,
			html: data.html
		});

	}

	private async retryOperation<T>(
		operation: () => Promise<T>,
		retries = 5
	): Promise<T> {
		let lastError: any;

		for (let i = 0; i < retries; i++) {
			try {
				return await operation();
			} catch (error) {
				lastError = error;
				console.warn(`Retry ${i + 1} failed. Retrying...`, error);
			}
		}

		throw lastError;
	}
}
