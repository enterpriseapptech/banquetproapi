import { Module } from '@nestjs/common';
import { ClientConfigService } from './client-config.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: '../../.env',
        }),
  ],
  providers: [ClientConfigService]
})
export class ClientConfigModule {}
