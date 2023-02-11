import { Cache, Store } from 'cache-manager';
import { RedisClient } from 'redis';

export interface RedisCache extends Cache {
  store: RedisStore;
}

export interface RedisStore extends Store {
  name: 'redis';
  getClient: () => RedisClient;
  isCacheableValue: (value: any) => boolean;
}
