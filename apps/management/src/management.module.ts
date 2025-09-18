import { Module } from '@nestjs/common';
import { AppSettingController,  CountryController, StateController } from './management.controller';
import { AppSettingService, CountryService,  StateService } from './management.service';
import { DatabaseService } from '../database/database.service';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config({ path: './apps/management/.env' });
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: './apps/management/.env',
        }),

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
        DatabaseService,
    ],
})
export class ManagementModule { }
