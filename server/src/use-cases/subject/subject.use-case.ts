import { Inject, Injectable } from '@nestjs/common';
import { SubjectRepositoryAbstract } from 'src/core/abstracts/repositories/subject.repository.abstract';
import { ProfessorsSubjectGroupsEntity, StudentsSubjectGroupsEntity, SubjectEntity, SubjectGroupEntity } from 'src/core/entities';
import { GenericUseCases } from '../generic.use-case';
import { LoggerUseCases } from '../logger/logger.use-case';
import { ErrorConstants } from 'src/core/common/constants/error.constant';
import { SubjectsDto } from 'src/core/dtos/responses/subjects.dto';
import { Subject } from 'rxjs';
import { ProfessorsGroupsUseCases } from '../professors-groups/professors-groups.use-case';
import { StudentsGroupsUseCases } from '../students-groups/students-groups.use-case';

@Injectable()
export class SubjectUseCases extends GenericUseCases<SubjectEntity>{
    @Inject(SubjectRepositoryAbstract)
    private subjectRepository: SubjectRepositoryAbstract

    @Inject(ProfessorsGroupsUseCases)
    private professorsGroupsUseCases: ProfessorsGroupsUseCases;

    @Inject(StudentsGroupsUseCases)
    private studentsGroupsUseCases: StudentsGroupsUseCases;

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

    async createOrUpdateSubject(subjectEntity: SubjectEntity): Promise<SubjectEntity> {
        let result: SubjectEntity | PromiseLike<SubjectEntity>;
        if (subjectEntity) {
            result = await super.createOrUpdate(this.subjectRepository, this.loggerUseCases, subjectEntity);
            if (result.id && result.subjectGroups) {
                result.subjectGroups.forEach(group => {
                    if (group.professors) {
                        group.professors.forEach(async element => {
                            await this.professorsGroupsUseCases.createOrUpdate({
                                professor: element.professor,
                                subjectGroup: group
                            });
                        });
                    }

                    if (group.students) {
                        group.students.forEach(async element => {
                            await this.studentsGroupsUseCases.createOrUpdate({
                                student: element.student,
                                subjectGroup: group,
                                sumOfPresencePoints: element.sumOfPresencePoints,
                            });
                        });
                    }
                });
            }
        }

        return result;
    }
}