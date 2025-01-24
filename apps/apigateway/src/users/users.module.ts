import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientProxyFactory} from '@nestjs/microservices';
import { ClientConfigModule } from '../client-config/client-config.module';
import { ClientConfigService } from '../client-config/client-config.service';
import { USER_CLIENT } from './constants';

@Module({
  imports: [
    ClientConfigModule,
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    ClientConfigService,
    {
      provide: USER_CLIENT,
      useFactory: (configService: ClientConfigService) => {
        const usersClientOptions = configService.UsersClientOptions;
        console.log('Creating ClientProxy with options:', usersClientOptions);
        return ClientProxyFactory.create(usersClientOptions);
      },
      inject: [ClientConfigService],
    }
  ],
})
export class UsersModule {}
