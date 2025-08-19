import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ClientConfigModule } from '../client-config/client-config.module';
import { ClientConfigService } from '../client-config/client-config.service';
import { USER_CLIENT } from '@shared/contracts';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../jwt/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config({ path: './apps/apigateway/.env' });
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: './apps/apigateway/.env',
        }),
        ClientConfigModule,
        JwtModule.register({
            secret: process.env.JWT_ACCESS_TOKEN_SECRET,
            signOptions: {
                expiresIn:
                    process.env.JWT_EXPIRES_IN
            },
        }),
    ],
    controllers: [UsersController],
    providers: [
        UsersService,
        ClientConfigService,
        JwtStrategy,
        {
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
export class UsersModule { }
