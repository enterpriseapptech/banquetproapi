import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientOptions, Transport } from '@nestjs/microservices';

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
                urls: ['amqp://users_admin:usersPassword@2025@localhost:5672'],
                queue: 'users_queue',
                queueOptions: {
                    durable: false,
                }
            }
        }
    }



}
