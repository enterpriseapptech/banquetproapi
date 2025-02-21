import { Module } from '@nestjs/common';
import { CateringController } from './catering.controller';
import { CateringService } from './catering.service';
import { ConfigModule } from '@nestjs/config';
import { ClientConfigModule } from '../client-config/client-config.module';
import { DatabaseService } from '../database/database.service';
import { ClientConfigService } from '../client-config/client-config.service';
import { NOTIFICATION_CLIENT, USER_CLIENT } from './constants';
import { ClientProxyFactory } from '@nestjs/microservices';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        ClientConfigModule,
    ],
    controllers: [CateringController],
    providers: [
        CateringService,
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
