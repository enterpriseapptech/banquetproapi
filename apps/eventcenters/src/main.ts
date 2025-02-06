import { NestFactory } from '@nestjs/core';
import { EventcentersModule } from './eventcenters.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
dotenv.config({ path: './apps/eventcenters/.env' });

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    EventcentersModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.EVENTSURL],
        queue: process.env.EVENTSQUEUE,
        queueOptions: {
          durable: false
        },
      }
    }
  );
  await app.listen();
  console.log('event centers Microservice is listening...');
}
bootstrap();
