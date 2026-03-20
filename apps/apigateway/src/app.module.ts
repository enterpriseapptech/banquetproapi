import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { CacheModule } from '@nestjs/cache-manager';
import { CorrelationIdMiddleware } from './common/middleware/correlation-id.middleware';
import { CacheStore } from './common/cache/cache.store';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    CacheModule.register({ isGlobal: true, ttl: 300, max: 100 }),
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
  providers: [AppService, CacheStore],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware).forRoutes('*');
  }
}
