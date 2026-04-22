import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';

dotenv.config({ path: './apps/users/.env' });
async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        UsersModule,
        {
            transport: Transport.RMQ,
            options: {
                urls: [process.env.USERSURL],
                queue: `${process.env.USERSQUEUE}_${process.env.NODE_ENV}`,
                queueOptions: {
                    durable: false
                },
                socketOptions: {
                    clientProperties: {
                        connection_name: `UsersClient_${process.env.NODE_ENV}`
                    }
                }
            }
        }
    );
    app.enableShutdownHooks(); 
    await app.listen();
    console.log('UserMicroservice is listening...');

}
bootstrap();
