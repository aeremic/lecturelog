import { Module, forwardRef } from '@nestjs/common';
import { LectureUseCases } from './lecture.use-case';
import { LoggerModule } from '../logger/logger.module';
import { MessagingModule } from 'src/messaging/messaging.module';
import { RedisService } from 'src/services/external-cache/redis.service';
import { ExternalCacheSevice } from 'src/services/external-cache/external-cache.service';

@Module({
  imports: [forwardRef(() => MessagingModule), LoggerModule],
  providers: [
    LectureUseCases,
    {
      provide: ExternalCacheSevice,
      useClass: RedisService,
    },
  ],
  exports: [LectureUseCases],
})
export class LectureModule {}
