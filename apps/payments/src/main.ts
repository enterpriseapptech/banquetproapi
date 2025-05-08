import { NestFactory } from '@nestjs/core';
import { PaymentsModule } from './payments.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
import * as express from 'express';

dotenv.config({ path: './apps/payments/.env' });
async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
      PaymentsModule,
        {
            transport: Transport.RMQ,
            options: {
                urls: [process.env.PAYMENTURL],
                queue: process.env.PAYMENTQUEUE,
                queueOptions: {
                    durable: false
                },
            }
        }
    );
    await app.listen();
    console.log('payment Microservice is listening...');

    // Dummy Express Server to satisfy Render
    const dummyApp = express();
    const port = process.env.PORT || 8006;
    dummyApp.listen(port, () => console.log(`Payment Dummy server running on port ${port}`));
}
bootstrap();
