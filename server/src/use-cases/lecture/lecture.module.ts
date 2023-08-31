import { Module, forwardRef } from '@nestjs/common';
import { LectureUseCases } from './lecture.use-case';
import { LoggerModule } from '../logger/logger.module';
import { MessagingModule } from 'src/messaging/messaging.module';
import { RedisModule } from '../../services/redis.module';

@Module({
    imports: [forwardRef(() => MessagingModule), RedisModule, LoggerModule],
    providers: [
        LectureUseCases,
    ],
    exports: [LectureUseCases]
})
export class LectureModule { }