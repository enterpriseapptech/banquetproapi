import { Module } from '@nestjs/common';
import { EventcentersController } from './eventcenters.controller';
import { EventcentersService } from './eventcenters.service';
import { DatabaseService } from '../database/database.service';
import { ConfigModule } from '@nestjs/config';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ClientConfigModule } from '../client-config/client-config.module';
import { ClientConfigService } from '../client-config/client-config.service';
import { NOTIFICATION_CLIENT, USER_CLIENT } from '@shared/contracts';
import * as dotenv from 'dotenv';

dotenv.config({ path: './apps/apigateway/.env' });
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: './apps/apigateway/.env',
        }),
        ClientConfigModule,
    ],
    controllers: [EventcentersController],
    providers: [
        EventcentersService,
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
        ,{
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
export class EventcentersModule { }
