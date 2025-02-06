import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ClientConfigModule } from './client-config/client-config.module';
import { EventcentersModule } from './eventcenters/eventcenters.module';

@Module({
  imports: [
    UsersModule,
    ClientConfigModule,
    EventcentersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
