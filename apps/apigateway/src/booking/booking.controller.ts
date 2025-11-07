import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Req, NotFoundException, BadRequestException } from '@nestjs/common';
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


export interface AuthenticatedRequest extends Request {
    user?: any; // Change `any` to your actual user type if known
}

@ApiTags('booking')
@Controller('booking')
export class BookingController {
    constructor(private readonly bookingService: BookingService,
        private readonly cateringService: CateringService,
        private readonly eventcentersService: EventcentersService,
        private readonly userService: UsersService
    ) { }

    @UseGuards(JwtAuthGuard, VerificationGuard)
    @Post()
    async create(@Body() createBookingDto: CreateBookingDto, @Req() req: AuthenticatedRequest) {
        try {
            let itemsTotal = 0;
            let Service: EventCenterDto | CateringDto;
            let actualAmountDue: number;
            const requestuser: UserDto = await firstValueFrom(req.user)
            createBookingDto.createdBy = requestuser.id
            createBookingDto.items.map((item) => { itemsTotal += item.amount })
            if (!createBookingDto.items) {
                throw new BadRequestException('We could not validate your booking', {
                    cause: new Error(),
                    description: 'We could not validate your booking, as the items been paid for are not listed'
                });
            } else if (itemsTotal !== createBookingDto.subTotal) {
                throw new BadRequestException(`We could not generate invoice, sub-total amount is incorrect for the items. Should be ${itemsTotal}`, {
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
                        throw new BadRequestException(`Sitting capacity error`, {
                            cause: new Error(),
                            description: `Your number of guest exceed the sitting capacity of this event center`
                        });

                    }
                    else if (createBookingDto.createdBy !== Service.serviceProviderId) {
                        createBookingDto.discount = ((Service.depositPercentage ?? 0) / 100) * (Service.pricingPerSlot * createBookingDto.timeslotId.length)
                        createBookingDto.total = (Service.pricingPerSlot * createBookingDto.timeslotId.length) - createBookingDto.discount;
                        actualAmountDue = createBookingDto.total * (Service.depositPercentage / 100)
                    } else if (createBookingDto.createdBy === Service.serviceProviderId && createBookingDto.discount === undefined) {
                        createBookingDto.discount = createBookingDto.subTotal * (Service.discountPercentage / 100)
                        actualAmountDue = createBookingDto.amountDue
                        createBookingDto.total = createBookingDto.subTotal - createBookingDto.discount;
                    }
                    if (createBookingDto.amountDue > createBookingDto.total) {
                        throw new BadRequestException(`Amount due can not be more than total amount for service. A discount of ${createBookingDto.discount} was applied and total is ${createBookingDto.total}`, {
                            cause: new Error(),
                            description: 'We could not generate invoice, your booking amount is not okay'
                        });

                    }
                    createBookingDto.serviceName = Service.name
                    break;
                case ServiceType.CATERING:
                    Service = await firstValueFrom(this.cateringService.findOne(createBookingDto.serviceId))
                    actualAmountDue = createBookingDto.amountDue

                    if (!Service) {
                        throw new NotFoundException('Catering service not found for booking');

                    } else if (Service.status !== 'ACTIVE') {
                        throw new BadRequestException(`This service is inactive and can not accept booking`, {
                            cause: new Error(),
                            description: `This service is inactive and can not accept booking`
                        });

                    } else if (createBookingDto.createdBy !== Service.serviceProviderId) {
                        throw new BadRequestException(`Bookign error`, {
                            cause: new Error(),
                            description: `Only requests for quotes are allowed for catering service`
                        });

                    } else if (createBookingDto.createdBy === Service.serviceProviderId) {
                        if (createBookingDto.discount === undefined) {
                            createBookingDto.discount = createBookingDto.subTotal * (Service.discountPercentage / 100)
                        } else {
                            createBookingDto.total = createBookingDto.subTotal - (createBookingDto.discount);
                        }
                        createBookingDto.total = createBookingDto.subTotal - createBookingDto.discount;
                        if (createBookingDto.amountDue > createBookingDto.total) {
                            throw new BadRequestException(`Amount due can not be more than total amount for service. A discount of ${createBookingDto.discount} was applied and total is ${createBookingDto.total}`, {
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

            if ((itemsTotal - createBookingDto.discount) !== (createBookingDto.total)) {
                throw new BadRequestException(`We could not generate invoice, total amount is incorrect for the items. 
                    Should be ${itemsTotal - createBookingDto.discount}, a discount of ${createBookingDto.discount} was applied`, {
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

            return this.bookingService.create({ ...createBookingDto, customer, serviceProvider });
        } catch (error) {
            console.log({ error })
            throw error
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