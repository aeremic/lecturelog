import { Inject, Injectable } from '@nestjs/common';
import { SubjectRepositoryAbstract } from 'src/core/abstracts/repositories/subject.repository.abstract';
import { SubjectEntity } from 'src/core/entities';
import { GenericUseCases } from '../generic.use-case';
import { LoggerUseCases } from '../logger/logger.use-case';
import { ErrorConstants } from 'src/core/common/constants/error.constant';
import { SubjectsDto } from 'src/core/dtos/responses/subjects.dto';

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

    async createOrUpdate(subjectEntity: SubjectEntity): Promise<SubjectEntity> {
        return super.createOrUpdate(this.subjectRepository, this.loggerUseCases, subjectEntity);
    }

    async delete(id: number): Promise<number> {
        return super.delete(this.subjectRepository, this.loggerUseCases, id);
    }

    async getSubjects(page: number, size: number): Promise<SubjectsDto> {
        let result: SubjectsDto | PromiseLike<SubjectsDto>;
        let subjects: SubjectEntity[] | PromiseLike<SubjectEntity[]>;
        let totalSubjectsCount: number | PromiseLike<number>;
        let skip = page * size;

        try {
            subjects = await this.subjectRepository.getSubjects(size, skip);
            totalSubjectsCount = await this.subjectRepository.getSubjectsCount();

            result = {
                subjects: subjects,
                count: totalSubjectsCount
            }
        } catch (error) {
            this.loggerUseCases.log(ErrorConstants.GetMethodError, error?.message, error?.stack);
        }

        return result;
    }
}