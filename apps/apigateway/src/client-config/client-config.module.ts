import { Module } from '@nestjs/common';
import { ClientConfigService } from './client-config.service';
import { ConfigModule } from '@nestjs/config';
import { USER_CLIENT } from '@shared/contracts';
import { ClientProxyFactory } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: '../../.env',
        }),
  ],
  providers: [
    ClientConfigService,
    {
            provide: USER_CLIENT,
            useFactory: (configService: ClientConfigService) => {
                const usersClientOptions = configService.clientOptions;
                // console.log('Creating ClientProxy with options:', usersClientOptions);
                return ClientProxyFactory.create(usersClientOptions);
            },
            inject: [ClientConfigService],
        }
  ],
  exports: [USER_CLIENT, ClientConfigService] // <-- Export the provider
})
export class ClientConfigModule {}
