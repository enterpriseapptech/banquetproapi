import { NestFactory } from '@nestjs/core';
import { PaymentsModule } from './payments.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
import { RpcLoggingInterceptor } from './common/interceptors/rpc-logging.interceptor';

dotenv.config({ path: './apps/payments/.env' });
async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
      PaymentsModule,
        {
            transport: Transport.RMQ,
            options: {
                urls: [process.env.PAYMENTURL],
                queue: `${process.env.PAYMENTQUEUE}_${process.env.NODE_ENV}`,
                queueOptions: {
                    durable: false
                },
            }
        }
    );
    app.useGlobalInterceptors(new RpcLoggingInterceptor());
    app.enableShutdownHooks(); 
    await app.listen();
    console.log('payment Microservice is listening...');
}
bootstrap();
