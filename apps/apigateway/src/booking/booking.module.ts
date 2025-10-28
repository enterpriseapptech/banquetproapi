import { Module } from '@nestjs/common';
import { BookingService, RequestQuoteService, TimeSlotService } from './booking.service';
import { BookingController, RequestQuoteController, TimeSlotController } from './booking.controller';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ClientConfigService } from '../client-config/client-config.service';
import { BOOKING_CLIENT } from '@shared/contracts';
import { ClientConfigModule } from '../client-config/client-config.module';
import { UsersModule } from '../users/users.module';
import { CateringModule } from '../catering/catering.module';
import { EventcentersModule } from '../eventcenters/eventcenters.module';

@Module({
    imports:[ClientConfigModule, UsersModule, CateringModule, EventcentersModule],
    controllers: [BookingController, TimeSlotController, RequestQuoteController],
    providers: [
        BookingService,
        RequestQuoteService,
        TimeSlotService,
        ClientConfigService,
        {
            provide: BOOKING_CLIENT,
            useFactory: (configService: ClientConfigService) => {
                const bookingClientOptions = configService.BookingClientOptions;
                console.log('Creating bookingClientOptions ClientProxy with options:', bookingClientOptions);
                return ClientProxyFactory.create(bookingClientOptions);
            },
            inject: [ClientConfigService],
        }

    ],
    exports: [BookingService],
})
export class BookingModule { }
