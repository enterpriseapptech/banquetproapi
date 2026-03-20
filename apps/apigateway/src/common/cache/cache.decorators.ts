import { isObservable, firstValueFrom, from } from 'rxjs';
import { CacheStore } from './cache.store';

type KeyFactory = (...args: any[]) => string;
type CacheKeyInput = string | KeyFactory;

const DEFAULT_TTL = 300_000; // 5 minutes in ms

/**
 * Caches the return value of the decorated method.
 *
 * Preserves the original return type:
 * - If the method returns an Observable, the decorated method also returns an Observable.
 * - If the method returns a Promise, the decorated method also returns a Promise.
 *
 * This means callers using firstValueFrom() or await continue to work unchanged.
 *
 * @param key  Static string key or a factory `(...methodArgs) => string`
 * @param ttl  Time-to-live in milliseconds (default: 5 minutes)
 */
export function Cacheable(key: CacheKeyInput, ttl = DEFAULT_TTL) {
    return function (_target: object, _propertyKey: string, descriptor: PropertyDescriptor) {
        const original = descriptor.value;

        descriptor.value = function (...args: any[]) {
            const cacheKey = typeof key === 'function' ? key(...args) : key;
            const raw = original.apply(this, args);
            const returnsObservable = isObservable(raw);

            const doWork = async () => {
                const cached = await CacheStore.manager.get(cacheKey);
                if (cached !== undefined && cached !== null) return cached;

                const result = returnsObservable ? await firstValueFrom(raw) : await raw;
                await CacheStore.manager.set(cacheKey, result, ttl);
                return result;
            };

            return returnsObservable ? from(doWork()) : doWork();
        };

        return descriptor;
    };
}

/**
 * Evicts cache entries after the decorated method resolves.
 *
 * Preserves the original return type (Observable or Promise).
 *
 * Keys ending with ':*' are treated as prefixes — all stored keys that start
 * with that prefix are deleted. Use this when @Cacheable uses a dynamic key
 * (e.g. one that includes query params).
 *
 * @example
 * @CacheEvict(
 *   `${CACHE_KEYS.EVENTCENTERS_ALL}:*`,
 *   CACHE_KEYS.EVENTCENTERS_BOOKMARKS,
 *   (...args) => CACHE_KEYS.EVENTCENTER_ONE(args[0]),
 * )
 * update(id: string, dto: UpdateEventCenterDto) { ... }
 */
export function CacheEvict(...keys: CacheKeyInput[]) {
    return function (_target: object, _propertyKey: string, descriptor: PropertyDescriptor) {
        const original = descriptor.value;

        descriptor.value = function (...args: any[]) {
            const raw = original.apply(this, args);
            const returnsObservable = isObservable(raw);

            const doWork = async () => {
                const result = returnsObservable ? await firstValueFrom(raw) : await raw;

                await Promise.all(
                    keys.map(async (key) => {
                        const cacheKey = typeof key === 'function' ? key(...args) : key;

                        if (cacheKey.endsWith(':*')) {
                            const prefix = cacheKey.slice(0, -1);
                            const store = (CacheStore.manager as any).store;
                            if (store && typeof store.keys === 'function') {
                                const allKeys: string[] = await store.keys();
                                await Promise.all(
                                    allKeys
                                        .filter((k) => k.startsWith(prefix))
                                        .map((k) => CacheStore.manager.del(k)),
                                );
                            }
                        } else {
                            return CacheStore.manager.del(cacheKey);
                        }
                    }),
                );

                return result;
            };

            return returnsObservable ? from(doWork()) : doWork();
        };

        return descriptor;
    };
}
