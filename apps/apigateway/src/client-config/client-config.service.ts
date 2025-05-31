import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';

dotenv.config({ path: './apps/apigateway/.env' });
@Injectable()
export class ClientConfigService {

    constructor(private configService: ConfigService) { }
    
    getUsersClientUrl(): string {
        return this.configService.get<string>('USERSURL')
    }

    getUsersClientQueue(): string {
        return this.configService.get<string>('USERSQUEUE')
    }

    get UsersClientOptions(): ClientOptions {
        return {
            transport: Transport.RMQ,
            options: {
                urls: [process.env.USERSURL],
                queue: `${process.env.USERSQUEUE}_${process.env.NODE_ENV}`,
                queueOptions: {
                    durable: false,
                }
            }
        }
    }

    get EventCenterClientOptions(): ClientOptions {
        return {
            transport: Transport.RMQ,
            options: {
                urls: [process.env.EVENTSURL],
                queue: `${process.env.EVENTSQUEUE}_${process.env.NODE_ENV}`,
                queueOptions: { durable: true, autoDelete: false },
                noAck: true, // Ensure messages are properly acknowledged
                prefetchCount: 1, // Prevent overloading
                
            }
        }
    }


    get BookingClientOptions(): ClientOptions {
        return {
            transport: Transport.RMQ,
            options: {
                urls: [process.env.BOOKINGURL],
                queue: `${process.env.BOOKINGQUEUE}_${process.env.NODE_ENV}`,
                queueOptions: {
                    durable: false,
                }
            }
        }
    }

    get CateringClientOptions(): ClientOptions {
        return {
            transport: Transport.RMQ,
            options: {
                urls: [process.env.CATERINGURL],
                queue: `${process.env.CATERINGQUEUE}_${process.env.NODE_ENV}`,
                queueOptions: { durable: true, autoDelete: false },
                noAck: true, // Ensure messages are properly acknowledged
                prefetchCount: 1, // Prevent overloading

            }
        }
    } 


    get NotificationsClientOptions(): ClientOptions {
        return {
            transport: Transport.RMQ,
            options: {
                urls: [process.env.NOTIFICATIONURL],
                queue: `${process.env.NOTIFICATIONQUEUE}_${process.env.NODE_ENV}`,
                queueOptions: { durable: true, autoDelete: false },
                noAck: true, // Ensure messages are properly acknowledged
                prefetchCount: 1, // Prevent overloading

            }
        }
    } 


    get PaymentClientOptions(): ClientOptions {
        return {
            transport: Transport.RMQ,
            options: {
                urls: [process.env.PAYMENTURL],
                queue: process.env.PAYMENTQUEUE,
                queueOptions: { durable: true, autoDelete: false },
                noAck: true, // Ensure messages are properly acknowledged
                prefetchCount: 1, // Prevent overloading

            }
        }
    } 
}
