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
        queue: process.env.USERSQUEUE,
        queueOptions: {
          durable: false
        },
      }
    }
  );
  await app.listen();
  console.log('Microservice is listening...');
}
bootstrap();
