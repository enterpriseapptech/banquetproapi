/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConflictException, Inject, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { $Enums, Prisma } from '../prisma/@prisma/booking';
import { CreateBookingDto, BookingDto, ManyBookingDto, TimeslotDto, CreateManyTimeSlotDto, ManyTimeslotDto, ManyRequestTimeSlotDto, UpdateTimeslotDto, UpdateBookingDto, PaymentStatus, ServiceType, BookingStatus, BookingSource } from '@shared/contracts/booking';
import { EventCenterDto, EVENTCENTERPATTERN, ManyRequestEventCenterDto } from '@shared/contracts/eventcenters';
import { ManyEventCentersDto } from '@shared/contracts/eventcenters';
import { UserDto, USERPATTERN, } from '@shared/contracts/users';
import { DatabaseService } from '../database/database.service';
import { NOTIFICATIONPATTERN } from '@shared/contracts/notifications';
import { EVENT_CENTER_CLIENT, NOTIFICATION_CLIENT, USER_CLIENT, CATERING_CLIENT } from '@shared/contracts';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CateringDto, CATERINGPATTERN } from '@shared/contracts/catering';

@Injectable()
export class BookingService {
	constructor(
		@Inject(NOTIFICATION_CLIENT) private readonly notificationClient: ClientProxy,
		@Inject(USER_CLIENT) private readonly userClient: ClientProxy,
		@Inject(EVENT_CENTER_CLIENT) private readonly eventClient: ClientProxy,
		@Inject(CATERING_CLIENT) private readonly cateringClient: ClientProxy,
		private readonly databaseService: DatabaseService
	) { }

	async create(createBookingDto: CreateBookingDto): Promise<BookingDto> {
		let notificationSubject: string;
		console.log("getiting to implement this pr ",{serviceId:createBookingDto.serviceId})
		const newBookingInput: Prisma.BookingCreateInput = {
			customerId: createBookingDto.customerId,
			serviceId: createBookingDto.serviceId,
			serviceType: createBookingDto.serviceType as $Enums.ServiceType,
			totalBeforeDiscount: createBookingDto.totalBeforeDiscount,
			discount: createBookingDto.discount,
			totalAfterDiscount: createBookingDto.totalAfterDiscount,
			bookingDates: createBookingDto.bookingDates,
			isTermsAccepted: createBookingDto.isTermsAccepted,
			isCancellationPolicyAccepted: createBookingDto.isCancellationPolicyAccepted,
			isLiabilityWaiverSigned: createBookingDto.isLiabilityWaiverSigned,
			bookingReference: Math.random().toString(16).substring(2, 8),
			source: createBookingDto.source as $Enums.BookingSource,
			paymentStatus: 'UNPAID' as $Enums.PaymentStatus,
			status: 'PENDING' as $Enums.BookingStatus,
			serviceNotes: createBookingDto.serviceNotes,
			customerNotes: createBookingDto.customerNotes
		}

		// validate customer account
		const customer = await firstValueFrom(this.userClient.send<UserDto, string>(USERPATTERN.FINDBYID, newBookingInput.customerId));

		if (!customer) {
			throw new NotFoundException("could not verify user account")
		}

		if (customer?.status !== "ACTIVE") {
			throw new UnauthorizedException("You can't book a service when account is restricted or deacitvated!")
		}

		try {

			switch (newBookingInput.serviceType) {
				case $Enums.ServiceType.EVENTCENTER:
					const eventcenter = await this.eventClient.send<EventCenterDto, string>(EVENTCENTERPATTERN.FINDONEBYID, createBookingDto.serviceId)
					if (!eventcenter) {
						throw new NotFoundException('event center not found for booking');
					}
					break;
				case $Enums.ServiceType.CATERING:
					const catering = await this.eventClient.send<CateringDto, string>(CATERINGPATTERN.FINDONEBYID, createBookingDto.serviceId)
					if (!catering) {
						throw new NotFoundException('catering service not found for booking');
					}
					break;
				default:
					break;
			}

			// Start a transaction - for an all or fail process
			const newBooking = await this.databaseService.$transaction(async (prisma) => {

				const booking = await prisma.booking.create({ data: newBookingInput });

				await prisma.timeSlot.updateMany({
					where: { id: { in: createBookingDto.timeslotId } }, // Replace bookingId with the actual ID
					data: {
						bookingId: booking.id,
						isAvailable: false
					}, // Replace newTimeslot with the new value
				});

				if ($Enums.ServiceType.EVENTCENTER) {
					const createEventCenterBookingDto: Prisma.EventCenterBookingCreateInput = {
						eventcenterId: createBookingDto.serviceId,
						booking: { connect: { id: booking.id } },
						eventName: createBookingDto.eventName,
						eventTheme: createBookingDto.eventTheme,
						eventType: createBookingDto.eventType,
						description: createBookingDto.description,
						noOfGuest: createBookingDto.noOfGuest,
						specialRequirements: createBookingDto.specialRequirements as $Enums.SpecialRequirement[],

					}
					await prisma.eventCenterBooking.create({ data: createEventCenterBookingDto });
					notificationSubject = "A customer just booked your Event Center";
				} else if ($Enums.ServiceType.CATERING) {
					const createCateringBookingDto: Prisma.CateringBookingCreateInput = {
						cateringId: createBookingDto.serviceId,
						booking: { connect: { id: booking.id } },
						eventName: createBookingDto.eventName,
						cuisine: createBookingDto.cuisine,
						dishTypes: createBookingDto.dishTypes, 
						eventType: createBookingDto.eventType,
						description: createBookingDto.description,
						noOfGuest: createBookingDto.noOfGuest,
						specialRequirements: createBookingDto.specialRequirements as $Enums.SpecialRequirement[],

					}
					await prisma.cateringBooking.create({ data: createCateringBookingDto });
					notificationSubject = "A customer just booked your catering service";
				}
				
				return booking;
			});

			//  notify service provider of booking
			this.notificationClient.emit(NOTIFICATIONPATTERN.SEND, {
				type: 'EMAIL',
				recipientId: newBooking.customerId,
				data: {
					subject: notificationSubject,
					message: `A customer just booked your service, view details and confirm booking`,
					recipientEmail: customer.email,
				},
			});
			const bookingDto: BookingDto = {
				...newBooking,
				status: newBooking.status as unknown as BookingStatus,
				paymentStatus: newBooking.paymentStatus as unknown as PaymentStatus,
				serviceType: newBooking.serviceType as unknown as ServiceType,
				source: newBooking.source as unknown as BookingSource
			};

			return bookingDto;

		} catch (error) {
			console.log(error)
			throw new InternalServerErrorException(error, {
				cause: new Error(),
				description: 'Booking failed, please try again'
			});
		}
	}


	async findAll(
		limit: number,
		offset: number,
		serviceId?: string,
		serviceProvider?: string,
		bookingReference?: string,
		startDate?: Date,
		endDate?: Date
	): Promise<ManyBookingDto> {
		const whereClause: any = { deletedAt: null };

		if (startDate) whereClause.createdAt = { gte: startDate };
		if (endDate) whereClause.createdAt = { lte: endDate };
		if (bookingReference) whereClause.bookingReference = bookingReference;
		if (serviceId) whereClause.serviceId = serviceId;
		
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

			return { count: result.count, data: result.data.map(booking => this.mapToBookingDto(booking)) };
		}

		const bookings = await this.databaseService.booking.findMany({
			where: whereClause,
			take: limit,
			skip: offset,
		});

		const count = await this.databaseService.booking.count({ where: whereClause });

		return { count, data: bookings.map(booking => this.mapToBookingDto(booking)) };
	}

	
	async findOne(id: string): Promise<BookingDto> {

		const booking = await this.databaseService.booking.findUnique({
			where: {
				id: id,
				deletedAt: null
			}
		});
		if (!booking) {
			throw new NotFoundException("Event center not found or has been deleted")
		}
		const bookingDto: BookingDto = {
			...booking,
			status: booking.status as unknown as BookingStatus,
			paymentStatus: booking.paymentStatus as unknown as PaymentStatus,
			serviceType: booking.serviceType as unknown as ServiceType,
			source: booking.source as unknown as BookingSource
		};

		return bookingDto;

	}


	async update(id: string, updateBookingDto: UpdateBookingDto): Promise<BookingDto> {
		try {
			const updateEventCenterInput: Prisma.BookingUpdateInput = {
				...updateBookingDto,
				paymentStatus: updateBookingDto.paymentStatus ? updateBookingDto.paymentStatus as $Enums.PaymentStatus : undefined,
				status: updateBookingDto.status ? updateBookingDto.status as $Enums.BookingStatus : undefined,
				source: updateBookingDto.source ? updateBookingDto.source as $Enums.BookingSource : undefined,
			};
			const booking = await this.databaseService.booking.update({
				where: { id },
				data: updateEventCenterInput
			});

			const bookingDto: BookingDto = {
				...booking,
				status: booking.status as unknown as BookingStatus,
				paymentStatus: booking.paymentStatus as unknown as PaymentStatus,
				serviceType: booking.serviceType as unknown as ServiceType,
				source: booking.source as unknown as BookingSource
			};

			return bookingDto;
		} catch (error) {
			throw new ConflictException(error);
		}
	}

	async remove(id: string, updaterId: string): Promise<BookingDto> {

		const deletedBooking = await this.databaseService.$transaction(async (prisma) => {
			const booking = await this.databaseService.booking.update({
				where: { id },
				data: {
					deletedAt: new Date(),
					deletedBy: updaterId
				}
			});

			switch (booking.serviceType) {
				case $Enums.ServiceType.EVENTCENTER:
					const eventServiceBooking = await this.databaseService.eventCenterBooking.update({
						where: { bookingId: booking.id},
						data: {
							deletedAt: new Date(),
							deletedBy: updaterId
						}
					});
					break;
				
				case $Enums.ServiceType.CATERING:
					const cateringServiceBooking = await this.databaseService.cateringBooking.update({
						where: { bookingId: booking.id },
						data: {
							deletedAt: new Date(),
							deletedBy: updaterId
						}
					});
					break;

				default:
					break;
			}

			return booking
		});
		const bookingDto: BookingDto = {
			...deletedBooking,
			status: deletedBooking.status as unknown as BookingStatus,
			paymentStatus: deletedBooking.paymentStatus as unknown as PaymentStatus,
			serviceType: deletedBooking.serviceType as unknown as ServiceType,
			source: deletedBooking.source as unknown as BookingSource
		};

		return bookingDto;

	}


	async cancel(id: string, updateBookingDto: UpdateBookingDto): Promise<BookingDto> {
		
		try {
			const cancelledBooking = await this.databaseService.$transaction(async (prisma) => {
				const booking = await this.databaseService.booking.update({
					where: { id },
					data: {
						canceledAt: new Date(),
						cancelledBy: updateBookingDto.cancelledBy,
						cancelationReason: updateBookingDto.cancellationReason
					}
				});
				await prisma.timeSlot.updateMany({
					where: { bookingId: booking.id}, // Replace bookingId with the actual ID
					data: {
						bookingId: null,
						isAvailable: true,
						previousBookings: { push: booking.id }  
					}, // Replace newTimeslot with the new value
				});

				return booking
			});
			// to do notification

			const bookingDto: BookingDto = {
				...cancelledBooking,
				status: cancelledBooking.status as unknown as BookingStatus,
				paymentStatus: cancelledBooking.paymentStatus as unknown as PaymentStatus,
				serviceType: cancelledBooking.serviceType as unknown as ServiceType,
				source: cancelledBooking.source as unknown as BookingSource
			};

			return bookingDto;
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
	}

	async reschedule(id: string, updateBookingDto: UpdateBookingDto): Promise<BookingDto> {

		try {
			const rescheduleBooking = await this.databaseService.$transaction(async (prisma) => {
				const timeslots = await this.databaseService.timeSlot.findMany({
					where: {
						bookingId: id
					}
				});
				const previousDatesArray = timeslots.map(slot =>`${slot.startTime.toISOString()} - ${slot.endTime.toISOString()}`);

				const freedTimeSlots = await prisma.timeSlot.updateMany({
					where: { bookingId: id },
					data: {
						bookingId: null,
						isAvailable: true,
						previousBookings: { push: id }
					}, 
				});

				const booking = await this.databaseService.booking.update({
					where: { id },
					data: {
						rescheduledAt: new Date(),
						rescheduledBy: updateBookingDto.rescheduledBy,
						previousDates: { push: previousDatesArray }  

					}
				});

				await prisma.timeSlot.updateMany({
					where: { id: { in: updateBookingDto.timeslotId } },
					data: {
						bookingId: booking.id,
						isAvailable: false
					}, 
				});

				return booking
			});
			// to do notification
			const bookingDto: BookingDto = {
				...rescheduleBooking,
				status: rescheduleBooking.status as unknown as BookingStatus,
				paymentStatus: rescheduleBooking.paymentStatus as unknown as PaymentStatus,
				serviceType: rescheduleBooking.serviceType as unknown as ServiceType,
				source: rescheduleBooking.source as unknown as BookingSource
			};

			return bookingDto;
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
	}

	async confirm(id: string, updateBookingDto: UpdateBookingDto): Promise<BookingDto> {

		try {
			const confirmedBooking = await this.databaseService.$transaction(async (prisma) => {
				const booking = await this.databaseService.booking.update({
					where: { id },
					data: {
						confirmedBy: updateBookingDto.confirmedBy,
						confirmedAt: new Date()
					}
				});

				return booking
			});

			// to do notification
			const bookingDto: BookingDto = {
				...confirmedBooking,
				status: confirmedBooking.status as unknown as BookingStatus,
				paymentStatus: confirmedBooking.paymentStatus as unknown as PaymentStatus,
				serviceType: confirmedBooking.serviceType as unknown as ServiceType,
				source: confirmedBooking.source as unknown as BookingSource
			};

			return bookingDto;
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
	}


	/**
	 * 
	 * Maps a raw event center from the database to EventCenterDto.
	 */
	private mapToBookingDto(booking: any): BookingDto {
		return {
			...booking,
			status: booking.status as unknown as BookingStatus,
			paymentStatus: booking.paymentStatus as unknown as PaymentStatus,
			serviceType: booking.serviceType as unknown as ServiceType,
			source: booking.source as unknown as BookingSource
		};
	}

	
}


@Injectable()
export class TimeSlotService {
	constructor(
		@Inject(NOTIFICATION_CLIENT) private readonly notificationClient: ClientProxy,
		@Inject(USER_CLIENT) private readonly userClient: ClientProxy,
		@Inject(EVENT_CENTER_CLIENT) private readonly eventClient: ClientProxy,
		@Inject(CATERING_CLIENT) private readonly cateringClient: ClientProxy,
		private readonly databaseService: DatabaseService
	) { }

	async create(createTimeslotDto: CreateManyTimeSlotDto): Promise<TimeslotDto[]> {

		/**
		 * Time slot generating could either be a manual or automatic process
		 * A service provider should make time slots for each service he owns, users book these time slots
		 * To generate an automatic time slots we need to know the start and end date, slot span
		 *  the start and end time daily from the service provider predefined working hours for each day, 
		 * the intervals of the slot and any exclusion of days
		 * 
		 * this means, a user can generate slot from 01/01/2025  to 31/12/2025, from 8am to 8pm, 4 hours long, 
		 * and interval of 2 hours and exclude mondays and thursdays every week as defined in their working hours 
		 * and and also an overlap. so wecould generate a single slot 4 times, depending on the business capacity
		 * 
		 * or he could manually provide the input for the slot to generate one slot at a time
		 * @see CreateTimeslotDto
		 * @see Prisma.TimeSlotCreateInput
		 * 
		*/
		try {
			const {
				serviceId, serviceType,
				slots, createdBy
			} = createTimeslotDto;

			let ServiceProvider: string;

			switch (createTimeslotDto.serviceType) {
				case $Enums.ServiceType.EVENTCENTER:
					const eventcenter = await firstValueFrom(this.eventClient.send<EventCenterDto, string>(EVENTCENTERPATTERN.FINDONEBYID, serviceId));
					if (!eventcenter) {
						throw new NotFoundException('Could not associate this timeslot with any event centers, ensure to select an event center');
					}
					ServiceProvider = eventcenter.serviceProviderId
					break;
				case $Enums.ServiceType.CATERING:
					const catering = await firstValueFrom(this.cateringClient.send<CateringDto, string>(CATERINGPATTERN.FINDONEBYID, serviceId));
					if (!catering) {
						throw new NotFoundException('Could not associate this timeslot with any event centers, ensure to select an event center');
					}
					ServiceProvider = catering.serviceProviderId
					break;
					break;
				default:
					break;
			}

			const newTimeSlotInput: Prisma.TimeSlotCreateManyInput[] = slots.map(slot => ({
				serviceId: serviceId,
				serviceType: serviceType as $Enums.ServiceType,
				startTime: slot.startTime,
				endTime: slot.endTime,
				createdBy: createdBy
			}));


			// Start a transaction - for an all or fail process
			const newTimeSlot = await this.databaseService.$transaction(async (prisma) => {

				const timeslot = await prisma.timeSlot.createMany({ data: newTimeSlotInput });

				return prisma.timeSlot.findMany({
					where: {
						serviceId: serviceId, // Adjust based on your unique identifier
					},
					orderBy: { startTime: 'asc' } // Optional: Order by start time
				});

			});


			//  notify service provider of timeslot
			const user = await firstValueFrom(this.userClient.send<UserDto, string>(USERPATTERN.FINDBYID, ServiceProvider));
			if (user) {
				this.notificationClient.emit(NOTIFICATIONPATTERN.FINDANDSEND, {
					type: 'EMAIL',
					recipientId: ServiceProvider,
					data: {
						subject: 'New Timeslot(s) created!',
						message: `New times slots has been created for a service you provide.`,
						recipientEmail: user.email,
					},
				});
			}


			return newTimeSlot;
		} catch (error) {
			console.log(error)
			throw new InternalServerErrorException(error, {
				cause: new Error(),
				description: 'time slot generation failed, please try again!'
			});
		}
	}


	async findAll(manyRequestTimeSlotDto: ManyRequestTimeSlotDto): Promise<ManyTimeslotDto> {

		const whereClause: any = { deletedAt: null, serviceId: manyRequestTimeSlotDto.serviceId };
		if (manyRequestTimeSlotDto.date) {
			const startOfDay = new Date(manyRequestTimeSlotDto.date);
			startOfDay.setUTCHours(0, 0, 0, 0); // Set time to 00:00:00.000 UTC

			const endOfDay = new Date(manyRequestTimeSlotDto.date);
			endOfDay.setUTCHours(23, 59, 59, 999); // Set time to 23:59:59.999 UTC

			whereClause.startTime = {
				gte: startOfDay,
				lte: endOfDay
			};
		}

		const result = await this.databaseService.$transaction(async (prisma) => {

			const timeslots = await prisma.timeSlot.findMany({
				where: whereClause,
				take: manyRequestTimeSlotDto.limit || 10,
				skip: manyRequestTimeSlotDto.offset || 0,
			});

			console.log("triggering a change")
			const count = await prisma.timeSlot.count({
				where: whereClause,
			});

			return { count, data: timeslots };
		});

		return { count: result.count, data: result.data };
	}


	async update(id: string, updateTimeslotDto: UpdateTimeslotDto): Promise<TimeslotDto> {
		try {

			const result = await this.databaseService.$transaction(async (prisma) => {

				const existingTimeSlot = await prisma.timeSlot.findUnique({
					where: { id },
					select: { previousBookings: true }
				});

				const updatedPreviousBookings = [
					...(existingTimeSlot?.previousBookings || []), // Keep existing IDs
					updateTimeslotDto.previousBookings // Add the new ID
				];

				const updateTimeSlotInput: Prisma.TimeSlotUpdateInput = {
					...TimeslotDto,
					previousBookings: updateTimeslotDto.previousBookings ? updatedPreviousBookings : existingTimeSlot?.previousBookings
				};

				const timeSlot = await this.databaseService.timeSlot.update({
					where: { id },
					data: updateTimeSlotInput
				});

				return timeSlot;
			});
			
			return result;
		} catch (error) {
			throw new ConflictException(error);
		}
	}

	async remove(id: string, updaterId: string): Promise<TimeslotDto> {
		const timeSlot = await this.databaseService.timeSlot.update({
			where: { id },
			data: {
				deletedAt: new Date(),
				deletedBy: updaterId
			}
		});

		// delete the associating service timeSlot
		return timeSlot;
	}


	




}