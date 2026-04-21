import { Module } from '@nestjs/common';
import {
     WalletService
} from './payment.service';
import {
     WalletController,
} from './payment.controller';
import { ClientConfigService } from '../client-config/client-config.service';
import { NOTIFICATION_CLIENT, PAYMENT_CLIENT } from '@shared/contracts';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ClientConfigModule } from '../client-config/client-config.module';

@Module({
    imports: [ClientConfigModule,],
    controllers: [
         WalletController,
    ],
    providers: [
        WalletService,
ClientConfigService,
        {
            provide: PAYMENT_CLIENT,
            useFactory: (configService: ClientConfigService) => {
                const paymentClientOptions = configService.PaymentClientOptions;
                return ClientProxyFactory.create(paymentClientOptions);
            },
            inject: [ClientConfigService],
        },
        {
            provide: NOTIFICATION_CLIENT,
            useFactory: (configService: ClientConfigService) => {
                return ClientProxyFactory.create(configService.NotificationsClientOptions);
            },
            inject: [ClientConfigService],
        }
    ],
    exports: [WalletService]
})
export class WalletModule { }
