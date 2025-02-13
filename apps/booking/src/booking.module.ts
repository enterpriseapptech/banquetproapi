import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { DatabaseService } from '../database/database.service';
import { USER_CLIENT, NOTIFICATION_CLIENT, EVENT_CENTER_CLIENT } from './constants';
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
    controllers: [BookingController],
    providers: [
        BookingService,
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
                const EventCenterBookingClientOptions = configService.EventCenterBookingClientOptions;
                return ClientProxyFactory.create(EventCenterBookingClientOptions);
            },
            inject: [ClientConfigService],
        }
    ],
})
export class BookingModule { }
