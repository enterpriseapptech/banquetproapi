import { Module } from '@nestjs/common';
import { CateringController, CateringSubscriptionController } from './catering.controller';
import { CateringService, CateringSubscriptionService } from './catering.service';
import { ConfigModule } from '@nestjs/config';
import { ClientConfigModule } from '../client-config/client-config.module';
import { DatabaseService } from '../database/database.service';
import { ClientConfigService } from '../client-config/client-config.service';
import { ClientProxyFactory } from '@nestjs/microservices';
import { USER_CLIENT, NOTIFICATION_CLIENT } from '@shared/contracts';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        ClientConfigModule,
    ],
    controllers: [CateringController, CateringSubscriptionController],
    providers: [
        CateringService,
        CateringSubscriptionService,
        DatabaseService,
        ClientConfigService,
        {
            provide: NOTIFICATION_CLIENT,
            useFactory: (configService: ClientConfigService) => {
                const NotificationsClientOptions = configService.NotificationsClientOptions;
                // console.log('Creating ClientProxy with options:', usersClientOptions);
                return ClientProxyFactory.create(NotificationsClientOptions);
            },
            inject: [ClientConfigService],
        }
        , {
            provide: USER_CLIENT,
            useFactory: (configService: ClientConfigService) => {
                const usersClientOptions = configService.UsersClientOptions;
                // console.log('Creating ClientProxy with options:', usersClientOptions);
                return ClientProxyFactory.create(usersClientOptions);
            },
            inject: [ClientConfigService],
        }
    ],
})
export class CateringModule { }
