import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

/**
 * Holds the Cache instance in a static property so that plain TypeScript
 * decorators (which have no access to NestJS DI) can reach it at call time.
 *
 * Must be registered as a provider in AppModule so NestJS instantiates it
 * and triggers onModuleInit before any requests are handled.
 */
@Injectable()
export class CacheStore implements OnModuleInit {
    private static _manager: Cache;

    constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

    onModuleInit() {
        CacheStore._manager = this.cache;
    }

    static get manager(): Cache {
        return CacheStore._manager;
    }
}
