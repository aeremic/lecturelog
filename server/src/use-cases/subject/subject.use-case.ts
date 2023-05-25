import { Inject, Injectable } from '@nestjs/common';
import { SubjectRepositoryAbstract } from 'src/core/abstracts/repositories/subject.repository.abstract';
import { SubjectEntity } from 'src/core/entities';
import { GenericUseCases } from '../generic.use-case';
import { LoggerUseCases } from '../logger/logger.use-case';

@Injectable()
export class SubjectUseCases extends GenericUseCases<SubjectEntity>{
    @Inject(SubjectRepositoryAbstract)
    private subjectRepository: SubjectRepositoryAbstract

    @Inject(LoggerUseCases)
    private loggerUseCases: LoggerUseCases;

    async get(): Promise<SubjectEntity[]> {
        return super.get(this.subjectRepository, this.loggerUseCases);
    }

    async getById(id: number): Promise<SubjectEntity> {
        return super.getById(this.subjectRepository, this.loggerUseCases, id);
    }

    async create(subjectEntity: SubjectEntity): Promise<SubjectEntity> {
        return super.create(this.subjectRepository, this.loggerUseCases, subjectEntity);
    }

    async update(subjectEntity: SubjectEntity): Promise<SubjectEntity> {
        return super.update(this.subjectRepository, this.loggerUseCases, subjectEntity);
    }

    async delete(id: number): Promise<number> {
        return super.delete(this.subjectRepository, this.loggerUseCases, id);
    }
}