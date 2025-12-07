import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModuleAsyncOptions } from '@nestjs/cache-manager/dist/interfaces/cache-module.interface';
import KeyvRedis, { Keyv } from '@keyv/redis';
import { CacheableMemory } from 'cacheable';
import { CacheProviderType } from '../enums/environment.enum';

export const getCacheProvider: () => CacheModuleAsyncOptions = () => {
  const cache_type =
    process.env.CACHE__PROVIDER.toUpperCase() as CacheProviderType;
  console.log('Using cache provider:', cache_type);
  switch (cache_type) {
    case CacheProviderType.MEMORY:
      return cacheLocalProvider;
    case CacheProviderType.REDIS:
      const redis_url = process.env.CACHE__REDIS_URL;
      if (!redis_url)
        throw new Error(
          'Redis Cache Provider is enabled but CACHE__REDIS_URL is not set.',
        );
      throw new Error(
        "Redis Cache Provider is disabled due to it isn't tested enough yet.",
      );
      return cacheRedisProvider;
    default:
      throw new Error(`Unknown cache type "${cache_type}"`);
  }
};

const cacheLocalProvider: CacheModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (config: ConfigService) => ({
    ttl: config.get('cache.ttl'),
  }),
  inject: [ConfigService],
};

const cacheRedisProvider: CacheModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (config: ConfigService) => ({
    stores: [
      new Keyv({
        store: new CacheableMemory({}),
      }),
      new KeyvRedis(config.get('cache.redisUrl')),
    ],
  }),
  inject: [ConfigService],
};
