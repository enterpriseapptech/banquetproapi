import { Module } from '@nestjs/common';
import { InvoiceController, SubscriptionPlansController } from './payments.controller';
import { FeaturedPlanService, InvoiceService, PaymentsService, SubscriptionPlansService } from './payments.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from '../database/database.service';

@Module({
  imports: [
    ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '../env',
            }),
  ],
  controllers: [SubscriptionPlansController, InvoiceController],
  providers: [
    DatabaseService,
    PaymentsService,
    SubscriptionPlansService,
    FeaturedPlanService,
    InvoiceService

  ],
})
export class PaymentsModule {}
