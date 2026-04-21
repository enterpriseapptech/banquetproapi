import { Module } from '@nestjs/common';
import {
  DisputeController, FeesController, FeaturedPlanController, InvoiceController,
  PaymentsController, RefundController, SubscriptionController, SubscriptionPlansController,
  WalletController, WithdrawalController,
} from './payments.controller';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { DatabaseService } from '../database/database.service';
import { StripePaymentService } from './stripe.payment';
import { ClientConfigService } from '../client-config/client-config.service';
import { ClientConfigModule } from '../client-config/client-config.module';
import { ClientProxyFactory } from '@nestjs/microservices';
import { PaystackPaymentService } from './paystack.payment';
import { PaymentsService } from './services/payments.service';
import { InvoiceService } from './services/invoice.service';
import { FeesService } from './services/fees.service';
import { FeaturedPlanService } from './services/featured_plans.service';
import { RefundService } from './services/refund.service';
import { DisputeService } from './services/dispute.service';
import { SubscriptionService } from './services/subscription.service';
import { SubscriptionPlansService } from './services/subscription_plans.service';
import { SubscriptionExpiryService } from './services/subscription-expiry.service';
import { WalletService } from './services/wallet.service';
import { WithdrawalService } from './services/withdrawal.service';
import { RefundProcessingService } from './services/refund-processing.service';
import { EVENT_CENTER_CLIENT, CATERING_CLIENT, NOTIFICATION_CLIENT } from '@shared/contracts';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../env',
    }),
    ClientConfigModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [
    PaymentsController,
    SubscriptionPlansController,
    FeaturedPlanController,
    FeesController,
    InvoiceController,
    RefundController,
    DisputeController,
    SubscriptionController,
    WalletController,
    WithdrawalController,
  ],
  providers: [
    DatabaseService,
    PaymentsService,
    SubscriptionPlansService,
    FeaturedPlanService,
    FeesService,
    InvoiceService,
    RefundService,
    DisputeService,
    SubscriptionService,
    StripePaymentService,
    PaystackPaymentService,
    ClientConfigService,
    SubscriptionExpiryService,
    WalletService,
    WithdrawalService,
    RefundProcessingService,
    {
      provide: EVENT_CENTER_CLIENT,
      useFactory: (configService: ClientConfigService) =>
        ClientProxyFactory.create(configService.EventCenterClientOptions),
      inject: [ClientConfigService],
    },
    {
      provide: CATERING_CLIENT,
      useFactory: (configService: ClientConfigService) =>
        ClientProxyFactory.create(configService.CateringClientOptions),
      inject: [ClientConfigService],
    },
    {
      provide: NOTIFICATION_CLIENT,
      useFactory: (configService: ClientConfigService) =>
        ClientProxyFactory.create(configService.NotificationsClientOptions),
      inject: [ClientConfigService],
    },
  ],
})
export class PaymentsModule { }
