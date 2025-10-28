import { Module } from '@nestjs/common';
import { EventcentersService } from './eventcenters.service';
import { EventcentersController } from './eventcenters.controller';
import { ClientConfigModule } from '../client-config/client-config.module';
import { ClientConfigService } from '../client-config/client-config.service';
import { EVENT_CENTER_CLIENT } from '@shared/contracts';
import { ClientProxyFactory } from '@nestjs/microservices';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [ClientConfigModule, CloudinaryModule],
  controllers: [EventcentersController],
  providers: [
    EventcentersService,
    ClientConfigService,
    {
      provide: EVENT_CENTER_CLIENT,
        useFactory: (configService: ClientConfigService) => {
          const eventCenterClientOptions = configService.EventCenterClientOptions;
          console.log('Creating eventCenterClientOptions ClientProxy with options:', eventCenterClientOptions);
          return ClientProxyFactory.create(eventCenterClientOptions);
        },
        inject: [ClientConfigService],
    }
  ],
  exports: [EventcentersService],
})
export class EventcentersModule {}
