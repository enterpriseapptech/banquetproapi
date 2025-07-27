import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ClientConfigModule } from './client-config/client-config.module';
import { EventcentersModule } from './eventcenters/eventcenters.module';
import { BookingModule } from './booking/booking.module';
import { CateringModule } from './catering/catering.module';
import { PaymentModule } from './payment/payment.module';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ManagementModule } from './management/management.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UsersModule,
    ManagementModule,
    ClientConfigModule,
    EventcentersModule,
    BookingModule,
    CateringModule,
    PaymentModule,
    CloudinaryModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
