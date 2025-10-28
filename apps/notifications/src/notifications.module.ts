import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ClientConfigModule } from '../client-config/client-config.module';
import { DatabaseService } from '../database/database.service';
import { ConfigModule } from '@nestjs/config';
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
                // secure: process.env.SMTP_SECURITY,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS
                },
                // connectionTimeout: 10000, // 10 seconds
            }
        }),
    ],
    controllers: [NotificationsController, 
        // ReviewController
    ],
    providers: [
        // ReviewService,
        NotificationsService,
        DatabaseService,
        
    ],
})
export class NotificationsModule { }
