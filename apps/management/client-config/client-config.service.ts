import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config({ path: './apps/management/.env' });
@Injectable()
export class ClientConfigService {

    constructor(private configService: ConfigService) { }
    
    getUsersClientUrl(): string {
        return this.configService.get<string>('NOTIFICATIONURL')
    }

    getUsersClientQueue(): string {
        return this.configService.get<string>('NOTIFICATIONQUEUE')
    }



}
