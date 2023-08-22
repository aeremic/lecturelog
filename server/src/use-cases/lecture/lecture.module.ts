import { Module, forwardRef } from '@nestjs/common';
import { LectureUseCases } from './lecture.use-case';
import { LoggerModule } from '../logger/logger.module';
import { MessagingModule } from 'src/messaging/messaging.module';

@Module({
    imports: [forwardRef(() => MessagingModule), LoggerModule],
    providers: [
        LectureUseCases,
    ],
    exports: [LectureUseCases]
})
export class LectureModule { }