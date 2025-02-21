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


    get BookingClientOptions(): ClientOptions {
        return {
            transport: Transport.RMQ,
            options: {
                urls: ['amqp://users_admin:usersPassword@2025@localhost:5672'],
                queue: 'booking_queue',
                queueOptions: {
                    durable: false,
                }
            }
        }
    }
}
