import { Module } from '@nestjs/common';
import { AppSettingService, CountryService,  StateService } from './management.service';
import { CountryController, StateController } from './management.controller';
import { ClientConfigModule } from '../client-config/client-config.module';
import { ClientConfigService } from '../client-config/client-config.service';
import { MANAGMENT_CLIENT} from '@shared/contracts';
import { ClientProxyFactory } from '@nestjs/microservices';
import { AppSettingController } from './management.controller';

@Module({
    imports: [
        ClientConfigModule,
    ],
    controllers: [
       AppSettingController,
        CountryController,
        StateController,

    ],
    providers: [
        AppSettingService,
        CountryService,
        StateService,
        ClientConfigService,
        {
            provide: MANAGMENT_CLIENT,
            useFactory: (configService: ClientConfigService) => {
                const managementClientOptions = configService.ManagementClientOptions;
                // console.log('Creating ClientProxy with options:', usersClientOptions);
                return ClientProxyFactory.create(managementClientOptions);
            },
            inject: [ClientConfigService],
        },
          
    ],
    exports: [StateService, AppSettingService]
})
export class ManagementModule { }
