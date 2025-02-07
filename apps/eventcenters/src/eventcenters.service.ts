/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConflictException, Inject, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { $Enums, Prisma } from '@prisma/eventcenters';
import { CreateEventCenterDto, NOTIFICATIONPATTERN, EventCenterDto, UserDto, USERPATTERN } from '@shared/contracts';
import { DatabaseService } from '../database/database.service';
import { NOTIFICATION_CLIENT, USER_CLIENT } from './constants';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { catchError, throwError, firstValueFrom } from 'rxjs';
@Injectable()
export class EventcentersService {
    constructor(
        @Inject(NOTIFICATION_CLIENT) private readonly notificationClient: ClientProxy,
        @Inject(USER_CLIENT) private readonly userClient: ClientProxy,
        private readonly databaseService: DatabaseService
    ) { }

    async create(createEventCenterDto: CreateEventCenterDto): Promise<EventCenterDto> {

        const newEventCenterInput: Prisma.EventCenterCreateInput = {
            service_provider_id: createEventCenterDto.service_provider_id,
            depositAmount: createEventCenterDto.depositAmount,
            totalAmount: createEventCenterDto.totalAmount,
            description: createEventCenterDto.description,
            pricingType: createEventCenterDto.pricingType as $Enums.PricingType,
            sittingCapacity: createEventCenterDto.sittingCapacity,
            venueLayout: createEventCenterDto.venueLayout,
            amenities: createEventCenterDto.amenities as $Enums.Amenities[],
            images: createEventCenterDto.images,
            termsOfUse: createEventCenterDto.termsOfUse,
            cancellationPolicy: createEventCenterDto.cancellationPolicy,
            streetAddress: createEventCenterDto.streetAddress,
            streetAddress2: createEventCenterDto.streetAddress2,
            city: createEventCenterDto.city,
            state: createEventCenterDto.state,
            country: createEventCenterDto.country,
            postal: createEventCenterDto.postal,
            status: createEventCenterDto.status as $Enums.ServiceStatus
        }

        try {
            // find service provider
            const serviceProvider = await firstValueFrom(this.userClient.send<UserDto, string>(USERPATTERN.FINDUSERBYID, newEventCenterInput.service_provider_id));

            if (!serviceProvider) {
                throw new NotFoundException("could not verify service provider")
            }

            if (serviceProvider?.status !== "ACTIVE") {
                throw new UnauthorizedException("service provider account is not active")
            }
            // Start a transaction - for an all or fail process of creating a user
            const neweventCenter = await this.databaseService.$transaction(async (prisma) => {
                // Create the user
                const eventCenter = await prisma.eventCenter.create({ data: newEventCenterInput });
                return eventCenter
            });

            //  emit a email verification - notification event
            this.notificationClient.emit(NOTIFICATIONPATTERN.SENDNOTIFICATION, {
                type: 'EMAIL',
                recipientId: serviceProvider,
                data: {
                    subject: 'New Event Venue!',
                    message: `you successfully added a new event venue`,
                    recipientEmail: serviceProvider.email,
                },
            });

            return neweventCenter;

        } catch (error) {
            console.log(error)
            throw new ConflictException('sever error could not create new event Center', {
                cause: new Error(),
                description: 'new event Center creation failed, please try again'
            });
        }



    }

    async findAllByLocation(limit: number, offset: number): Promise<EventCenterDto[]> {
        const users = this.databaseService.eventCenter.findMany({
            take: limit, // Number of records to retrieve
            skip: offset,
        })
        return users;
    }
    
    // async findAll(limit: number, offset: number): Promise<EventCenterDto[]> {
    //     const users = this.databaseService.user.findMany({
    //         take: limit, // Number of records to retrieve
    //         skip: offset,
    //     })
    //     return users;
    // }

    // async findAllServiceProvider(limit: number, offset: number): Promise<EventCenterDto[]> {
    //     const users = this.databaseService.user.findMany({
    //         take: limit, // Number of records to retrieve
    //         skip: offset,
    //     })
    //     return users;
    // }
    // async findOne(id: string): Promise<EventCenterDto> {
    //     const user = await this.databaseService.user.findUnique({
    //         where: {
    //             id: id
    //         },
    //         include: {
    //             admin: true,
    //             serviceProvider: true,
    //             customer: true,
    //             staff: true,
    //             personalAccessToken: true
    //         }
    //     });
    //     return user;
    // }

    // // update(id: number, updateEventCenterDto: UpdateEventCenterDto) {
    // //     return `This action updates a #${id} user`;
    // // }

    // remove(id: number) {
    //     return `This action removes a #${id} user`;
    // }

    // async verify(id: string, token: string) {
    //     // check personal access token for token
    //     const personalAccessToken = await this.databaseService.personalAccessTokens.findUnique({
    //         where: {
    //             id: id,
    //             token: token
    //         }
    //     });

    //     // If token does not exist or does not match, return null
    //     if (!personalAccessToken) {
    //         // throw new RpcException('Invalid verification token');
    //         throw new NotFoundException('Invalid verification token', {
    //             cause: new Error(),
    //             description: 'invalid token, could not verify account'
    //         });
    //     }

    //     // Check if the token has expired
    //     const now = new Date();
    //     if (personalAccessToken.expiry && new Date(personalAccessToken.expiry) < now) {
    //         throw new UnauthorizedException('Your verification token has expired', {
    //             cause: new Error(),
    //             description: 'Your verification token has expired'
    //         });
    //     }

    //     // Update user to set email as verified
    //     const user = await this.databaseService.user.update({
    //         where: { id: personalAccessToken.id },
    //         data: { isEmailVerified: true } // or true if it's a boolean field
    //     });

    //     return user;

    // }

}
