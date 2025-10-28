/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, ConflictException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { $Enums, Prisma } from '../prisma/@prisma/booking';
import { CreateBookingDto, BookingDto, ManyBookingDto, TimeslotDto, CreateManyTimeSlotDto, ManyTimeslotDto,
	 ManyRequestTimeSlotDto, UpdateTimeslotDto, UpdateBookingDto, ServiceType, BookingStatus, 
	 BookingSource, CreateRequestQuoteDto, RequestQuoteDto, UpdateRequestQuoteDto, 
	 InvoiceStatus} from '@shared/contracts/booking';
import { EventCenterDto, EVENTCENTERPATTERN, } from '@shared/contracts/eventcenters';
import { UniqueIdentifierDto, UserDto, USERPATTERN, } from '@shared/contracts/users';
import { DatabaseService } from '../database/database.service';
import { NOTIFICATIONPATTERN } from '@shared/contracts/notifications';
import { EVENT_CENTER_CLIENT, NOTIFICATION_CLIENT, USER_CLIENT, CATERING_CLIENT, PAYMENT_CLIENT } from '@shared/contracts';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CateringDto, CATERINGPATTERN} from '@shared/contracts/catering';
import { BillingAddress, CreateInvoiceDto, InvoiceDto, InvoiceItem, INVOICEPATTERN , InvoiceStatus as PaymentInvoiceStatus} from '@shared/contracts/payments';
import { instanceToPlain } from 'class-transformer';
import {v4 as uuidv4 } from 'uuid'
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class BookingService {
	constructor(
		@Inject(NOTIFICATION_CLIENT) private readonly notificationClient: ClientProxy,
		@Inject(USER_CLIENT) private readonly userClient: ClientProxy,
		@Inject(EVENT_CENTER_CLIENT) private readonly eventClient: ClientProxy,
		@Inject(PAYMENT_CLIENT) private readonly paymentClient: ClientProxy,
		@Inject(CATERING_CLIENT) private readonly cateringClient: ClientProxy,
		private readonly databaseService: DatabaseService
	) { }

	async create(createBookingDto: CreateBookingDto): Promise<InvoiceDto> {
		try {
			let notificationSubject: string;
			const bookingId = uuidv4();
			const newBookingInput: Prisma.BookingCreateInput = {
				id: bookingId,
				customerId: createBookingDto.customerId,
				serviceProvider: createBookingDto.serviceProvider.id,
				requestQuote: createBookingDto.requestQuoteId 
				? { connect: { id: createBookingDto.requestQuoteId } }
				: undefined,
				serviceId: createBookingDto.serviceId,
				serviceType: createBookingDto.serviceType as $Enums.ServiceType,
				subTotal: createBookingDto.subTotal,
				discount: createBookingDto.discount,
				total: createBookingDto.total,
				isTermsAccepted: createBookingDto.isTermsAccepted,
				isCancellationPolicyAccepted: createBookingDto.isCancellationPolicyAccepted,
				isLiabilityWaiverSigned: createBookingDto.isLiabilityWaiverSigned,
				bookingReference: Math.random().toString(16).substring(2, 8),
				source: createBookingDto.source as $Enums.BookingSource,
				paymentStatus: $Enums.InvoiceStatus.GENERATED,
				status: $Enums.BookingStatus.PENDING,
				serviceNotes: createBookingDto.serviceNotes,
				customerNotes: createBookingDto.customerNotes,
				createdBy: createBookingDto.createdBy,
				requestedTimeSlots: {
					connect: createBookingDto.timeslotId.map((singleId) => {return {id: singleId}})
				},
				eventCenterBooking: createBookingDto.serviceType === $Enums.ServiceType.EVENTCENTER 
				? 	{
						create: {
							eventcenterId: createBookingDto.serviceId,
							eventName: createBookingDto.eventName,
							eventTheme: createBookingDto.eventTheme,
							eventType: createBookingDto.eventType,
							description: createBookingDto.description,
							noOfGuest: createBookingDto.noOfGuest,
							specialRequirements: createBookingDto.specialRequirements as $Enums.SpecialRequirement[],
						
						}
					} 
				: undefined,
				cateringBooking: createBookingDto.serviceType === $Enums.ServiceType.CATERING ? {
					create: {
						cateringId: createBookingDto.serviceId,
						eventName: createBookingDto.eventName,
						cuisine: createBookingDto.cuisine,
						dishTypes: createBookingDto.dishTypes, 
						eventType: createBookingDto.eventType,
						description: createBookingDto.description,
						noOfGuest: createBookingDto.noOfGuest,
						specialRequirements: createBookingDto.specialRequirements as $Enums.SpecialRequirement[],
					}
				}: undefined
			}

			const createInvoice: CreateInvoiceDto = {
				userId: createBookingDto.customerId,
				bookingId,
				items: createBookingDto.items,
				subTotal: createBookingDto.subTotal,
				discount: createBookingDto.discount,
				amountDue: createBookingDto.amountDue,
				total: createBookingDto.total,
				currency: createBookingDto.currency,
				note: createBookingDto.serviceNotes,
				billingAddress: createBookingDto.billingAddress,
				dueDate: createBookingDto.dueDate,
			}

			const invoice = await firstValueFrom(this.paymentClient.send<InvoiceDto, CreateInvoiceDto>(INVOICEPATTERN.BOOKINGGENERATE, createInvoice))
			if (!invoice) {
				throw new InternalServerErrorException('Invoice error', {
					cause: new Error(),
					description: 'Invoice generation Error: we couldnt automatically generate your invoice, kindly contact admin'
				});
			}
			newBookingInput.invoice  = [invoice.id]
			const newBooking = await await this.databaseService.booking.create({ data: newBookingInput });

			//  notify service provider of booking
			if ($Enums.ServiceType.EVENTCENTER) {
				notificationSubject = "A customer just booked your Event Center";
			} else if ($Enums.ServiceType.CATERING) {
				notificationSubject = "A customer just booked your catering service";
			}

			this.notificationClient.emit(NOTIFICATIONPATTERN.SEND, {
				type: 'EMAIL',
				recipientId: newBooking.customerId,
				data: {
					subject: notificationSubject,
					message: `A customer just booked your service, view details and confirm booking`,
					recipientEmail: createBookingDto.customer.email,
				},
			});

			return {
				...invoice,
				bookingId: newBooking.id,
				items: invoice.items as InvoiceItem[],
				billingAddress: invoice.billingAddress as BillingAddress,
				subTotal: Number(newBooking.subTotal),
				discount: Number(newBooking.discount),
				total: Number(newBooking.total),
				amountDue: Number(invoice.amountDue),
				status: invoice.status as unknown as PaymentInvoiceStatus,
			};

		} catch (error) {
			console.log(error)
			throw error
		}
	}


	async findAll(
		limit: number,
		offset: number,
		serviceType?: string,
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
		if (serviceType) whereClause.serviceType = serviceType;
		if (serviceProvider) whereClause.serviceProvider = serviceProvider;

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
			},
			include: {
				requestedTimeSlots: true,
				confirmedTimeSlots: true,
				eventCenterBooking: true,
				cateringBooking: true,
				requestQuote: true
			}
		});
		if (!booking) {
			throw new NotFoundException("Event center not found or has been deleted")
		}
		const bookingDto: BookingDto = {
			...booking,
			subTotal: Number(booking.subTotal),
			discount: Number(booking.discount),
			total: Number(booking.total),
			status: booking.status as unknown as BookingStatus,
			paymentStatus: booking.paymentStatus as unknown as InvoiceStatus,
			serviceType: booking.serviceType as unknown as ServiceType,
			source: booking.source as unknown as BookingSource
		};

		return bookingDto;

	}


	// async update(id: string, updateBookingDto: UpdateBookingDto): Promise<BookingDto> {
	// 	try {
	// 		const updateEventCenterInput: Prisma.BookingUpdateInput = {
	// 			...updateBookingDto,
	// 			paymentStatus: updateBookingDto.paymentStatus ? updateBookingDto.paymentStatus as $Enums.InvoiceStatus : undefined,
	// 			status: updateBookingDto.status ? updateBookingDto.status as $Enums.BookingStatus : undefined,
	// 			source: updateBookingDto.source ? updateBookingDto.source as $Enums.BookingSource : undefined,
	// 		};
	// 		const booking = await this.databaseService.booking.update({
	// 			where: { id },
	// 			data: updateEventCenterInput
	// 		});

	// 		const bookingDto: BookingDto = {
	// 			...booking,
	// 			subTotal: Number(booking.subTotal),
	// 			discount: Number(booking.discount),
	// 			total: Number(booking.total),
	// 			status: booking.status as unknown as BookingStatus,
	// 			paymentStatus: booking.paymentStatus as unknown as InvoiceStatus,
	// 			serviceType: booking.serviceType as unknown as ServiceType,
	// 			source: booking.source as unknown as BookingSource
	// 		};

	// 		return bookingDto;
	// 	} catch (error) {
	// 		throw new ConflictException(error);
	// 	}
	// }

	 
	
	async updatePayment(id: string, amountPaid: Decimal): Promise<BookingDto> {
		try {
			
			const booking = await this.databaseService.booking.findUnique({
				where: { id },
			});
			let paymentStatus: $Enums.InvoiceStatus
			if(amountPaid > booking.total || amountPaid == booking.total){
			   paymentStatus = $Enums.InvoiceStatus.PAID

			}else{
				paymentStatus = $Enums.InvoiceStatus.PARTIALLY_PAID
			}
			const updatedBooking = await this.databaseService.booking.update({
				where: { id }, data: { paymentStatus }
			});

			const bookingDto: BookingDto = {
				...updatedBooking,
				subTotal: Number(booking.subTotal),
				discount: Number(booking.discount),
				total: Number(booking.total),
				status: booking.status as unknown as BookingStatus,
				paymentStatus: booking.paymentStatus as unknown as InvoiceStatus,
				serviceType: booking.serviceType as unknown as ServiceType,
				source: booking.source as unknown as BookingSource
			};

						// validate customer account
			const accounts = await firstValueFrom(this.userClient.send<UserDto[], UniqueIdentifierDto[]>(USERPATTERN.FINDMANYBYUNIQUEIDENTIFIER, [{id: booking.customerId}, {id: booking.serviceProvider}]));

			const customer = accounts.find((user) => user.id === booking.customerId)
			const serviceProvider = accounts.find((user) => user.id !== booking.customerId)

			if (!customer) {
				// fail silently
			}else{
				// send notification to customer and service provider
				this.notificationClient.emit(NOTIFICATIONPATTERN.SEND, {
					type: 'EMAIL',
					recipientId: customer.id,
					data: {
						subject: "Payment Invoice",
						message: `We received your payment`,
						recipientEmail: customer.email,
					},
				});
			}

			if (!serviceProvider || serviceProvider.status !== "ACTIVE") {
				// fail silently
			}else {
				// send notification to customer and service provider
				this.notificationClient.emit(NOTIFICATIONPATTERN.SEND, {
					type: 'EMAIL',
					recipientId: customer.id,
					data: {
						subject: "Payment Invoice",
						message: `We received your payment`,
						recipientEmail: customer.email,
					},
				});
			}
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
			subTotal: Number(deletedBooking.subTotal),
			discount: Number(deletedBooking.discount),
			total: Number(deletedBooking.total),
			status: deletedBooking.status as unknown as BookingStatus,
			paymentStatus: deletedBooking.paymentStatus as unknown as InvoiceStatus,
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
			
			const bookingDto: BookingDto = {
				...cancelledBooking,
				subTotal: Number(cancelledBooking.subTotal),
				discount: Number(cancelledBooking.discount),
				total: Number(cancelledBooking.total),
				status: cancelledBooking.status as unknown as BookingStatus,
				paymentStatus: cancelledBooking.paymentStatus as unknown as InvoiceStatus,
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
				subTotal: Number(rescheduleBooking.subTotal),
				discount: Number(rescheduleBooking.discount),
				total: Number(rescheduleBooking.total),
				status: rescheduleBooking.status as unknown as BookingStatus,
				paymentStatus: rescheduleBooking.paymentStatus as unknown as InvoiceStatus,
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
				subTotal: Number(confirmedBooking.subTotal),
				discount: Number(confirmedBooking.discount),
				total: Number(confirmedBooking.total),
				status: confirmedBooking.status as unknown as BookingStatus,
				paymentStatus: confirmedBooking.paymentStatus as unknown as InvoiceStatus,
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
			subTotal: Number(booking.subTotal),
			discount: Number(booking.discount),
			total: Number(booking.total),
			status: booking.status as unknown as BookingStatus,
			paymentStatus: booking.paymentStatus as unknown as InvoiceStatus,
			serviceType: booking.serviceType as unknown as ServiceType,
			source: booking.source as unknown as BookingSource
		};
	}

	
}

@Injectable()
export class RequestQuoteService {
	constructor(
		@Inject(NOTIFICATION_CLIENT) private readonly notificationClient: ClientProxy,
		@Inject(USER_CLIENT) private readonly userClient: ClientProxy,
		@Inject(EVENT_CENTER_CLIENT) private readonly eventClient: ClientProxy,
		@Inject(CATERING_CLIENT) private readonly cateringClient: ClientProxy,
		private readonly databaseService: DatabaseService
	) { }

	async create(createRequestQuoteDto: CreateRequestQuoteDto): Promise<RequestQuoteDto> {
		try {
			let notificationSubject: string;
			console.log({createRequestQuoteDto})
			const newRequestQuoteInput: Prisma.RequestQuoteCreateInput = {
				customerId: createRequestQuoteDto.customerId,
				serviceId: createRequestQuoteDto.serviceId,
				serviceType: createRequestQuoteDto.serviceType as $Enums.ServiceType,
				serviceProvider: createRequestQuoteDto.serviceProvider.id,
				budget: createRequestQuoteDto.budget,
				isTermsAccepted: createRequestQuoteDto.isTermsAccepted,
				isCancellationPolicyAccepted: createRequestQuoteDto.isCancellationPolicyAccepted,
				isLiabilityWaiverSigned: createRequestQuoteDto.isLiabilityWaiverSigned,
				quoteReference: Math.random().toString(16).substring(2, 8),
				source: createRequestQuoteDto.source as $Enums.BookingSource,
				status: $Enums.InvoiceStatus.GENERATED,
				customerNotes: createRequestQuoteDto.customerNotes,
				requestedTimeSlots: {
					connect: createRequestQuoteDto.timeslotId.map((singleId) => {return {id: singleId}})
				},
				billingDetails: instanceToPlain(createRequestQuoteDto.billingAddress)
			}

			if ($Enums.ServiceType.EVENTCENTER) {
				notificationSubject = "A customer just booked your Event Center";
			} else if ($Enums.ServiceType.CATERING) {
				notificationSubject = "A customer just booked your catering service";
			}
			
			const newQuote = await await this.databaseService.requestQuote.create({ data: newRequestQuoteInput });

			//  notify service provider of booking
			this.notificationClient.emit(NOTIFICATIONPATTERN.SEND, {
				type: 'EMAIL',
				recipientId: createRequestQuoteDto.serviceProvider.id,
				data: {
					subject: notificationSubject,
					message: `A customer just booked your service, view details and confirm booking`,
					recipientEmail: createRequestQuoteDto.serviceProvider.email,
				},
			});
			return {
				...newQuote,
				serviceType: newQuote.serviceType as unknown as ServiceType,
				billingAddress: instanceToPlain(newQuote.billingDetails) as BillingAddress,
				source: newQuote.source as unknown as BookingSource,
				status: newQuote.status as unknown as InvoiceStatus,
			};
		} catch (error) {
			console.log(error)
			throw error
		}
	}


	async findAll(
		limit: number,
		offset: number,
		serviceType?: string,
		serviceId?: string,
		serviceProvider?: string,
		quoteReference?: string,
		startDate?: Date,
		endDate?: Date
	): Promise<any> {
		const whereClause: any = { deletedAt: null };

		if (startDate) whereClause.createdAt = { gte: startDate };
		if (endDate) whereClause.createdAt = { lte: endDate };
		if (quoteReference) whereClause.quoteReference = quoteReference;
		if (serviceId) whereClause.serviceId = serviceId;
		if (serviceType) whereClause.serviceType = serviceType;
		if (serviceProvider) whereClause.serviceProvider =  serviceProvider

		const requestQuotes = await this.databaseService.requestQuote.findMany({
			where: whereClause,
			take: limit,
			skip: offset,
		});

		const count = await this.databaseService.requestQuote.count({ where: whereClause });

		return { count, data: requestQuotes.map(requestQuote => this.mapToBookingDto(requestQuote)) };
	}

	
	async findOne(id: string): Promise<RequestQuoteDto> {

		const booking = await this.databaseService.requestQuote.findUnique({
			where: {
				id: id,
				deletedAt: null
			},
			include: {
				requestedTimeSlots: true,
				booking: true,

			}
		});
		if (!booking) {
			throw new NotFoundException("Request for quote not found or has been deleted")
		}
		const bookingDto: RequestQuoteDto = {
			...booking,
			status: booking.status as unknown as InvoiceStatus,
			serviceType: booking.serviceType as unknown as ServiceType,
			source: booking.source as unknown as BookingSource,
		};

		return bookingDto;

	}


	async update(id: string, updateRequestQuoteDto: UpdateRequestQuoteDto): Promise<RequestQuoteDto> {
		try {
			const updateRequestQuoteInput: Prisma.RequestQuoteUpdateInput = {
				...updateRequestQuoteDto,
				status: updateRequestQuoteDto.status ? updateRequestQuoteDto.status as $Enums.InvoiceStatus : undefined,
			};

			const booking = await this.databaseService.requestQuote.update({
				where: { id },
				data: updateRequestQuoteInput
			});

			const bookingDto: RequestQuoteDto = {
				...booking,
				status: booking.status as unknown as InvoiceStatus,
				billingAddress: booking.billingDetails as unknown as BillingAddress,
				serviceType: booking.serviceType as unknown as ServiceType,
				source: booking.source as unknown as BookingSource
			};

			return bookingDto;
		} catch (error) {
			throw new ConflictException(error);
		}
	}

	async remove(id: string, updaterId: string): Promise<RequestQuoteDto> {

		const deletedBooking = await this.databaseService.$transaction(async (prisma) => {
			const booking = await this.databaseService.requestQuote.update({
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
		const requestQuote: RequestQuoteDto = {
			...deletedBooking,
			status: deletedBooking.status as unknown as InvoiceStatus,
			serviceType: deletedBooking.serviceType as unknown as ServiceType,
			source: deletedBooking.source as unknown as BookingSource,
			billingAddress: deletedBooking.billingDetails as unknown as BillingAddress,
		};

		return requestQuote;

	}

	/**
	 * 
	 * Maps a raw event center from the database to EventCenterDto.
	 */
	private mapToBookingDto(booking: any): BookingDto {
		return {
			...booking,
			subTotal: Number(booking.subTotal),
			discount: Number(booking.discount),
			total: Number(booking.total),
			status: booking.status as unknown as BookingStatus,
			paymentStatus: booking.paymentStatus as unknown as InvoiceStatus,
			serviceType: booking.serviceType as unknown as ServiceType,
			source: booking.source as unknown as BookingSource,
			billingAddress: booking.billingDetails as unknown as BillingAddress,
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