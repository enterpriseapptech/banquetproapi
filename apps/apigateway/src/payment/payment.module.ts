import { Module } from '@nestjs/common';
import { DisputeService, FeaturedPlanService, FeesService, InvoiceService, PaymentMethodService, PaymentService, RefundService, SubscriptionService, SubscriptionPlanService } from './payment.service';
import { DisputeController, FeaturedPlanController, FeesController, InvoiceController, PaymentController, PaymentMethodController, RefundController, ServiceSubscriptionController, SubscriptionController, SubscriptionPlanController } from './payment.controller';
import { ClientConfigService } from '../client-config/client-config.service';
import { PAYMENT_CLIENT } from '@shared/contracts';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ClientConfigModule } from '../client-config/client-config.module';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { BookingModule } from '../booking/booking.module';
import { EventcentersModule } from '../eventcenters/eventcenters.module';
import { CateringModule } from '../catering/catering.module';

@Module({
    imports: [ClientConfigModule, BookingModule, EventcentersModule, CateringModule],
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
        ServiceSubscriptionController,
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
        CloudinaryService,
        ClientConfigService,
        {
            provide: PAYMENT_CLIENT,
            useFactory: (configService: ClientConfigService) => {
                const paymentClientOptions = configService.PaymentClientOptions;
                return ClientProxyFactory.create(paymentClientOptions);
            },
            inject: [ClientConfigService],
        }
    ],
})
export class PaymentModule { }
