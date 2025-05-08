import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';

dotenv.config({ path: './apps/notifications/.env' });
@Injectable()
export class ClientConfigService {

    constructor(private configService: ConfigService) { }
    
    getUsersClientUrl(): string {
        return this.configService.get<string>('NOTIFICATIONURL')
    }

    getUsersClientQueue(): string {
        return this.configService.get<string>('NOTIFICATIONQUEUE')
    }

    get BookingClientOptions(): ClientOptions {
        return {
            transport: Transport.RMQ,
            options: {
                urls: [process.env.BOOKINGURL],
                queue: process.env.BOOKINGQUEUE,
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
                queue: process.env.USERSQUEUE,
                queueOptions: {
                    durable: false,
                }
            }
        }
    }

}
