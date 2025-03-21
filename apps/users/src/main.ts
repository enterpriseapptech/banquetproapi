import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
import * as express from 'express';

dotenv.config({ path: './apps/users/.env' });
async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        UsersModule,
        {
            transport: Transport.RMQ,
            options: {
                urls: [process.env.USERSURL],
                queue: process.env.USERSQUEUE,
                queueOptions: {
                    durable: false
                },
            }
        }
    );
    await app.listen();
    console.log('UserMicroservice is listening...');

    // Dummy Express Server to satisfy Render
    const dummyApp = express();
    const port = process.env.PORT || 8001;
    dummyApp.listen(port, () => console.log(`Dummy server running on port ${port}`));
}
bootstrap();
