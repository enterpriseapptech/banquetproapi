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

    
    

}
