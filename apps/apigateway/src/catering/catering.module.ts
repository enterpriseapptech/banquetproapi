import { Module } from '@nestjs/common';
import { CateringService } from './catering.service';
import { CateringController } from './catering.controller';
import { ClientConfigService } from '../client-config/client-config.service';
import { CATERING_CLIENT } from '@shared/contracts';
import { ClientConfigModule } from '../client-config/client-config.module';
import { ClientProxyFactory } from '@nestjs/microservices';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { ManagementModule } from '../management/management.module';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [ClientConfigModule, CloudinaryModule, ManagementModule, UsersModule],
    controllers: [CateringController],
    providers: [
        CateringService,
        ClientConfigService,
        {
            provide: CATERING_CLIENT,
            useFactory: (configService: ClientConfigService) => {
                const CateringClientOptions = configService.CateringClientOptions;
                return ClientProxyFactory.create(CateringClientOptions);
            },
            inject: [ClientConfigService],
        }
    ],
    exports: [CateringService],
})
export class CateringModule { }
