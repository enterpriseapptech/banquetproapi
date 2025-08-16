import { Module } from '@nestjs/common';
import { CountryService,  StateService } from './management.service';
import { CountryController, StateController } from './management.controller';
import { ClientConfigModule } from '../client-config/client-config.module';
import { ClientConfigService } from '../client-config/client-config.service';
import { MANAGMENT_CLIENT, } from '@shared/contracts';
import { ClientProxyFactory } from '@nestjs/microservices';

@Module({
    imports: [
        ClientConfigModule,
    ],
    controllers: [
       
        CountryController,
        StateController,

    ],
    providers: [
        
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
})
export class ManagementModule { }
