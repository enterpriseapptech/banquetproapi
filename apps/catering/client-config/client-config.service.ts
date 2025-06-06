import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';

dotenv.config({ path: './apps/catering/.env' });
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
                queue: `${process.env.NOTIFICATIONQUEUE}_${process.env.NODE_ENV}`, // The queue name
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
                urls: [process.env.USERSURL],
                queue: `${process.env.USERSQUEUE}_${process.env.NODE_ENV}`,
                queueOptions: {
                    durable: false,
                }
            }
        }
    }

}
