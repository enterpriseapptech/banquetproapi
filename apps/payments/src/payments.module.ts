import { Module } from '@nestjs/common';
import { SubscriptionPlansController } from './payments.controller';
import { FeaturedPlanService, PaymentsService, SubscriptionPlansService } from './payments.service';

@Module({
  imports: [],
  controllers: [SubscriptionPlansController],
  providers: [
    PaymentsService,
    SubscriptionPlansService,
    FeaturedPlanService

  ],
})
export class PaymentsModule {}
