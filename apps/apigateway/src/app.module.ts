import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ClientConfigModule } from './client-config/client-config.module';
import { EventcentersModule } from './eventcenters/eventcenters.module';
import { BookingModule } from './booking/booking.module';
import { CateringModule } from './catering/catering.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    UsersModule,
    ClientConfigModule,
    EventcentersModule,
    BookingModule,
    CateringModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
