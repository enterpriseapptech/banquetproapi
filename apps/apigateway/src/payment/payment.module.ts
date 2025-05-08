import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { ClientConfigService } from '../client-config/client-config.service';
import { PAYMENT_CLIENT } from '@shared/contracts';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ClientConfigModule } from '../client-config/client-config.module';

@Module({
    controllers: [PaymentController, ClientConfigModule],
    providers: [PaymentService,
        ClientConfigService,
        {
            provide: PAYMENT_CLIENT,
            useFactory: (configService: ClientConfigService) => {
                const paymentClientOptions = configService.PaymentClientOptions;
                // console.log('Creating ClientProxy with options:', paymentClientOptions);
                return ClientProxyFactory.create(paymentClientOptions);
            },
            inject: [ClientConfigService],
        }
    ],
})
export class PaymentModule { }
