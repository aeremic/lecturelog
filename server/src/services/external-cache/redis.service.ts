import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { ExternalCacheSevice } from './external-cache.service';
import { RedisCommands } from './redis.constant';
import Redis from 'ioredis';
import { Mutex } from 'async-mutex';

@Injectable()
export class RedisService implements ExternalCacheSevice {
  private mutex = null;

  constructor(@InjectRedis() private readonly redis: Redis) {
    this.mutex = new Mutex();
  }

  async get(id: string, path: string = undefined): Promise<any> {
    let result = undefined;
    const redisInstance = this.redis;

    if (id) {
      await this.mutex.runExclusive(async () => {
        if (path) {
          result = await redisInstance.call(RedisCommands.GET, id, path);
        } else {
          result = await redisInstance.call(RedisCommands.GET, id);
        }
      });
    }

    return result;
  }

  async set(id: string, object: any): Promise<any> {
    let result = undefined;
    const redisInstance = this.redis;

    if (id) {
      await this.mutex.runExclusive(async () => {
        result = await redisInstance.call(
          RedisCommands.SET,
          id,
          '$',
          JSON.stringify(object),
        );
      });
    }

    return result;
  }

  async delete(id: string): Promise<any> {
    let result = undefined;
    const redisInstance = this.redis;

    if (id) {
      await this.mutex.runExclusive(async () => {
        result = await redisInstance.call(RedisCommands.DELETE, id);
      });
    }

    return result;
  }
}
