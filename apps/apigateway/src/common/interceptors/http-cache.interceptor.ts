import { CACHE_KEY_METADATA, CacheInterceptor } from '@nestjs/cache-manager';
import { ExecutionContext, Injectable } from '@nestjs/common';

/**
 * Extends NestJS's built-in CacheInterceptor so that routes decorated with
 * @CacheKey('my-key') use that explicit key instead of the request URL.
 *
 * Without this, NestJS ignores @CacheKey on HTTP routes and always derives
 * the cache key from req.url, making shared / user-agnostic keys impossible.
 *
 * @CacheTTL is handled by the base class automatically.
 */
@Injectable()
export class HttpCacheInterceptor extends CacheInterceptor {
    trackBy(context: ExecutionContext): string | undefined {
        const explicitKey = this.reflector.get<string>(
            CACHE_KEY_METADATA,
            context.getHandler(),
        );

        return explicitKey ?? super.trackBy(context);
    }
}
