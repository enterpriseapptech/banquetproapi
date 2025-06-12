import { Module } from '@nestjs/common';
import { CityService, CountryService, FeaturedPlanService, FeesService, ServiceCategoryService, ServiceService, ServiceSubCategoryService, StateService } from './management.service';
import { CityController, CountryController, ServiceCategoryController, ServiceController, ServiceSubCategoryController, StateController } from './management.controller';
import { ClientConfigModule } from '../client-config/client-config.module';
import { ClientConfigService } from '../client-config/client-config.service';
import { COUNTRY_CLIENT, APP_SETTINGS_CLIENT, STATE_CLIENT } from '@shared/contracts';
import { ClientProxyFactory } from '@nestjs/microservices';

@Module({
    imports: [
        ClientConfigModule,
    ],
    controllers: [
        ServiceCategoryController,
        ServiceSubCategoryController,
        ServiceController,
        CountryController,
        StateController,
        CityController
    ],
    providers: [
        ServiceCategoryService,
        ServiceSubCategoryService,
        ServiceService,
        CountryService,
        StateService,
        CityService,
        FeesService,
        FeaturedPlanService,
        ClientConfigService,
        {
            provide: COUNTRY_CLIENT,
            useFactory: (configService: ClientConfigService) => {
                const managementClientOptions = configService.ManagementClientOptions;
                // console.log('Creating ClientProxy with options:', usersClientOptions);
                return ClientProxyFactory.create(managementClientOptions);
            },
            inject: [ClientConfigService],
        },
        {
            provide: STATE_CLIENT,
            useFactory: (configService: ClientConfigService) => {
                const managementClientOptions = configService.ManagementClientOptions;
                // console.log('Creating ClientProxy with options:', usersClientOptions);
                return ClientProxyFactory.create(managementClientOptions);
            },
            inject: [ClientConfigService],
        },
        {
            provide: APP_SETTINGS_CLIENT,
            useFactory: (configService: ClientConfigService) => {
                const managementClientOptions = configService.ManagementClientOptions;
                console.log('Creating ClientProxy with management options:', managementClientOptions);
                return ClientProxyFactory.create(managementClientOptions);
            },
            inject: [ClientConfigService],
        }
        
        
        
    ],
})
export class ManagementModule { }
