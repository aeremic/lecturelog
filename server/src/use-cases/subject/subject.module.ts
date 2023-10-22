import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectUseCases } from './subject.use-case';
import { SubjectController } from 'src/controllers/subject.controller';
import { SubjectRepositoryAbstract } from 'src/core/abstracts/repositories/subject.repository.abstract';
import { SubjectRepository } from 'src/infrastructure/data/repositories/subject.repository';
import { LoggerModule } from '../logger/logger.module';
import { UserModule } from '../user/user.module';
import { StudentsSubjectsModule } from '../students-subjects/students-subjects.module';
import { StudentsSubjects, Subject } from 'src/infrastructure/data/models';

@Module({
  imports: [
    forwardRef(() => UserModule),
    LoggerModule,
    StudentsSubjectsModule,
    TypeOrmModule.forFeature([Subject, StudentsSubjects]),
  ],
  providers: [
    SubjectUseCases,
    {
      provide: SubjectRepositoryAbstract,
      useClass: SubjectRepository,
    },
  ],
  controllers: [SubjectController],
  exports: [SubjectUseCases],
})
export class SubjectModule {}
