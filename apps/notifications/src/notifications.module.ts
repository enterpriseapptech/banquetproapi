import { Module } from '@nestjs/common';
import { NotificationsController, ReviewController } from './notifications.controller';
import { NotificationsService, ReviewService } from './notifications.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ClientConfigService } from '../client-config/client-config.service';
import { BOOKING_CLIENT, USER_CLIENT } from '@shared/contracts';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ClientConfigModule } from '../client-config/client-config.module';
import { DatabaseService } from '../database/database.service';

@Module({
    imports: [
        ClientConfigModule,
        MailerModule.forRoot({
            transport: {
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT,
                // secure: process.env.SMTP_SECURITY,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS
                },
                // connectionTimeout: 10000, // 10 seconds
            }
        }),
    ],
    controllers: [NotificationsController, ReviewController],
    providers: [
        ReviewService,
        NotificationsService,
        DatabaseService,
        ClientConfigService,
        {
            provide: BOOKING_CLIENT,
            useFactory: (configService: ClientConfigService) => {
                const bookingClientOptions = configService.BookingClientOptions;
                // console.log('Creating ClientProxy with options:', usersClientOptions);
                return ClientProxyFactory.create(bookingClientOptions);
            },
            inject: [ClientConfigService],
        },
        {
            provide: USER_CLIENT,
            useFactory: (configService: ClientConfigService) => {
                const userClientOptions = configService.UsersClientOptions;
                // console.log('Creating ClientProxy with options:', usersClientOptions);
                return ClientProxyFactory.create(userClientOptions);
            },
            inject: [ClientConfigService],
        }
    ],
})
export class NotificationsModule { }
