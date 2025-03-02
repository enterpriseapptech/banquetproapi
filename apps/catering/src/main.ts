import { NestFactory } from '@nestjs/core';
import { CateringModule } from './catering.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
dotenv.config({ path: './apps/eventcenters/.env' });

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
}
bootstrap();
