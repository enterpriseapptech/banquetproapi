/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConflictException, Inject, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { $Enums as $EventBookingEnums, Prisma as EventBookingPrisma } from '@prisma/eventcenters';
import { $Enums , Prisma } from '@prisma/booking';
import { CreateBookingDto, BookingDto, EVENTCENTERBOOKINGPATTERN, NOTIFICATIONPATTERN, EventCenterDto, UserDto, USERPATTERN, ManyEventCentersDto, UpdateEventCenterDto, SearchServiceProviderDto, CreateEventCenterBookingDto, EventCenterBookingDto } from '@shared/contracts';
import { DatabaseService } from '../database/database.service';
import { EVENT_CENTER_CLIENT, NOTIFICATION_CLIENT, USER_CLIENT } from './constants';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
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
			customer_id: createBookingDto.customer_id,
			serviceType: createBookingDto.serviceType as $Enums.ServiceType,
			totalBeforeDiscount: createBookingDto.totalBeforeDiscount,
			discount: createBookingDto.discount ,
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
		const customer = await firstValueFrom(this.userClient.send<UserDto, string>(USERPATTERN.FINDUSERBYID, newBookingInput.customer_id));

		if (!customer) {
			throw new NotFoundException("could not verify user account")
		}

		if (customer?.status !== "ACTIVE") {
			throw new UnauthorizedException("You can't nbook a service when account is restricted or deacitvated!")
		}

		try {
			// Start a transaction - for an all or fail process
			const newBooking = await this.databaseService.$transaction(async (prisma) => {
				const Booking = await prisma.booking.create({ data: newBookingInput });
				return Booking;
			});

			const createEventcenterDto: CreateEventCenterBookingDto = {
				eventcenter_id: createBookingDto.eventCenter_id,
				booking_id: newBooking.id,
				eventName: createBookingDto.eventName,
				eventTheme: createBookingDto.eventTheme,
				eventType: createBookingDto.eventType,
				description: createBookingDto.description,
				noOfGuest: createBookingDto.noOfGuest,
				specialRequirements: createBookingDto.specialRequirements as $EventBookingEnums.SpecialRequirement[],
				
			}
			
			switch (newBooking.serviceType) {
				case 'EVENTCENTER':
					const eventcenterbooking = await this.eventClient.send<EventCenterBookingDto, CreateEventCenterBookingDto>(EVENTCENTERBOOKINGPATTERN.CREATE, createEventcenterDto)
					if (!eventcenterbooking) {
						await this.databaseService.$transaction(async (prisma) => {
							await prisma.booking.delete({
								where: { id: newBooking.id }
							});
							
							throw new InternalServerErrorException('deleting booking because eventbooking failed to persist into db');
						});
					}
					(newBooking as BookingDto).eventCenterBooking = await firstValueFrom(eventcenterbooking);
					break;
			
				default:
					break;
			}
			
			//  notify service provider of booking
			this.notificationClient.emit(NOTIFICATIONPATTERN.SENDNOTIFICATION, {
				type: 'EMAIL',
				recipientId: newBooking.customer_id,
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
}
