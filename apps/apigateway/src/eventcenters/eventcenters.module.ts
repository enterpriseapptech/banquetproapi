import { Module } from '@nestjs/common';
import { EventcentersService } from './eventcenters.service';
import { EventcentersController } from './eventcenters.controller';
import { ClientConfigModule } from '../client-config/client-config.module';
import { ClientConfigService } from '../client-config/client-config.service';
import { EVENT_CENTER_CLIENT } from './constants';
import { ClientProxyFactory } from '@nestjs/microservices';

@Module({
  imports: [ClientConfigModule,],
  controllers: [EventcentersController],
  providers: [
    EventcentersService,
    ClientConfigService,
    {
      provide: EVENT_CENTER_CLIENT,
        useFactory: (configService: ClientConfigService) => {
          const eventCenterClientOptions = configService.EventCenterClientOptions;
            // console.log('Creating ClientProxy with options:', usersClientOptions);
          return ClientProxyFactory.create(eventCenterClientOptions);
        },
        inject: [ClientConfigService],
    }
  ],
})
export class EventcentersModule {}
