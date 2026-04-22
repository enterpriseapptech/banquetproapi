import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Req, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { BookingService, RequestQuoteService, TimeSlotService } from './booking.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BookingStatus, CreateBookingDto, CreateManyTimeSlotDto, CreateRequestQuoteDto, ManyRequestTimeSlotDto, ServiceType, UpdateBookingDto, UpdateRequestQuoteDto, UpdateTimeslotDto, } from '@shared/contracts/booking';
import { UserDto } from '@shared/contracts/users';
import { JwtAuthGuard } from '../jwt/jwt.guard';
import { VerificationGuard } from '../jwt/verification.guard';
import { firstValueFrom } from 'rxjs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from '../users/users.service';
import { EventCenterDto } from '@shared/contracts/eventcenters';
import { CateringDto } from '@shared/contracts/catering';
import { CateringService } from '../catering/catering.service';
import { EventcentersService } from '../eventcenters/eventcenters.service';
import { AppSettingService } from '../management/management.service';


export interface AuthenticatedRequest extends Request {
    user?: any; // Change `any` to your actual user type if known
}

@ApiTags('booking')
@Controller('booking')
export class BookingController {
    private readonly logger = new Logger(BookingController.name);
    constructor(private readonly bookingService: BookingService,
        private readonly cateringService: CateringService,
        private readonly eventcentersService: EventcentersService,
        private readonly userService: UsersService,
        private readonly appSettingService: AppSettingService,
    ) { }

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Post('v1')
    async createV1(@Body() createBookingDto: CreateBookingDto, @Req() req: AuthenticatedRequest) {
        try {
            const appSetting = await firstValueFrom(this.appSettingService.find());
            const serviceCharge = appSetting.serviceCharge
            let itemsTotal = 0;
            let Service: EventCenterDto | CateringDto;
            let actualAmountDue: number;
            const requestuser: UserDto = await firstValueFrom(req.user)
            createBookingDto.createdBy = requestuser.id
            createBookingDto.items.map((item) => { itemsTotal += item.amount })
            /**
             * createBookingDto.amount due contains service charge. deduct it so as to validate
             * 
             */
            const initialAmountDue = createBookingDto.amountDue
            createBookingDto.amountDue = createBookingDto.amountDue - createBookingDto.serviceCharge
            if (serviceCharge !== createBookingDto.serviceCharge) {
                throw new BadRequestException(`Error: Service charge is ${serviceCharge} not ${createBookingDto.serviceCharge}`, {
                    cause: new Error(),
                    description: 'Incorrect service charge amount applied'
                });
            } else if (!createBookingDto.items) {
                throw new BadRequestException('We could not validate your booking', {
                    cause: new Error(),
                    description: 'We could not validate your booking, as the items been paid for are not listed'
                });
            } else if (itemsTotal !== createBookingDto.subTotal) {
                throw new BadRequestException(`We could not generate invoice, sub-total amount is incorrect for the items. Should be ${itemsTotal}. 
                   `, {
                    cause: new Error(),
                    description: 'We could not generate invoice, sub-total amount is incorrect for the items'
                });
            }

            switch (createBookingDto.serviceType) {
                case ServiceType.EVENTCENTER:
                    Service = await firstValueFrom(this.eventcentersService.findOne(createBookingDto.serviceId));
                    if (!Service) {
                        throw new NotFoundException('event center not found for booking');

                    } else if (Service.status !== 'ACTIVE') {
                        throw new BadRequestException(`This service is inactive and can not accept booking`, {
                            cause: new Error(),
                            description: `This service is inactive and can not accept booking`
                        });

                    } else if (createBookingDto.noOfGuest > Service.sittingCapacity) {
                        throw new BadRequestException(`Your number of guest exceed the sitting capacity of this event center`, {
                            cause: new Error(),
                            description: `Your number of guest exceed the sitting capacity of this event center`
                        });

                    } else if (createBookingDto.createdBy !== Service.serviceProviderId) {
                        // logic for when a customer creates this booking
                        const totalSlotsPrice = Service.pricingPerSlot * createBookingDto.timeslotId.length
                        // use existing service discounted and preexisint pricing per slot
                        createBookingDto.discount = (
                                (Service.discountPercentage ?? 0) / 100
                            ) * (totalSlotsPrice)
                        // confirm that the items for booking match the pricing per slot and timeslot selected
                        if(totalSlotsPrice !== itemsTotal) {
                            throw new BadRequestException(`The selected event center and number of timeslot
                                 selected is not accurately reflected on items been paid for `, {
                            cause: new Error(),
                            description: `Items and timeslot do not match in length`
                        });
                        }
                        const totalBeforeServiceCharge =  totalSlotsPrice - createBookingDto.discount;   
                        createBookingDto.total = totalBeforeServiceCharge + serviceCharge;
                        actualAmountDue = (totalBeforeServiceCharge * (Service.depositPercentage / 100)) + serviceCharge;
                        
                    } else if (createBookingDto.createdBy === Service.serviceProviderId) {
                        // service provider might add other services outside the event center to their 
                        // items, we just trust then and validate the amount above = subtotal
                        // use existing service discounted and preexisint pricing per slot
                       
                        if(createBookingDto.discount === undefined){
                            createBookingDto.discount = createBookingDto.subTotal * (Service.discountPercentage ?? 0 / 100)
                        }
                        actualAmountDue = createBookingDto.amountDue + serviceCharge
                        
                        createBookingDto.total = (createBookingDto.subTotal - createBookingDto.discount) + serviceCharge;

                    }
                

                    // ensure invoice amount due isnt less than required amount or more than total
                    if (initialAmountDue < actualAmountDue  || initialAmountDue > createBookingDto.total) {
                        throw new BadRequestException(`Amount due can not be more than total amount or
                             less than the required for the service.
                             A discount of ${createBookingDto.discount} was applied and 
                             total is ${createBookingDto.total}`, {
                            cause: new Error(),
                            description: 'We could not generate invoice, your booking amount is not okay'
                        });
                    }
                    createBookingDto.amountDue = initialAmountDue
                    createBookingDto.serviceName = Service.name
                    break;
                case ServiceType.CATERING:
                    Service = await firstValueFrom(this.cateringService.findOne(createBookingDto.serviceId))
                    actualAmountDue = createBookingDto.amountDue + serviceCharge // service charge paid on the very first installment

                    if (!Service) {
                        throw new NotFoundException('Catering service not found for booking');

                    } else if (Service.status !== 'ACTIVE') {
                        throw new BadRequestException(`This service is inactive and can not accept booking`, {
                            cause: new Error(),
                            description: `This service is inactive and can not accept booking`
                        });

                    } else if (createBookingDto.createdBy !== Service.serviceProviderId) {
                        throw new BadRequestException(`Bookign error, Only requests for quotes are allowed for catering service`, {
                            cause: new Error(),
                            description: `Only requests for quotes are allowed for catering service`
                        });

                    } else if (createBookingDto.createdBy === Service.serviceProviderId) {

                        if (createBookingDto.discount === undefined) {
                            // apply existing service discount if service provider has not set up another type of discount
                            createBookingDto.discount = createBookingDto.subTotal * (Service.discountPercentage / 100) // converted to amount
                        } 

                        // discount from booking is in amount not percentage
                        createBookingDto.total = (createBookingDto.subTotal + serviceCharge) - (createBookingDto.discount);
                        actualAmountDue = (itemsTotal * (Service.depositPercentage / 100)) + serviceCharge;
                        createBookingDto.amountDue += serviceCharge
                        // add service charge back into amount due
                        if (createBookingDto.amountDue < actualAmountDue || createBookingDto.amountDue > createBookingDto.total) {
                            throw new BadRequestException(`Amount due can not be more than total amount or
                                 less than required amount the for service. A discount of ${createBookingDto.discount} 
                                 was applied and total is ${createBookingDto.total}, Amount due is ${actualAmountDue}`, {
                                cause: new Error(),
                                description: 'We could not generate invoice, your booking amount is not okay'
                            });

                        }
                    }
                    createBookingDto.serviceName = Service.name
                    break;
                default:
                    throw new NotFoundException('Invalid service been booked');
            }

            itemsTotal = itemsTotal + serviceCharge
            if ((itemsTotal - createBookingDto.discount) !== (createBookingDto.total )) {
                throw new BadRequestException(`We could not generate invoice, total amount is incorrect for the items. 
                    Should be ${itemsTotal - createBookingDto.discount}, a discount of ${createBookingDto.discount} and 
                    service charge of ${serviceCharge} was applied`, {
                    cause: new Error(),
                    description: 'We could not generate invoice, total amount is incorrect for the items'
                });

            } else if (createBookingDto.amountDue < actualAmountDue || createBookingDto.amountDue > createBookingDto.total) {
                throw new BadRequestException(`You can't pay less then ${actualAmountDue} or more than ${createBookingDto.total}. A discount of ${createBookingDto.discount} was applied and your total is ${createBookingDto.total}`, {
                    cause: new Error(),
                    description: 'We could not generate invoice, your booking amount is not okay'
                });

            }

            // validate customer and service provider account
            let accounts = await firstValueFrom(this.userService.findManyByUnique([{ id: createBookingDto.customerId }, { id: Service.serviceProviderId }]));
            accounts = Array.isArray(accounts) ? accounts : Object.values(accounts)
            const customer = accounts.find((user) => user.id === createBookingDto.customerId)
            const serviceProvider = accounts.find((user) => user.id !== createBookingDto.customerId)

            if (!customer) {
                throw new NotFoundException('We could not verify user account', {
                    cause: new Error(),
                    description: 'We could not verify user account'
                });

            } else if (customer.status !== "ACTIVE") {
                throw new NotFoundException('User account is restricted or deacitvated!', {
                    cause: new Error(),
                    description: 'User account is restricted or deacitvated!'
                });
            }

            if (!serviceProvider) {
                throw new NotFoundException('We could not verify this service Provider account', {
                    cause: new Error(),
                    description: 'We could not verify user account'
                });

            } else if (serviceProvider.status !== "ACTIVE") {
                throw new NotFoundException('Service Provider account is restricted or deacitvated!', {
                    cause: new Error(),
                    description: 'User account is restricted or deacitvated!'
                });
            }
            createBookingDto.items.push({item: "service charge", amount: serviceCharge})
            createBookingDto.subTotal += serviceCharge
            return this.bookingService.create({ ...createBookingDto, serviceCharge, customer, serviceProvider });
        } catch (error: any) {
            this.logger.log({
                    message: `Failed to Create booking in gateway service at ${new Date().toLocaleString()}`,
                    ...error
                })
            throw error
        }
    }

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Post()
    async create(@Body() createBookingDto: CreateBookingDto, @Req() req: AuthenticatedRequest) {
        try {
            // Parallel fetch — independent calls
            const [appSetting, requestUser] = await Promise.all([
                firstValueFrom(this.appSettingService.find()),
                firstValueFrom(req.user as any),
            ]);
            const serviceCharge: number = appSetting.serviceCharge;
            const authenticatedUserId: string = (requestUser as UserDto).id;

            // Guard: items must exist before any iteration
            if (!createBookingDto.items || createBookingDto.items.length === 0) {
                throw new BadRequestException('We could not validate your booking, as the items being paid for are not listed', {
                    cause: new Error(),
                    description: 'We could not validate your booking, as the items being paid for are not listed',
                });
            }

            // Compute raw items total (excludes service charge)
            const itemsTotal: number = createBookingDto.items.reduce((acc, item) => acc + item.amount, 0);

            // Guard: subTotal must match sum of items
            if (itemsTotal !== createBookingDto.subTotal) {
                throw new BadRequestException(
                    `We could not generate invoice, sub-total amount is incorrect for the items. Should be ${itemsTotal}.`,
                    { cause: new Error(), description: 'Sub-total mismatch with items' },
                );
            }

            // Guard: client-sent serviceCharge must match server value
            if (serviceCharge !== createBookingDto.serviceCharge) {
                throw new BadRequestException(
                    `Error: Service charge is ${serviceCharge} not ${createBookingDto.serviceCharge}`,
                    { cause: new Error(), description: 'Incorrect service charge applied' },
                );
            }

            // Capture amountDue once — never mutated again
            const clientAmountDue: number = createBookingDto.amountDue;

            let service: EventCenterDto | CateringDto;
            let computedDiscount: number;
            let computedTotal: number;
            let minimumAmountDue: number;

            switch (createBookingDto.serviceType) {

                case ServiceType.EVENTCENTER: {
                    service = await firstValueFrom(this.eventcentersService.findOne(createBookingDto.serviceId));

                    if (!service) {
                        throw new NotFoundException('Event center not found for booking');
                    }
                    if (service.status !== 'ACTIVE') {
                        throw new BadRequestException('This service is inactive and cannot accept bookings', {
                            cause: new Error(),
                            description: 'Inactive service',
                        });
                    }
                    if (createBookingDto.noOfGuest > (service as EventCenterDto).sittingCapacity) {
                        throw new BadRequestException(
                            'Your number of guests exceeds the sitting capacity of this event center',
                            { cause: new Error(), description: 'Capacity exceeded' },
                        );
                    }

                    const eventCenter = service as EventCenterDto;

                    if (authenticatedUserId !== eventCenter.serviceProviderId) {
                        // Customer path: pricing is fully server-derived from slot rate
                        const totalSlotsPrice = eventCenter.pricingPerSlot * createBookingDto.timeslotId.length;

                        if (totalSlotsPrice !== itemsTotal) {
                            throw new BadRequestException(
                                `The selected event center and number of timeslots are not accurately reflected in the items being paid for`,
                                { cause: new Error(), description: 'Items and timeslot pricing do not match' },
                            );
                        }

                        computedDiscount = ((eventCenter.discountPercentage ?? 0) / 100) * itemsTotal;

                    } else {
                        // Service provider path: items trusted, may bundle extras beyond the venue
                        computedDiscount = createBookingDto.discount !== undefined
                            ? createBookingDto.discount
                            : itemsTotal * ((eventCenter.discountPercentage ?? 0) / 100);
                    }

                    const afterDiscountEC = itemsTotal - computedDiscount;
                    computedTotal = afterDiscountEC + serviceCharge;
                    minimumAmountDue = (afterDiscountEC * (eventCenter.depositPercentage / 100)) + serviceCharge;
                    break;
                }

                case ServiceType.CATERING: {
                    service = await firstValueFrom(this.cateringService.findOne(createBookingDto.serviceId));

                    if (!service) {
                        throw new NotFoundException('Catering service not found for booking');
                    }
                    if (service.status !== 'ACTIVE') {
                        throw new BadRequestException('This service is inactive and cannot accept bookings', {
                            cause: new Error(),
                            description: 'Inactive service',
                        });
                    }
                    if (authenticatedUserId !== service.serviceProviderId) {
                        throw new BadRequestException(
                            'Booking error: only requests for quotes are allowed for catering services',
                            { cause: new Error(), description: 'Direct catering bookings restricted to service providers' },
                        );
                    }

                    const catering = service as CateringDto;
                    computedDiscount = createBookingDto.discount !== undefined
                        ? createBookingDto.discount
                        : itemsTotal * ((catering.discountPercentage ?? 0) / 100);

                    const afterDiscountCat = itemsTotal - computedDiscount;
                    computedTotal = afterDiscountCat + serviceCharge;
                    minimumAmountDue = (afterDiscountCat * (catering.depositPercentage / 100)) + serviceCharge;
                    break;
                }

                default:
                    throw new NotFoundException('Invalid service being booked');
            }

            // Range check: clientAmountDue must sit within [minimumAmountDue, computedTotal]
            if (clientAmountDue < minimumAmountDue || clientAmountDue > computedTotal) {
                throw new BadRequestException(
                    `You cannot pay less than ${minimumAmountDue} or more than ${computedTotal}. ` +
                    `A discount of ${computedDiscount} was applied; total is ${computedTotal}.`,
                    { cause: new Error(), description: 'Amount due is out of valid range' },
                );
            }

            // Validate customer and serviceProvider accounts
            let accounts = await firstValueFrom(
                this.userService.findManyByUnique([
                    { id: createBookingDto.customerId },
                    { id: service.serviceProviderId },
                ]),
            );
            accounts = Array.isArray(accounts) ? accounts : Object.values(accounts);

            const customer = accounts.find((user) => user.id === createBookingDto.customerId);
            const serviceProvider = accounts.find((user) => user.id === service.serviceProviderId);

            if (!customer) {
                throw new NotFoundException('We could not verify user account', {
                    cause: new Error(),
                    description: 'Customer not found',
                });
            }
            if (customer.status !== 'ACTIVE') {
                throw new BadRequestException('User account is restricted or deactivated!', {
                    cause: new Error(),
                    description: 'Inactive customer account',
                });
            }
            if (!serviceProvider) {
                throw new NotFoundException('We could not verify this service provider account', {
                    cause: new Error(),
                    description: 'Service provider not found',
                });
            }
            if (serviceProvider.status !== 'ACTIVE') {
                throw new BadRequestException('Service provider account is restricted or deactivated!', {
                    cause: new Error(),
                    description: 'Inactive service provider account',
                });
            }

            // Build dispatch DTO — no mutation of createBookingDto
            const dispatchDto: CreateBookingDto = {
                ...createBookingDto,
                createdBy: authenticatedUserId,
                serviceName: service.name,
                items: [...createBookingDto.items, { item: 'service charge', amount: serviceCharge }],
                subTotal: itemsTotal + serviceCharge,
                discount: computedDiscount,
                total: computedTotal,
                amountDue: clientAmountDue,
                customer,
                serviceProvider,
            };

            return this.bookingService.create(dispatchDto);

        } catch (error: any) {
            this.logger.error({
                message: `Failed to create booking in gateway service at ${new Date().toLocaleString()}`,
                ...error,
            });
            throw error;
        }
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.bookingService.findOne(id);
    }

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Get()
    findAll(
        @Query('limit') limit: number,
        @Query('offset') offset: number,
        @Query('customerId') customerId: string,
        @Query('serviceId') serviceId: string,
        @Query('serviceProvider') serviceProvider: string,
        @Query('startDate') startDate: Date,
        @Query('endDate') endDate: Date
    ) {
        return this.bookingService.findAll(limit, offset, customerId, serviceId, serviceProvider, startDate, endDate);
    }

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
        const booking =  this.bookingService.update(id, updateBookingDto);
        // if (updateBookingDto.status) {
        //     switch (updateBookingDto.status) {
        //         case BookingStatus.CONFIRMED:
        //             // notify users
        //             // send notification to customer and service provider
        //             this.notificationClient.emit(NOTIFICATIONPATTERN.SEND, {
        //                 type: 'EMAIL',
        //                 recipientId: customer.id,
        //                 data: {
        //                     subject: "Payment Invoice",
        //                     message: `We received your payment`,
        //                     recipientEmail: customer.email,
        //                 },
        //             });
        //             break;
        //         case BookingStatus.RESERVED:
        //             // handle reserved status
        //             break;
        //         case BookingStatus.POSTPONED:
        //             // handle postponed status
        //             break;
        //         case BookingStatus.CANCELED:
        //             // handle canceled status
        //             break;

        //         default:
        //             break;
        //     }
        // }
        return booking
    }

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Delete(':id')
    async remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
        const user: UserDto = await firstValueFrom(req.user)
        return this.bookingService.remove(id, user.id);
    }

}

@ApiTags('requestQuote')
@Controller('requestQuote')
export class RequestQuoteController {
    constructor(private readonly requestQuoteService: RequestQuoteService,
        private readonly cateringService: CateringService,
        private readonly eventcentersService: EventcentersService,
        private readonly userService: UsersService
    ) { }

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Post()
    async create(@Body() createRequestQuoteDto: CreateRequestQuoteDto) {
        try {
            let Service: EventCenterDto | CateringDto;

            switch (createRequestQuoteDto.serviceType) {
                case ServiceType.EVENTCENTER:
                    Service = await firstValueFrom(this.eventcentersService.findOne(createRequestQuoteDto.serviceId));
                    if (!Service) {
                        throw new NotFoundException('event center not found for booking');

                    } else if (Service.status !== 'ACTIVE') {
                        throw new BadRequestException(`This service is inactive and can not accept booking`, {
                            cause: new Error(),
                            description: `This service is inactive and can not accept booking`
                        });

                    }
                    createRequestQuoteDto.serviceName = Service.name
                    break;
                case ServiceType.CATERING:
                    Service = await firstValueFrom(this.cateringService.findOne(createRequestQuoteDto.serviceId))


                    if (!Service) {
                        throw new NotFoundException('Catering service not found for booking');

                    } else if (Service.status !== 'ACTIVE') {
                        throw new BadRequestException(`This service is inactive and can not accept booking`, {
                            cause: new Error(),
                            description: `This service is inactive and can not accept booking`
                        });

                    }
                    createRequestQuoteDto.serviceName = Service.name
                    break;
                default:
                    throw new NotFoundException('Invalid service been booked');
            }


            // validate customer and service provider account
            let accounts = await firstValueFrom(this.userService.findManyByUnique([{ id: createRequestQuoteDto.customerId }, { id: Service.serviceProviderId }]));
            accounts = Array.isArray(accounts) ? accounts : Object.values(accounts)
            const customer = accounts.find((user) => user.id === createRequestQuoteDto.customerId)
            const serviceProvider = accounts.find((user) => user.id !== createRequestQuoteDto.customerId)
            createRequestQuoteDto.customer = customer;
            createRequestQuoteDto.serviceProvider = serviceProvider
            if (!customer) {
                throw new NotFoundException('We could not verify user account', {
                    cause: new Error(),
                    description: 'We could not verify user account'
                });

            } else if (customer.status !== "ACTIVE") {
                throw new NotFoundException('User account is restricted or deacitvated!', {
                    cause: new Error(),
                    description: 'User account is restricted or deacitvated!'
                });
            }

            if (!serviceProvider) {
                throw new NotFoundException('We could not verify this service Provider account', {
                    cause: new Error(),
                    description: 'We could not verify user account'
                });

            } else if (serviceProvider.status !== "ACTIVE") {
                throw new NotFoundException('Service Provider account is restricted or deacitvated!', {
                    cause: new Error(),
                    description: 'User account is restricted or deacitvated!'
                });
            }

            return this.requestQuoteService.create(createRequestQuoteDto);
        } catch (error) {
            console.log({ error })
            throw error
        }
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.requestQuoteService.findOne(id);
    }

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Get()
    findAll(
        @Query('limit') limit: number,
        @Query('offset') offset: number,
        @Query('customerId') customerId: string,
        @Query('serviceId') serviceId: string,
        @Query('serviceProvider') serviceProvider: string,
        @Query('startDate') startDate: Date,
        @Query('endDate') endDate: Date
    ) {
        return this.requestQuoteService.findAll(limit, offset, customerId, serviceId, serviceProvider, startDate, endDate);
    }

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateRequestQuoteDto: UpdateRequestQuoteDto) {
        return this.requestQuoteService.update(id, updateRequestQuoteDto);
    }

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Delete(':id')
    async remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
        const user: UserDto = await firstValueFrom(req.user)
        return this.requestQuoteService.remove(id, user.id);
    }

}
@ApiTags('timeslot')
@Controller('timeslot')
export class TimeSlotController {
    constructor(private readonly timeslotService: TimeSlotService) { }

    /**
     * 
     * Time slot controller routes
     * 
     * 
     * @see CreateManyTimeSlotDto
     * @param createTimeSlotDto 
     * @returns TimeSlotDto
     * 
     * 
     */


    @ApiOperation({ summary: 'Create timeslot' })
    @ApiResponse({ status: 201, description: 'Success' })
    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Post()
    create(@Body() createTimeSlotDto: CreateManyTimeSlotDto) {
        return this.timeslotService.create(createTimeSlotDto);
    }

    @ApiOperation({ summary: 'Get one timeslot' })
    @ApiResponse({ status: 200, description: 'Success' })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.timeslotService.findOne(id);
    }

    @ApiOperation({ summary: 'Get All timeslot' })
    @ApiResponse({ status: 200, description: 'Success' })
    @Get()
    findAllTimeSlot(@Query() query: ManyRequestTimeSlotDto) {
        const { limit, offset, serviceId, date } = query;
        return this.timeslotService.findAll(limit, offset, serviceId, date);
    }

    @ApiOperation({ summary: 'Update timeslot' })
    @ApiResponse({ status: 201, description: 'Success' })
    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Patch(':id')
    updateTimeSlot(@Param('id') id: string, @Body() updateTimeslotDto: UpdateTimeslotDto) {
        return this.timeslotService.updateTimeSlot(id, updateTimeslotDto);
    }

    @ApiOperation({ summary: 'Delete timeslot' })
    @ApiResponse({ status: 201, description: 'Success' })
    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Delete(':id')
    async removeTimeSlot(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
        const user: UserDto = await firstValueFrom(req.user)
        return this.timeslotService.removeTimeSlot(id, user.id);
    }
}