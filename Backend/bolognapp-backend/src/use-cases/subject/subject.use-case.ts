import { Inject, Injectable } from '@nestjs/common';
import { SubjectRepositoryAbstract } from 'src/core/abstracts/repositories/subject.repository.abstract';
import { SubjectEntity } from 'src/core/entities';

@Injectable()
export class SubjectUseCases {
    @Inject(SubjectRepositoryAbstract)
    private subjectRepository: SubjectRepositoryAbstract

    get(): SubjectEntity[] {
        return this.subjectRepository.get();
    }

    getSubjectById(id: number): Promise<SubjectEntity> {
        return this.subjectRepository.getSubjectById(id);
    }
}