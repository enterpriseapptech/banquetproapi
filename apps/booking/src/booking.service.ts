/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConflictException, Inject, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
// import { $Enums as $EventBookingEnums, Prisma as EventBookingPrisma } from '@prisma/eventcenters';
import { $Enums, Prisma } from '@prisma/booking';
import { CreateBookingDto, BookingDto, EVENTCENTERBOOKINGPATTERN, NOTIFICATIONPATTERN, EventCenterDto, UserDto, USERPATTERN, ManyEventCentersDto, UpdateEventCenterDto, SearchServiceProviderDto, CreateEventCenterBookingDto, EventCenterBookingDto, EVENTCENTERPATTERN, ManyBookingDto, ManyRequestEventCenterDto } from '@shared/contracts';
import { DatabaseService } from '../database/database.service';
import { EVENT_CENTER_CLIENT, NOTIFICATION_CLIENT, USER_CLIENT } from './constants';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, throwError, firstValueFrom } from 'rxjs';

@Injectable()
export class BookingService {
	constructor(
		@Inject(NOTIFICATION_CLIENT) private readonly notificationClient: ClientProxy,
		@Inject(USER_CLIENT) private readonly userClient: ClientProxy,
		@Inject(EVENT_CENTER_CLIENT) private readonly eventClient: ClientProxy,
		private readonly databaseService: DatabaseService
	) { }

	async create(createBookingDto: CreateBookingDto): Promise<BookingDto> {

		const newBookingInput: Prisma.BookingCreateInput = {
			customerId: createBookingDto.customerId,
			serviceType: createBookingDto.serviceType as $Enums.ServiceType,
			totalBeforeDiscount: createBookingDto.totalBeforeDiscount,
			discount: createBookingDto.discount,
			totalAfterDiscount: createBookingDto.totalAfterDiscount,
			bookingDates: createBookingDto.bookingDates,
			isTermsAccepted: createBookingDto.isTermsAccepted,
			isCancellationPolicyAccepted: createBookingDto.isCancellationPolicyAccepted,
			isLiabilityWaiverSigned: createBookingDto.isLiabilityWaiverSigned,
			bookingReference: 'drhjfg',
			source: createBookingDto.source as $Enums.BookingSource,
			paymentStatus: 'UNPAID' as $Enums.PaymentStatus,
			status: 'PENDING' as $Enums.BookingStatus
		}

		// validate customer account
		const customer = await firstValueFrom(this.userClient.send<UserDto, string>(USERPATTERN.FINDUSERBYID, newBookingInput.customerId));

		if (!customer) {
			throw new NotFoundException("could not verify user account")
		}

		if (customer?.status !== "ACTIVE") {
			throw new UnauthorizedException("You can't book a service when account is restricted or deacitvated!")
		}

		try {

			switch (newBookingInput.serviceType) {
				case 'EVENTCENTER':
					const eventcenter = await this.eventClient.send<EventCenterDto, string>(EVENTCENTERPATTERN.FINDONEBYID, createBookingDto.eventcenterId)
					if (!eventcenter) {
						throw new NotFoundException('event center not found for booking');
					}
					break;

				default:
					break;
			}

			// Start a transaction - for an all or fail process
			const newBooking = await this.databaseService.$transaction(async (prisma) => {

				const booking = await prisma.booking.create({ data: newBookingInput });
				const createEventCenterBookingDto: Prisma.EventCenterBookingCreateInput = {
					eventcenterId: createBookingDto.eventcenterId,
					booking: { connect: { id: booking.id } }  ,
					eventName: createBookingDto.eventName,
					eventTheme: createBookingDto.eventTheme,
					eventType: createBookingDto.eventType,
					description: createBookingDto.description,
					noOfGuest: createBookingDto.noOfGuest,
					specialRequirements: createBookingDto.specialRequirements as $Enums.SpecialRequirement[],

				}
				const eventCenterBooking = await prisma.eventCenterBooking.create({ data: createEventCenterBookingDto });
				return booking;
			});

			//  notify service provider of booking
			this.notificationClient.emit(NOTIFICATIONPATTERN.SENDNOTIFICATION, {
				type: 'EMAIL',
				recipientId: newBooking.customerId,
				data: {
					subject: 'New Event Center Booking!',
					message: `A customer just booked an event, view details and confirm booking`,
					recipientEmail: customer.email,
				},
			});

			return newBooking;
		} catch (error) {
			console.log(error)
			throw new InternalServerErrorException(error, {
				cause: new Error(),
				description: 'new event Center creation failed, please try again'
			});
		}
	}


	async findAll(
		limit: number,
		offset: number,
		serviceProvider?: string,
		bookingReference?: string,
		startDate?: Date,
		endDate?: Date
	): Promise<ManyBookingDto> {
		const whereClause: any = { deletedAt: null };

		if (startDate) whereClause.createdAt = { gte: startDate };
		if (endDate) whereClause.createdAt = { lte: endDate };
		if (bookingReference) whereClause.bookingReference = bookingReference;

		if (serviceProvider) {

			/**
			 * 
			 * @remarks 
			 * 1. A booking is a microservice of its own and is not directly linked to a service provider
			 * 2. A booking is linked to an eventcenter via event center booking 
			 * 3. Eventcenter ia a microservices of its own and so is users. They connect via rabbitmq and message patterns
			 * 4. An event center is directly linked to a service provider via serviceProviderId gotten from Usermicroservice
			 * 
			 * 
			 * @summary
			 * 1. send message to event center microservice with service provider Id to retrive all event centers linked to service provider
			 * 2. fetch all event center bookings for the returned event centers
			 * 3. fetch all bookings linked to the event center bookings
			 * 4. return bookings
			 * 
			 * 
			 */

			const eventCenters = await firstValueFrom(this.eventClient.send<ManyEventCentersDto, ManyRequestEventCenterDto>(EVENTCENTERPATTERN.FINDALLEVENTCENTER,
				{
					limit: limit,
					offset: offset,
					serviceProvider,
				}))
			
			if (!eventCenters || eventCenters.data.length === 0) {
				return { count: 0, data: [] };
			}

			const eventCenterIds = eventCenters.data.map(ec => ec.id);

			const result = await this.databaseService.$transaction(async (prisma) => {

				const bookings = await prisma.booking.findMany({
					where: {
						deletedAt: null,
						eventCenterBooking: { eventcenterId: { in: eventCenterIds } },
					},
					take: limit,
					skip: offset,
				});


				const count = await prisma.booking.count({
					where: {
						deletedAt: null,
						eventCenterBooking: { eventcenterId: { in: eventCenterIds } },
					},
					take: limit,
					skip: offset,
				});

				return { count, data: bookings };
			});

			return { count: result.count, data: result.data };
		}

		const bookings = await this.databaseService.booking.findMany({
			where: whereClause,
			take: limit,
			skip: offset,
		});

		const count = await this.databaseService.booking.count({ where: whereClause });

		return { count, data: bookings };
	}

	
	async findOne(id: string): Promise<BookingDto> {

		const booking = await this.databaseService.booking.findUnique({
			where: {
				id: id,
				deletedAt: null
			},
			include: {
				eventCenterBooking: true
			}
		});
		if (!booking) {
			throw new NotFoundException("Event center not found or has been deleted")
		}
		return booking;
	}

	async update(id: string, updateEventcenterDto: UpdateEventCenterDto): Promise<BookingDto> {
		try {
			const updateEventCenterInput: Prisma.BookingUpdateInput = {
				...updateEventcenterDto,
				paymentStatus: updateEventcenterDto.status ? updateEventcenterDto.status as $Enums.PaymentStatus : undefined,
				status: updateEventcenterDto.status ? updateEventcenterDto.status as $Enums.BookingStatus : undefined,
				source: updateEventcenterDto.status ? updateEventcenterDto.status as $Enums.BookingSource : undefined,
			};
			const booking = await this.databaseService.booking.update({
				where: { id },
				data: updateEventCenterInput
			});

			return booking;
		} catch (error) {
			throw new ConflictException(error);
		}
	}

	async remove(id: string, updaterId: string): Promise<BookingDto> {
		const booking = await this.databaseService.booking.update({
			where: { id },
			data: {
				deletedAt: new Date(),
				deletedBy: updaterId
			}
		});

		// delete the associating service booking e.g eventcenterbooking
		return booking;
	}
}
