import { Module } from '@nestjs/common';
import { NotificationService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { ClientConfigService } from '../client-config/client-config.service';
import { ClientProxyFactory } from '@nestjs/microservices';
import { NOTIFICATION_CLIENT, REVIEW_CLIENT } from '@shared/contracts';

@Module({
    controllers: [NotificationsController],
    providers: [NotificationService,


        ClientConfigService,
        {
            provide: NOTIFICATION_CLIENT,
            useFactory: (configService: ClientConfigService) => {
                const notificationClientOptions = configService.NotificationsClientOptions;
                // console.log('Creating ClientProxy with options:', usersClientOptions);
                return ClientProxyFactory.create(notificationClientOptions);
            },
            inject: [ClientConfigService],
        },
        {
            provide: REVIEW_CLIENT,
            useFactory: (configService: ClientConfigService) => {
                const notificationClientOptions = configService.NotificationsClientOptions;
                // console.log('Creating ClientProxy with options:', usersClientOptions);
                return ClientProxyFactory.create(notificationClientOptions);
            },
            inject: [ClientConfigService],
        },
    ],
})
export class NotificationsModule { }
