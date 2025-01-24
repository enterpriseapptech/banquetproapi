import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ClientConfigModule } from './client-config/client-config.module';

@Module({
  imports: [
    UsersModule,
    ClientConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
