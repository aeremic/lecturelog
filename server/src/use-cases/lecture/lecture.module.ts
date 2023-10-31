import { Module, forwardRef } from '@nestjs/common';
import { LectureUseCases } from './lecture.use-case';
import { LoggerModule } from '../logger/logger.module';
import { MessagingModule } from 'src/messaging/messaging.module';
import { RedisService } from 'src/services/external-cache/redis.service';
import { ExternalCacheSevice } from 'src/services/external-cache/external-cache.service';
import { LectureController } from 'src/controllers/lecture.controller';
import { UserModule } from '../user/user.module';
import { SubjectModule } from '../subject/subject.module';
import { StudentsSubjectsModule } from '../students-subjects/students-subjects.module';

@Module({
  imports: [
    forwardRef(() => MessagingModule),
    forwardRef(() => UserModule),
    SubjectModule,
    StudentsSubjectsModule,
    LoggerModule,
  ],
  providers: [
    LectureUseCases,
    {
      provide: ExternalCacheSevice,
      useClass: RedisService,
    },
  ],
  controllers: [LectureController],
  exports: [LectureUseCases],
})
export class LectureModule {}
