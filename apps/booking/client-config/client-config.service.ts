import { Injectable } from '@nestjs/common';
import { ClientOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';

dotenv.config({ path: './apps/users/.env' });
@Injectable()
export class ClientConfigService {

    get NotificationsClientOptions(): ClientOptions {
        return {
            transport: Transport.RMQ,
            options: {
                urls: [process.env.BOOKINGURL],  // RabbitMQ URL for the Notification Microservice
                queue: process.env.BOOKINGQUEUE, // The queue name
                queueOptions: {
                    durable: false,
                }
            }
        }
    }

    get UsersClientOptions(): ClientOptions {
        return {
            transport: Transport.RMQ,
            options: {
                urls: ['amqp://users_admin:usersPassword@2025@localhost:5672'],
                queue: 'users_queue',
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
                urls: ['amqp://users_admin:usersPassword@2025@localhost:5672'],
                queue: 'event_centers_queue',
                queueOptions: { durable: true, autoDelete: false },
                noAck: true, // Ensure messages are properly acknowledged
                prefetchCount: 1, // Prevent overloading

            }
        }
    }
    
    get CateringClientOptions(): ClientOptions {
        return {
            transport: Transport.RMQ,
            options: {
                urls: ['amqp://users_admin:usersPassword@2025@localhost:5672'],
                queue: 'catering_queue',
                queueOptions: { durable: true, autoDelete: false },
                noAck: true, // Ensure messages are properly acknowledged
                prefetchCount: 1, // Prevent overloading

            }
        }
    }
    
}
