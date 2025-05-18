/* eslint-disable @typescript-eslint/no-unused-vars */
import { ForbiddenException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateNotificationDto, CreateReviewDto, NotificationDto, NotificationFilter, NotificationType, ReviewDto, ReviewFilter, ServiceType, UpdateNotificationDto, UpdateReviewDto } from '@shared/contracts/notifications';
import { NotificationInterface } from '@shared/interfaces/Notification/notification.interface';
import { MailerService } from '@nestjs-modules/mailer';
import { DatabaseService } from '../database/database.service';
import { $Enums, Prisma } from '@prisma/notifications';
import { BookingDto, BOOKINGPATTERN } from '@shared/contracts/booking';
import { BOOKING_CLIENT, USER_CLIENT } from '@shared/contracts';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { UserDto, USERPATTERN } from '@shared/contracts/users';
@Injectable()
export class NotificationsService {
	constructor(
		private readonly databaseService: DatabaseService,
		private readonly mailService: MailerService
	) { }

	async create(createNotificationDto: CreateNotificationDto): Promise<NotificationDto> {
		const newNotificationInput: Prisma.NotificationCreateInput = {
			userId: createNotificationDto.userId,
			message: createNotificationDto.message,
			type: createNotificationDto.type as $Enums.NotificationType,
			isRead: createNotificationDto.isRead
		}

		try {
			// Start a transaction - for an all or fail process of creating a user
			const notification = await this.databaseService.$transaction(async (prisma) => {

				// Create the user
				const notification = await prisma.notification.create({ data: newNotificationInput });
				return notification; // Return created user
			});

			return {
				...notification,
				type: notification.type as unknown as NotificationType
			};

		} catch (error) {
			throw new InternalServerErrorException('sever error could not create notification ', {
				cause: new Error(),
				description: 'notification creation failed, please try again'
			});
		}
	}

	async findAll(limit: number, offset: number, search?: string, filter?: NotificationFilter
		): Promise<{ count: number; docs: NotificationDto[] }> {
		const now = new Date();
		const startOfDay = new Date(now.setHours(0, 0, 0, 0));
		const endOfDay = new Date(now.setHours(23, 59, 59, 999));

		const whereClause: any = {
			deletedAt: null,
			...(search && {
			message: {
				contains: search,
				mode: 'insensitive',
			},
			}),
			...(filter?.senderId && { senderId: filter.senderId }),
			...(filter?.recieverId && { recieverId: filter.recieverId }),
			...(filter?.read && { isRead: true }),
			...(filter?.unread && { isRead: false }),
			...(filter?.type && { type: filter.type }),
			...(filter?.systemNotification !== undefined && {
			senderId: filter.systemNotification ? 'SYSTEM_NOTIFICATION' : { not: 'SYSTEM_NOTIFICATION' },
			}),
			...(filter?.today && {
			createdAt: {
				gte: startOfDay,
				lte: endOfDay,
			},
			}),
		};

		const [notifications, count] = await this.databaseService.$transaction([
			this.databaseService.notification.findMany({
			take: limit,
			skip: offset,
			where: whereClause,
			orderBy: { createdAt: 'asc' },
			}),

			this.databaseService.notification.count({
			where: whereClause,
			}),
		]);

		return {
			count,
			docs: notifications.map((notification) =>
			this.mapToNotification(notification)
			),
		};
	}



	async findOne(id: string): Promise<NotificationDto> {

		const notification = await this.databaseService.notification.findUnique({
			where: {
				id: id,
				deletedAt: null
			},
		});

		return {
			...notification,
			type: notification.type as unknown as NotificationType
		};
	}

	async update(id: string, updateNotificationDto: UpdateNotificationDto): Promise<NotificationDto> {
		try {
			const updateNotificationInput: Prisma.NotificationUpdateInput = {
				...updateNotificationDto
			};

			const notification = await this.databaseService.notification.update({
				where: { id },
				data: updateNotificationInput
			});


			return {
				...notification,
				type: notification.type as unknown as NotificationType
			};

		} catch (error) {
			throw new InternalServerErrorException(error);
		}
	}


	async read(id: string): Promise<NotificationDto> {
		try {

			const notification = await this.databaseService.notification.update({
				where: { id },
				data: {
					isRead: true
				}
			});


			return {
				...notification,
				type: notification.type as unknown as NotificationType
			};

		} catch (error) {
			throw new InternalServerErrorException(error);
		}
	}

	async readAll(userId: string): Promise<{ count: number }> {
		try {
			const result = await this.databaseService.notification.updateMany({
				where: { userId, isRead: false },
				data: { isRead: true },
			});

			return { count: result.count };
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
	}


	async remove(id: string): Promise<NotificationDto> {

		const notification = await this.databaseService.$transaction(async (prisma) => {
			const deletedNotification = await prisma.notification.update({
				where: { id },
				data: {
					deletedAt: new Date()
				}
			});

			return deletedNotification
		});

		return {
			...notification,
			type: notification.type as unknown as NotificationType
		};

	}

	async permanentDelete(id: string): Promise<NotificationDto> {

		const notification = await this.databaseService.$transaction(async (prisma) => {
			const deletedNotification = await prisma.notification.delete({
				where: { id },
			});
			return deletedNotification
		});

		return {
			...notification,
			type: notification.type as unknown as NotificationType
		};

	}


	async send(payload: NotificationInterface): Promise<void> {
		const { type, recipientId, data } = payload;

		if (type === 'EMAIL') {
			await this.retryOperation(() => this.sendEmail(payload));
		}

		// Handle other types like IN_APP, SMS, etc.
	}

	// pending a job or task or service that would handle the sending of emails
	private async sendEmail(payload: NotificationInterface): Promise<void> {
		const { type, recipientId, data } = payload;
		const sendMail = await this.mailService.sendMail({
			from: "Banquet Pro",
			to: data.recipientEmail,
			subject: data.subject,
			text: data.message,
			html: data.html
		});
		console.log({sendMail})
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

	/**
	 * 
	 * Maps a raw event center from the database to EventCenterDto.
	 */
	private mapToNotification(notification: any): NotificationDto {
		return {
			...notification,
			type: notification.type as unknown as NotificationType
		};
	}
}


@Injectable()
export class ReviewService {
	constructor(
		@Inject(BOOKING_CLIENT) private readonly bookingClient: ClientProxy,
		@Inject(USER_CLIENT) private readonly userClient: ClientProxy,
		private readonly databaseService: DatabaseService,
	) { }

	async create(createReviewDto: CreateReviewDto) {
		
		try {
			// Validate that the booking belongs to the user and is completed
			const booking = await firstValueFrom(this.bookingClient.send<BookingDto, string>(BOOKINGPATTERN.FINDONEBYID, createReviewDto.bookingId)) 

			if (!booking) {
				throw new ForbiddenException('The booking you selected for review does not exist');
			}
			
			if(booking.status != 'BOOKED' || booking.customerId != createReviewDto.userId 
				|| booking.serviceType !== createReviewDto.serviceType 
				||  booking.canceledAt)
				{
					throw new ForbiddenException('You can not review this booking');
		
				}
			
			const newReviewInput: Prisma.ReviewCreateInput = {
				userId: createReviewDto.userId,
				bookingId: booking.id,
				serviceId: createReviewDto.serviceId,
				serviceType: createReviewDto.serviceType as $Enums.ServiceType,
				rating: createReviewDto.rating,
				comment: createReviewDto.comment,
			}	
			// Start a transaction - for an all or fail process of creating a user
			const review = await this.databaseService.$transaction(async (prisma) => {

				// Create the user
				const review = await prisma.review.create({ data: newReviewInput });
				return review; // Return created user
			});

			return {
				...review,
				serviceType: review.serviceType as unknown as ServiceType
			};

		} catch (error) {
			throw new InternalServerErrorException('sever error could not create review ', {
				cause: new Error(),
				description: 'notification creation failed, please try again'
			});
		}
		
	}

	async update(id: string, updateReviewDto: UpdateReviewDto) {
		try {
			if (updateReviewDto.approvedBy) {
				// Validate that the booking belongs to the user and is completed
				const user = await firstValueFrom(this.userClient.send<UserDto, string>(USERPATTERN.FINDBYID, updateReviewDto.approvedBy)) 

				if (!user && (user.userType !== 'ADMIN' && user.userType !== 'SERVICE_PROVIDER')) {
					throw new ForbiddenException('Only admin or the owner of the service been reviewed can approve it');
				}
			}
			const updateReviewInput: Prisma.ReviewUpdateInput = {
				...updateReviewDto
			};

			const review = await this.databaseService.review.update({
				where: { id },
				data: updateReviewInput
			});


			return {
				...review,
				serviceType: review.serviceType as unknown as ServiceType
			};
			
		} catch (error) {
			throw new InternalServerErrorException('sever error could not update review ', {
				cause: new Error(),
				description: error.message
			});
		}

	}

	async findAll(limit: number, offset: number, search?: string, filter?: ReviewFilter): Promise<{ count: number; docs: ReviewDto[] }> {
		const whereClause: any = {};
    
		if (search) {
            whereClause.OR = [
                { comment: { contains: search, mode: "insensitive" } }
            ];
        }

		if (filter.approvedBy) {
			whereClause.approvedBy = filter.approvedBy;
		}
		
		if (filter.serviceId) {
			whereClause.serviceId = filter.serviceId;
		}
		

		if (filter.serviceType) {
			whereClause.serviceType = filter.serviceType;
		}
		

		if (filter.isApproved) {
			whereClause.isApproved = filter.isApproved;
		}
		

		const [reviews, count] = await this.databaseService.$transaction([
			this.databaseService.review.findMany({
				take: limit,
				skip: offset,
				where: whereClause,
				orderBy: { createdAt: 'asc' },
			}),
			this.databaseService.review.count({
				where: whereClause,
			}),
		]);

		return {
			count,
			docs: reviews.map(review => this.mapToReviewDto(review)),
		};
	}
	
	async permanentDelete(id: string): Promise<ReviewDto> {

		const review = await this.databaseService.$transaction(async (prisma) => {
			const deletedNotification = await prisma.review.delete({
				where: { id },
			});
			return deletedNotification
		});

		return {
			...review,
			serviceType: review.serviceType as unknown as ServiceType
		};

	}


	/**
	 * 
	 * Maps a raw event center from the database to EventCenterDto.
	 */
	private mapToReviewDto(review: any): ReviewDto {
		return {
			...review,
			serviceType: review.serviceType as unknown as ServiceType
		};
	}
}
