import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { RedisCommands } from 'src/core/common/constants/redis-commands.constant';
import { ExternalCacheSevice } from './external-cache.service';

@Injectable()
export class RedisService implements ExternalCacheSevice {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  get(id: string): Promise<any> {
    return this.redis.call(RedisCommands.GET, id);
  }

  set(id: string, object: any): Promise<any> {
    return this.redis.call(RedisCommands.SET, id, '$', JSON.stringify(object));
  }

  delete(id: string): Promise<any> {
    return this.redis.call(RedisCommands.DELETE, id);
  }
}
