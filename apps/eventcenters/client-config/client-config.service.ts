import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';

dotenv.config({ path: './apps/users/.env' });
@Injectable()
export class ClientConfigService {

    constructor(private configService: ConfigService) { }
    
    getUsersClientUrl(): string {
        return this.configService.get<string>('NOTIFICATIONURL')
    }

    getUsersClientQueue(): string {
        return this.configService.get<string>('NOTIFICATIONQUEUE')
    }

    get NotificationsClientOptions(): ClientOptions {
        return {
            transport: Transport.RMQ,
            options: {
                urls: [process.env.NOTIFICATIONURL],  // RabbitMQ URL for the Notification Microservice
                queue: process.env.NOTIFICATIONQUEUE, // The queue name
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

}
