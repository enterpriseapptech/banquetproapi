import { NestFactory } from '@nestjs/core';
import { EventcentersModule } from './eventcenters.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
import * as express from 'express';

dotenv.config({ path: './apps/eventcenters/.env' });

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        EventcentersModule,
        {
            transport: Transport.RMQ,
            options: {
                urls: [process.env.EVENTSURL],
                queue: `${process.env.EVENTSQUEUE}_${process.env.NODE_ENV}`,
                queueOptions: { durable: false},
            }
        }
    );
    await app.listen();
    console.log('event centers Microservice is listening...');


    // Dummy Express Server to satisfy Render
    const dummyApp = express();
    const port = process.env.PORT || 8003;
    dummyApp.listen(port, () => console.log(`Dummy server running on port ${port}`));
}
bootstrap();
