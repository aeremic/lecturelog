import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { ExternalCacheSevice } from './external-cache.service';
import { RedisCommands } from './redis.constant';
import Redis from 'ioredis';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ReadWriteLock = require('rwlock');

@Injectable()
export class RedisService implements ExternalCacheSevice {
  private rwLock = null;

  constructor(@InjectRedis() private readonly redis: Redis) {
    this.rwLock = new ReadWriteLock();
  }

  get(id: string, path: string = undefined): Promise<any> {
    let result = undefined;
    const redisInstance = this.redis;

    if (id) {
      this.rwLock.readLock(function (release: () => void) {
        if (path) {
          result = redisInstance
            .call(RedisCommands.GET, id, path)
            .then((res: any) => {
              release();
              return res;
            })
            .catch(() => {
              release();
              return undefined;
            });
        } else {
          result = redisInstance
            .call(RedisCommands.GET, id)
            .then((res: any) => {
              release();
              return res;
            })
            .catch(() => {
              release();
              return undefined;
            });
        }
      });
    }

    return result;
  }

  set(id: string, object: any): Promise<any> {
    let result = undefined;
    const redisInstance = this.redis;

    if (id) {
      this.rwLock.writeLock(function (release: () => void) {
        result = redisInstance
          .call(RedisCommands.SET, id, '$', JSON.stringify(object))
          .then((res: any) => {
            release();
            return res;
          })
          .catch(() => {
            release();
            return undefined;
          });
      });
    }

    return result;
  }

  delete(id: string): Promise<any> {
    let result = undefined;
    const redisInstance = this.redis;

    if (id) {
      this.rwLock.writeLock(function (release: () => void) {
        result = redisInstance
          .call(RedisCommands.DELETE, id)
          .then((res) => {
            release();
            return res;
          })
          .catch(() => {
            release();
            return undefined;
          });
      });
    }

    return result;
  }
}
