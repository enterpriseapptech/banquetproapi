import { isObservable, firstValueFrom } from 'rxjs';
import { CacheStore } from './cache.store';

type KeyFactory = (...args: any[]) => string;
type CacheKeyInput = string | KeyFactory;

const DEFAULT_TTL = 300_000; // 5 minutes in ms

/**
 * Caches the return value of the decorated method.
 *
 * @param key  Static string key or a factory `(...methodArgs) => string`
 * @param ttl  Time-to-live in milliseconds (default: 5 minutes)
 *
 * @example
 * // static key
 * @Cacheable(CACHE_KEYS.EVENTCENTERS_ALL)
 * async findAll(...) { ... }
 *
 * // dynamic key derived from the first method argument
 * @Cacheable((...args) => CACHE_KEYS.EVENTCENTER_ONE(args[0]))
 * async findOne(id: string) { ... }
 */
export function Cacheable(key: CacheKeyInput, ttl = DEFAULT_TTL) {
    return function (_target: object, _propertyKey: string, descriptor: PropertyDescriptor) {
        const original = descriptor.value;

        descriptor.value = async function (...args: any[]) {
            const cacheKey = typeof key === 'function' ? key(...args) : key;
            const cached = await CacheStore.manager.get(cacheKey);
            if (cached !== undefined && cached !== null) return cached;

            const raw = original.apply(this, args);
            const result = isObservable(raw) ? await firstValueFrom(raw) : await raw;
            await CacheStore.manager.set(cacheKey, result, ttl);
            return result;
        };

        return descriptor;
    };
}

/**
 * Evicts one or more cache entries after the decorated method resolves.
 *
 * Each key can be a static string or a factory `(...methodArgs) => string`.
 *
 * @example
 * // evict a static key and a dynamic key built from the first argument
 * @CacheEvict(
 *   CACHE_KEYS.EVENTCENTERS_ALL,
 *   CACHE_KEYS.EVENTCENTERS_BOOKMARKS,
 *   (...args) => CACHE_KEYS.EVENTCENTER_ONE(args[0]),
 * )
 * async update(id: string, dto: UpdateEventCenterDto) { ... }
 */
export function CacheEvict(...keys: CacheKeyInput[]) {
    return function (_target: object, _propertyKey: string, descriptor: PropertyDescriptor) {
        const original = descriptor.value;

        descriptor.value = async function (...args: any[]) {
            const raw = original.apply(this, args);
            const result = isObservable(raw) ? await firstValueFrom(raw) : await raw;

            await Promise.all(
                keys.map((key) => {
                    const cacheKey = typeof key === 'function' ? key(...args) : key;
                    return CacheStore.manager.del(cacheKey);
                }),
            );

            return result;
        };

        return descriptor;
    };
}
