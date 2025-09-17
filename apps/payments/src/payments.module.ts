import { Module } from '@nestjs/common';
import { InvoiceController, PaymentsController, SubscriptionPlansController } from './payments.controller';
import { FeaturedPlanService, InvoiceService, PaymentsService, SubscriptionPlansService } from './payments.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from '../database/database.service';
import { StripePaymentService } from './stripe.payment';
import { NOTIFICATION_CLIENT } from '@shared/contracts';
import { ClientConfigService } from '../client-config/client-config.service';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ClientConfigModule } from '../client-config/client-config.module';
import { PaystackPaymentService } from './paystack.payment';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../env',
    }),
    ClientConfigModule,
  ],
  controllers: [PaymentsController, SubscriptionPlansController, InvoiceController],
  providers: [
    DatabaseService,
    PaymentsService,
    SubscriptionPlansService,
    FeaturedPlanService,
    InvoiceService,
    StripePaymentService,
    PaystackPaymentService,
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
export class PaymentsModule { }
