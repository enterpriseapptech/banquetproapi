import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from '../database/database.service';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ClientConfigModule } from '../client-config/client-config.module';
import { ClientConfigService } from '../client-config/client-config.service';
import { NOTIFICATION_CLIENT } from './constants';
import { JwtModule } from '@nestjs/jwt';



@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        ClientConfigModule,
        JwtModule.register({
            secret: process.env.JWT_ACCESS_TOKEN_SECRET, // Ensure this matches your configuration
            signOptions: {
                expiresIn:
                    process.env.JWT_EXPIRES_IN
            },
        }),
    ],
    controllers: [UsersController],
    providers: [
        UsersService,
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
        },
        
    ],
})
export class UsersModule { }
