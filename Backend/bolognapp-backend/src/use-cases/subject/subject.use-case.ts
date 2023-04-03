import { Inject, Injectable } from '@nestjs/common';
import { SubjectRepositoryAbstract } from 'src/core/abstracts/repositories/subject.repository.abstract';
import { SubjectEntity } from 'src/core/entities';

@Injectable()
export class SubjectUseCases {
    @Inject(SubjectRepositoryAbstract)
    private subjectRepository: SubjectRepositoryAbstract

    get(): Promise<SubjectEntity[]> {
        return this.subjectRepository.get();
    }

    getById(id: number): Promise<SubjectEntity> {
        return this.subjectRepository.getById(id);
    }

    create(subjectEntity: SubjectEntity): Promise<SubjectEntity> {
        return this.subjectRepository.createOrUpdate(subjectEntity);
    }

    update(subjectEntity: SubjectEntity): Promise<SubjectEntity> {
        return this.subjectRepository.createOrUpdate(subjectEntity);
    }

    delete(id: number): Promise<number> {
        return this.subjectRepository.delete(id);
    }
}