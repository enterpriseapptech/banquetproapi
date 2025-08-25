import { Module } from '@nestjs/common';
import { BookingController, RequestQuoteController, TimeSlotController } from './booking.controller';
import { BookingService, RequestQuoteService, TimeSlotService } from './booking.service';
import { DatabaseService } from '../database/database.service';
import { USER_CLIENT, NOTIFICATION_CLIENT, EVENT_CENTER_CLIENT, CATERING_CLIENT, PAYMENT_CLIENT } from '@shared/contracts'
import { ConfigModule } from '@nestjs/config';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ClientConfigModule } from '../client-config/client-config.module';
import { ClientConfigService } from '../client-config/client-config.service';



@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        ClientConfigModule,
    ],
    controllers: [BookingController, TimeSlotController,  RequestQuoteController],
    providers: [
        BookingService,
        RequestQuoteService,
        TimeSlotService,
        DatabaseService,
        ClientConfigService,
        {
            provide: NOTIFICATION_CLIENT,
            useFactory: (configService: ClientConfigService) => {
                const NotificationsClientOptions = configService.NotificationsClientOptions;
                return ClientProxyFactory.create(NotificationsClientOptions);
            },
            inject: [ClientConfigService],
        }
        , {
            provide: USER_CLIENT,
            useFactory: (configService: ClientConfigService) => {
                const usersClientOptions = configService.UsersClientOptions;
                return ClientProxyFactory.create(usersClientOptions);
            },
            inject: [ClientConfigService],
        },
        {
            provide: EVENT_CENTER_CLIENT,
            useFactory: (configService: ClientConfigService) => {
                const EventCenterClientOptions = configService.EventCenterClientOptions;
                return ClientProxyFactory.create(EventCenterClientOptions);
            },
            inject: [ClientConfigService],
        },
        {
            provide: CATERING_CLIENT,
            useFactory: (configService: ClientConfigService) => {
                const CateringClientOptions = configService.CateringClientOptions;
                return ClientProxyFactory.create(CateringClientOptions);
            },
            inject: [ClientConfigService],
        },
         {
            provide: PAYMENT_CLIENT,
            useFactory: (configService: ClientConfigService) => {
                const paymentClientOptions = configService.PaymentClientOptions;
                console.log('Creating ClientProxy with options:', paymentClientOptions);
                return ClientProxyFactory.create(paymentClientOptions);
            },
            inject: [ClientConfigService],
        }
    ],
}) 
export class BookingModule { }
