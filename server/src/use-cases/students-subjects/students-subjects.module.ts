import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from '../logger/logger.module';
import { StudentsSubjects } from '../../infrastructure/data/models/students-subjects.model';
import { StudentsSubjectsUseCases } from './students-subjects.use-case';
import { StudentsSubjectsRepositoryAbstract } from 'src/core/abstracts/repositories/students-subjects.repository.abstract';
import { StudentsSubjectsRepository } from 'src/infrastructure/data/repositories/students-subjects.repository';
import { StudentsSubjectsController } from 'src/controllers/students-subjects.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    LoggerModule,
    TypeOrmModule.forFeature([StudentsSubjects]),
  ],
  providers: [
    StudentsSubjectsUseCases,
    {
      provide: StudentsSubjectsRepositoryAbstract,
      useClass: StudentsSubjectsRepository,
    },
  ],
  controllers: [StudentsSubjectsController],
  exports: [StudentsSubjectsUseCases],
})
export class StudentsSubjectsModule {}
