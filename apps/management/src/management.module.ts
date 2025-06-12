import { Module } from '@nestjs/common';
import { AppSettingController, CityController, CountryController, FeaturedPlanController, FeesController, ServiceCategoryController, ServiceController, ServiceSubCategoryController, StateController } from './management.controller';
import { AppSettingService, CityService, CountryService, FeaturedPlanService, FeesService, ServiceCategoryService, ServiceService, ServiceSubCategoryService, StateService } from './management.service';
import { DatabaseService } from '../database/database.service';
import { ClientConfigService } from '../client-config/client-config.service';
import { ClientConfigModule } from '../client-config/client-config.module';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { ClientProxyFactory } from '@nestjs/microservices';
import { NOTIFICATION_CLIENT, USER_CLIENT } from '@shared/contracts';

dotenv.config({ path: './apps/management/.env' });
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        ClientConfigModule,

    ],
    controllers: [
        AppSettingController,
        ServiceCategoryController,
        ServiceSubCategoryController,
        ServiceController,
        FeesController,
        FeaturedPlanController,
        CountryController,
        StateController,
        CityController,
    ],
    providers: [
        AppSettingService,
        ServiceCategoryService,
        ServiceSubCategoryService,
        ServiceService,
        FeesService,
        FeaturedPlanService,
        CityService,
        CountryService,
        StateService,
        DatabaseService,
        ClientConfigService,
        {
            provide: USER_CLIENT,
            useFactory: (configService: ClientConfigService) => {
                const managementClientOptions = configService.UsersClientOptions;
                // console.log('Creating ClientProxy with options:', usersClientOptions);
                return ClientProxyFactory.create(managementClientOptions);
            },
            inject: [ClientConfigService],
        },
        {
            provide: NOTIFICATION_CLIENT,
            useFactory: (configService: ClientConfigService) => {
                const managementClientOptions = configService.NotificationsClientOptions;
                // console.log('Creating ClientProxy with options:', usersClientOptions);
                return ClientProxyFactory.create(managementClientOptions);
            },
            inject: [ClientConfigService],
        },
    ],
})
export class ManagementModule { }
