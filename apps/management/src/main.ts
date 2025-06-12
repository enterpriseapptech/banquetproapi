import { NestFactory } from '@nestjs/core';
import { ManagementModule } from './management.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
import * as express from 'express';


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
  await app.listen();
  console.log('Managememt Microservice is listening...');

  // Dummy Express Server to satisfy Render
  const dummyApp = express();
  const port = process.env.PORT || 8007;
  dummyApp.listen(port, () => console.log(`Managememt Dummy server running on port ${port}`));
}
bootstrap();
