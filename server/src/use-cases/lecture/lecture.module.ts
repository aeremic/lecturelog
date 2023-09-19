import { Module, forwardRef } from '@nestjs/common';
import { LectureUseCases } from './lecture.use-case';
import { LoggerModule } from '../logger/logger.module';
import { MessagingModule } from 'src/messaging/messaging.module';
import { ExternalCache } from 'src/services/external-cache-service/external-cache.service';
import { RedisService } from 'src/services/external-cache-service/redis.service';

@Module({
    imports: [forwardRef(() => MessagingModule), LoggerModule],
    providers: [
        LectureUseCases,
        {
            provide: ExternalCache,
            useClass: RedisService,
        }],
    exports: [LectureUseCases]
})
export class LectureModule { }