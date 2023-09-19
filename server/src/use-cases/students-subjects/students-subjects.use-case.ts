import { Inject, Injectable } from '@nestjs/common';
import { GenericUseCases } from '../generic.use-case';
import { StudentsSubjectsRepositoryAbstract } from 'src/core/abstracts/repositories/students-subjects.repository.abstract';
import { LoggerUseCases } from '../logger/logger.use-case';
import { StudentsSubjectsEntity } from 'src/core/entities/students-subjects.entity';

@Injectable()
export class StudentsSubjectsUseCases extends GenericUseCases<StudentsSubjectsEntity> {
    @Inject(StudentsSubjectsRepositoryAbstract)
    private studentsSubjectsRepository: StudentsSubjectsRepositoryAbstract

    @Inject(LoggerUseCases)
    private loggerUseCases: LoggerUseCases;

    async createOrUpdate(studentsSubjectsEntity: StudentsSubjectsEntity): Promise<StudentsSubjectsEntity> {
        return super.createOrUpdate(this.studentsSubjectsRepository, this.loggerUseCases, studentsSubjectsEntity);
    }
}