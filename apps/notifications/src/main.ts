import { NestFactory } from '@nestjs/core';
import { NotificationsModule } from './notifications.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';


dotenv.config({ path: './apps/notifications/.env' });
async function bootstrap() {
  const queueName = `${process.env.NOTIFICATIONQUEUE}_${process.env.NODE_ENV}`;
  console.log(`Connecting to queue: ${queueName}`);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    NotificationsModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.NOTIFICATIONURL],
        queue: `${process.env.NOTIFICATIONQUEUE}_${process.env.NODE_ENV}`,
        queueOptions: {
          durable: false
        },
      }
    }
  );
  app.enableShutdownHooks(); 
  await app.listen();
  console.log('Notification Microservice is listening...');
}
bootstrap();
