import { Module } from '@nestjs/common';
import { EventcentersController } from './eventcenters.controller';
import { EventcentersService } from './eventcenters.service';

@Module({
  imports: [],
  controllers: [EventcentersController],
  providers: [EventcentersService],
})
export class EventcentersModule {}
