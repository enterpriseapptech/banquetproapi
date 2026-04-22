import { NestFactory } from '@nestjs/core';
import { BookingModule } from './booking.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';

dotenv.config({ path: './apps/booking/.env' });

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    BookingModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.BOOKINGURL],
        queue: `${process.env.BOOKINGQUEUE}_${process.env.NODE_ENV}`,
        queueOptions: {
          durable: false
        },
      }
    }
  );
  app.enableShutdownHooks(); 
  await app.listen();
  console.log('booking Microservice is listening...');
}
bootstrap();
