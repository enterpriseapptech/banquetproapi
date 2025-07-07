import { Module } from '@nestjs/common';
import { BookingService, TimeSlotService } from './booking.service';
import { BookingController, TimeSlotController } from './booking.controller';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ClientConfigService } from '../client-config/client-config.service';
import { BOOKING_CLIENT } from '@shared/contracts';
import { ClientConfigModule } from '../client-config/client-config.module';

@Module({
    imports:[ClientConfigModule],
    controllers: [BookingController, TimeSlotController],
    providers: [
        BookingService,
        TimeSlotService,
        ClientConfigService,
        {
            provide: BOOKING_CLIENT,
            useFactory: (configService: ClientConfigService) => {
                const bookingClientOptions = configService.BookingClientOptions;
                // console.log('Creating bookingClientOptions ClientProxy with options:', bookingClientOptions);
                return ClientProxyFactory.create(bookingClientOptions);
            },
            inject: [ClientConfigService],
        }

    ],
})
export class BookingModule { }
