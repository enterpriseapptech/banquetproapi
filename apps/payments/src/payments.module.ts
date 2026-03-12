import { Module } from '@nestjs/common';
import { DisputeController, FeesController, FeaturedPlanController, InvoiceController, PaymentsController, RefundController, SubscriptionController, SubscriptionPlansController } from './payments.controller';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from '../database/database.service';
import { StripePaymentService } from './stripe.payment';
import { ClientConfigService } from '../client-config/client-config.service';
import { ClientConfigModule } from '../client-config/client-config.module';
import { PaystackPaymentService } from './paystack.payment';
import { PaymentsService } from './services/payments.service';
import { InvoiceService } from './services/invoice.service';
import { FeesService } from './services/fees.service';
import { FeaturedPlanService } from './services/featured_plans.service';
import { RefundService } from './services/refund.service';
import { DisputeService } from './services/dispute.service';
import { SubscriptionService } from './services/subscription.service';
import { SubscriptionPlansService } from './services/subscription_plans.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../env',
    }),
    ClientConfigModule,
  ],
  controllers: [PaymentsController, SubscriptionPlansController, 
    FeaturedPlanController, FeesController, InvoiceController, 
    RefundController, DisputeController, 
    SubscriptionController],
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
  ],
})
export class PaymentsModule { }
