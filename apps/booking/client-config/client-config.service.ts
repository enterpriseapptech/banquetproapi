import { Injectable } from '@nestjs/common';
import { ClientOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';

dotenv.config({ path: './apps/booking/.env' });
@Injectable()
export class ClientConfigService {

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
                queueOptions: { durable: false }
                
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
                urls: [process.env.NOTIFICATIONURL],  // RabbitMQ URL for the Notification Microservice
                queue: `${process.env.NOTIFICATIONQUEUE}_${process.env.NODE_ENV}`, // The queue name
                queueOptions: {
                    durable: false,
                }
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

    get ManagementClientOptions(): ClientOptions {
        return {
            transport: Transport.RMQ,
            options: {
                urls: [process.env.MANAGEMENTURL],
                queue: `${process.env.MANAGEMENTQUEUE}_${process.env.NODE_ENV}`,
                queueOptions: {
                    durable: false,
                }
            }
        }
    }
    
}
