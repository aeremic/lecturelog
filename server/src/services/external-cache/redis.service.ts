import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { ExternalCacheSevice } from './external-cache.service';
import { RedisCommands } from './redis.constant';

@Injectable()
export class RedisService implements ExternalCacheSevice {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  get(id: string, path: string = undefined): Promise<any> {
    if (path) {
      return this.redis.call(RedisCommands.GET, id, path);
    } else {
      return this.redis.call(RedisCommands.GET, id);
    }
  }

  set(id: string, object: any): Promise<any> {
    return this.redis.call(RedisCommands.SET, id, '$', JSON.stringify(object));
  }

  delete(id: string): Promise<any> {
    return this.redis.call(RedisCommands.DELETE, id);
  }
}
