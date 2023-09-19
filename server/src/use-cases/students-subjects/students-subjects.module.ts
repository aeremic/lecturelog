import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from '../logger/logger.module';
import { StudentsSubjects } from '../../infrastructure/data/models/students-subjects.model';
import { StudentsSubjectsUseCases } from './students-subjects.use-case';
import { StudentsSubjectsRepositoryAbstract } from 'src/core/abstracts/repositories/students-subjects.repository.abstract';
import { StudentsSubjectsRepository } from 'src/infrastructure/data/repositories/students-subjects.repository';

@Module({
    imports: [LoggerModule, TypeOrmModule.forFeature([StudentsSubjects])],
    providers: [
        StudentsSubjectsUseCases,
        {
            provide: StudentsSubjectsRepositoryAbstract,
            useClass: StudentsSubjectsRepository
        }
    ],
    exports: [StudentsSubjectsUseCases]
})
export class StudentsSubjectsModule { }