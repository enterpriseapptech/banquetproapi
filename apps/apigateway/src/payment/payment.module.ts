import { Module } from '@nestjs/common';
import { InvoiceService, PaymentMethodService, PaymentService } from './payment.service';
import { PaymentController, InvoiceController, PaymentMethodController } from './payment.controller';
import { ClientConfigService } from '../client-config/client-config.service';
import { PAYMENT_CLIENT } from '@shared/contracts';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ClientConfigModule } from '../client-config/client-config.module';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { BookingModule } from '../booking/booking.module';

@Module({
    imports: [ClientConfigModule, BookingModule],
    controllers: [PaymentController, InvoiceController, PaymentMethodController],
    providers: [PaymentService, InvoiceService,PaymentMethodService, CloudinaryService,
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
