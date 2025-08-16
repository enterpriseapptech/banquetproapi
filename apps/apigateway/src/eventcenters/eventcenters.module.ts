import { Module } from '@nestjs/common';
import { EventcentersService } from './eventcenters.service';
import { EventcentersController } from './eventcenters.controller';
import { ClientConfigModule } from '../client-config/client-config.module';
import { ClientConfigService } from '../client-config/client-config.service';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [ClientConfigModule, CloudinaryModule],
  controllers: [EventcentersController],
  providers: [
    EventcentersService,
    ClientConfigService,
  ],
})
export class EventcentersModule {}
