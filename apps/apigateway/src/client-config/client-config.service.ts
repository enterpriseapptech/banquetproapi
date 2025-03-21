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
                urls: ['amqps://ktqrzwaf:Tz9V_shsKq9UpCnexKpdTM6h9hglR1eE@shrimp.rmq.cloudamqp.com/ktqrzwaf'],
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
                urls: ['amqps://ktqrzwaf:Tz9V_shsKq9UpCnexKpdTM6h9hglR1eE@shrimp.rmq.cloudamqp.com/ktqrzwaf'],
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
                urls: ['amqps://ktqrzwaf:Tz9V_shsKq9UpCnexKpdTM6h9hglR1eE@shrimp.rmq.cloudamqp.com/ktqrzwaf'],
                queue: 'booking_queue',
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
                urls: ['amqps://ktqrzwaf:Tz9V_shsKq9UpCnexKpdTM6h9hglR1eE@shrimp.rmq.cloudamqp.com/ktqrzwaf'],
                queue: 'catering_queue',
                queueOptions: { durable: true, autoDelete: false },
                noAck: true, // Ensure messages are properly acknowledged
                prefetchCount: 1, // Prevent overloading

            }
        }
    } 
}
