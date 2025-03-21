import { NestFactory } from '@nestjs/core';
import { CateringModule } from './catering.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
import * as express from 'express';

dotenv.config({ path: './apps/catering/.env' });

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CateringModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.CATERINGURL],
        queue: process.env.CATERINGQUEUE,
        queueOptions: { durable: true, autoDelete: false },
        noAck: true, // Ensure messages are properly acknowledged
        prefetchCount: 1, // Prevent overloading
      }
    }
  );
  await app.listen();
  console.log('Catering Microservice is listening...');
      // Dummy Express Server to satisfy Render
  const dummyApp = express();
  const port = process.env.PORT || 8005;
  dummyApp.listen(port, () => console.log(`Dummy server running on port ${port}`));
}
bootstrap();
