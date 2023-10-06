import { Inject, Injectable } from '@nestjs/common';
import { SubjectRepositoryAbstract } from 'src/core/abstracts/repositories/subject.repository.abstract';
import { SubjectEntity } from 'src/core/entities';
import { GenericUseCases } from '../generic.use-case';
import { LoggerUseCases } from '../logger/logger.use-case';
import { ErrorConstants } from 'src/core/common/constants/error.constant';
import { SubjectsDto } from 'src/core/dtos/responses/subjects.dto';
import { StudentsSubjectsUseCases } from '../students-subjects/students-subjects.use-case';
import { LectureUseCases } from '../lecture/lecture.use-case';
import { ActiveLectureEntity } from 'src/core/entities/active-lecture.entity';

@Injectable()
export class SubjectUseCases extends GenericUseCases<SubjectEntity> {
  //#region Properties

  @Inject(SubjectRepositoryAbstract)
  private subjectRepository: SubjectRepositoryAbstract;

  @Inject(StudentsSubjectsUseCases)
  private studentsSubjectsUseCases: StudentsSubjectsUseCases;

  @Inject(LectureUseCases)
  private lectureUseCases: LectureUseCases;

  @Inject(LoggerUseCases)
  private loggerUseCases: LoggerUseCases;

  //#endregion

  //#region Public methods

  async get(): Promise<SubjectEntity[]> {
    return super.get(this.subjectRepository, this.loggerUseCases);
  }

  async getById(id: number): Promise<SubjectEntity> {
    return super.getById(this.subjectRepository, this.loggerUseCases, id);
  }

  async createOrUpdate(subjectEntity: SubjectEntity): Promise<SubjectEntity> {
    return super.createOrUpdate(
      this.subjectRepository,
      this.loggerUseCases,
      subjectEntity,
    );
  }

  async delete(id: number): Promise<number> {
    return super.delete(this.subjectRepository, this.loggerUseCases, id);
  }

  async getSubjects(page: number, size: number): Promise<SubjectsDto> {
    let result: SubjectsDto | PromiseLike<SubjectsDto>;
    let subjects: SubjectEntity[] | PromiseLike<SubjectEntity[]>;
    let totalSubjectsCount: number | PromiseLike<number>;
    const skip = page * size;

    try {
      subjects = await this.subjectRepository.getSubjects(size, skip);
      totalSubjectsCount = await this.subjectRepository.getSubjectsCount();

      result = {
        subjects: subjects,
        count: totalSubjectsCount,
      };
    } catch (error) {
      this.loggerUseCases.log(
        ErrorConstants.GetMethodError,
        error?.message,
        error?.stack,
      );
    }

    return result;
  }

  async createOrUpdateSubject(
    subjectEntity: SubjectEntity,
  ): Promise<SubjectEntity> {
    let result: SubjectEntity | PromiseLike<SubjectEntity>;

    try {
      if (subjectEntity) {
        result = await super.createOrUpdate(
          this.subjectRepository,
          this.loggerUseCases,
          subjectEntity,
        );
        if (result.id && result.studentsSubjects) {
          result.studentsSubjects.forEach(async (item) => {
            if (item) {
              await this.studentsSubjectsUseCases.createOrUpdate({
                subject: item.subject,
                student: item.student,
                sumOfPresencePoints: item.sumOfPresencePoints,
              });
            }
          });
        }
      }
    } catch (error) {
      this.loggerUseCases.log(
        ErrorConstants.PostMethodError,
        error?.message,
        error?.stack,
      );
    }

    return result;
  }

  async getSubject(id: number): Promise<SubjectEntity> {
    let result: SubjectEntity | PromiseLike<SubjectEntity>;

    try {
      result = await this.subjectRepository.getSubject(id);
    } catch (error) {
      this.loggerUseCases.log(
        ErrorConstants.GetMethodError,
        error?.message,
        error?.stack,
      );
    }

    return result;
  }

  async getSubjectsByProfessorId(id: number): Promise<SubjectEntity[]> {
    let result: SubjectEntity[] | PromiseLike<SubjectEntity[]>;

    try {
      result = await this.subjectRepository.getSubjectsByProfessorId(id);
    } catch (error) {
      this.loggerUseCases.log(
        ErrorConstants.GetMethodError,
        error?.message,
        error?.stack,
      );
    }

    return result;
  }

  async getSubjectsByStudentId(id: number): Promise<SubjectEntity[]> {
    let result: SubjectEntity[] | PromiseLike<SubjectEntity[]>;

    try {
      result = await this.subjectRepository.getSubjectsByStudentId(id);
    } catch (error) {
      this.loggerUseCases.log(
        ErrorConstants.GetMethodError,
        error?.message,
        error?.stack,
      );
    }

    return result;
  }

  async getActiveSubjects(): Promise<ActiveLectureEntity[]> {
    return this.lectureUseCases.getActiveLecturesFromExternalCache();
  }

  //#endregion
}
