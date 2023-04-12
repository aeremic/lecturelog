import { Inject, Injectable } from '@nestjs/common';
import { SubjectRepositoryAbstract } from 'src/core/abstracts/repositories/subject.repository.abstract';
import { SubjectEntity } from 'src/core/entities';
import { GenericUseCases } from '../generic.use-case';

@Injectable()
export class SubjectUseCases extends GenericUseCases<SubjectEntity>{
    @Inject(SubjectRepositoryAbstract)
    private subjectRepository: SubjectRepositoryAbstract

    async get(): Promise<SubjectEntity[]> {
        return super.get(this.subjectRepository);
    }

    async getById(id: number): Promise<SubjectEntity> {
        return super.getById(this.subjectRepository, id);
    }

    async create(subjectEntity: SubjectEntity): Promise<SubjectEntity> {
        return super.create(this.subjectRepository, subjectEntity);  
    }

    async update(subjectEntity: SubjectEntity): Promise<SubjectEntity> {
        return super.update(this.subjectRepository, subjectEntity);
    }

    async delete(id: number): Promise<number> {
        return super.delete(this.subjectRepository, id);
    }
}