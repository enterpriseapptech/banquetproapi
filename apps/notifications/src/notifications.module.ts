import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ClientConfigModule } from '../client-config/client-config.module';
import { ClientConfigService } from '../client-config/client-config.service';
import { DatabaseService } from '../database/database.service';
import { ConfigModule } from '@nestjs/config';
import { ClientProxyFactory } from '@nestjs/microservices';
import { USER_CLIENT } from '@shared/contracts';
import * as dotenv from 'dotenv';

dotenv.config({ path: './apps/notifications/.env' });
@Module({
    imports: [
        ConfigModule.forRoot({
                    isGlobal: true,
                    envFilePath: '../env',
                }),
        ClientConfigModule,
        MailerModule.forRoot({
            transport: {
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS
                },
            }
        }),
    ],
    controllers: [NotificationsController],
    providers: [
        NotificationsService,
        DatabaseService,
        ClientConfigService,
        {
            provide: USER_CLIENT,
            useFactory: (configService: ClientConfigService) => {
                return ClientProxyFactory.create(configService.UsersClientOptions);
            },
            inject: [ClientConfigService],
        },
    ],
})
export class NotificationsModule { }
