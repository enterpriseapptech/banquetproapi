import { Module } from '@nestjs/common';
import { EventcentersService } from './eventcenters.service';
import { EventcentersController } from './eventcenters.controller';

@Module({
  controllers: [EventcentersController],
  providers: [EventcentersService],
})
export class EventcentersModule {}
