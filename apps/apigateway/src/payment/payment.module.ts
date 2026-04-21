import { Module } from '@nestjs/common';
import {
    DisputeGatewayService, DisputeService, FeaturedPlanService, FeesService, InvoiceService,
    PaymentMethodService, PaymentService, RefundGatewayService, RefundService, SubscriptionService,
    SubscriptionPlanService, WithdrawalGatewayService,
} from './payment.service';
import {
    DisputeController, FeaturedPlanController, FeesController, InvoiceController,
    PaymentController, PaymentMethodController, RefundController, SubscriptionController,
    SubscriptionPlanController, WithdrawalController,
} from './payment.controller';
import { ClientConfigService } from '../client-config/client-config.service';
import { NOTIFICATION_CLIENT, PAYMENT_CLIENT } from '@shared/contracts';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ClientConfigModule } from '../client-config/client-config.module';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { BookingModule } from '../booking/booking.module';
import { EventcentersModule } from '../eventcenters/eventcenters.module';
import { CateringModule } from '../catering/catering.module';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [ClientConfigModule, BookingModule, EventcentersModule, CateringModule, UsersModule],
    controllers: [
        PaymentController,
        InvoiceController,
        PaymentMethodController,
        SubscriptionPlanController,
        FeaturedPlanController,
        FeesController,
        SubscriptionController,
        RefundController,
        DisputeController,
        WithdrawalController,
    ],
    providers: [
        PaymentService,
        InvoiceService,
        PaymentMethodService,
        SubscriptionPlanService,
        FeaturedPlanService,
        FeesService,
        SubscriptionService,
        RefundService,
        DisputeService,
        WithdrawalGatewayService,
        RefundGatewayService,
        DisputeGatewayService,
        CloudinaryService,
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
    exports: []
})
export class PaymentModule { }
