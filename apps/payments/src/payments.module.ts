import { Module } from '@nestjs/common';
import { SubscriptionPlansController } from './payments.controller';
import { FeaturedPlanService, PaymentsService, SubscriptionPlansService } from './payments.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from '../database/database.service';

@Module({
  imports: [
    ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '../env',
            }),
  ],
  controllers: [SubscriptionPlansController],
  providers: [
    DatabaseService,
    PaymentsService,
    SubscriptionPlansService,
    FeaturedPlanService

  ],
})
export class PaymentsModule {}
