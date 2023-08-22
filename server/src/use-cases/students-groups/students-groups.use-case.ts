import { Inject, Injectable } from '@nestjs/common';
import { GenericUseCases } from '../generic.use-case';
import { StudentsSubjectGroupsEntity } from 'src/core/entities';
import { StudentsGroupsRepositoryAbstract } from 'src/core/abstracts/repositories/students-groups.repository.abstract';
import { LoggerUseCases } from '../logger/logger.use-case';

@Injectable()
export class StudentsGroupsUseCases extends GenericUseCases<StudentsSubjectGroupsEntity> {
    @Inject(StudentsGroupsRepositoryAbstract)
    private studentsGroupsRepository: StudentsGroupsRepositoryAbstract

    @Inject(LoggerUseCases)
    private loggerUseCases: LoggerUseCases;

    async createOrUpdate(studentsSubjectGroupsEntity: StudentsSubjectGroupsEntity): Promise<StudentsSubjectGroupsEntity> {
        return super.createOrUpdate(this.studentsGroupsRepository, this.loggerUseCases, studentsSubjectGroupsEntity);
    }
}