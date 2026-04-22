import { NestFactory } from '@nestjs/core';
import { ManagementModule } from './management.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';



dotenv.config({ path: './apps/management/.env' });
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ManagementModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.MANAGEMENTURL],
        queue: `${process.env.MANAGEMENTQUEUE}_${process.env.NODE_ENV}`,
        queueOptions: {
          durable: false
        },
      }
    }
  );
  app.enableShutdownHooks(); 
  await app.listen();
  console.log('Managememt Microservice is listening...');
}
bootstrap();
