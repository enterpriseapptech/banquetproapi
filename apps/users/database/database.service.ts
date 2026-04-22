import { Injectable, OnModuleInit, OnApplicationShutdown } from '@nestjs/common';
import { PrismaClient } from '../prisma/@prisma/users';


@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit, OnApplicationShutdown {
    async onModuleInit() {
        await this.$connect();
    }

    async onApplicationShutdown(signal?: string) {
        console.log('Shutting down DB...', signal);
        await this.$disconnect(); 
    }
}
