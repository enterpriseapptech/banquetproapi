import { Module } from '@nestjs/common';
import { InvoiceController, SubscriptionPlansController } from './payments.controller';
import { FeaturedPlanService, InvoiceService, PaymentsService, SubscriptionPlansService } from './payments.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from '../database/database.service';
import { StripePaymentService } from './stripe.payment';
import { NOTIFICATION_CLIENT } from '@shared/contracts';
import { ClientConfigService } from '../client-config/client-config.service';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ClientConfigModule } from '../client-config/client-config.module';

@Module({
  imports: [
    ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '../env',
            }),
            ClientConfigModule,
  ],
  controllers: [SubscriptionPlansController, InvoiceController],
  providers: [
    DatabaseService,
    PaymentsService,
    SubscriptionPlansService,
    FeaturedPlanService,
    InvoiceService,
    StripePaymentService,
    ClientConfigService,
     {
          provide: NOTIFICATION_CLIENT,
          useFactory: (configService: ClientConfigService) => {
              const NotificationsClientOptions = configService.NotificationsClientOptions;
              // console.log('Creating ClientProxy with options:', usersClientOptions);
              return ClientProxyFactory.create(NotificationsClientOptions);
          },
          inject: [ClientConfigService],
      }

  ],
})
export class PaymentsModule {}
