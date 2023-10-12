import { Inject, Injectable } from '@nestjs/common';
import { SubjectRepositoryAbstract } from 'src/core/abstracts/repositories/subject.repository.abstract';
import { SubjectEntity, UserEntity } from 'src/core/entities';
import { GenericUseCases } from '../generic.use-case';
import { LoggerUseCases } from '../logger/logger.use-case';
import { ErrorConstants } from 'src/core/common/constants/error.constant';
import { SubjectsDto } from 'src/core/dtos/responses/subjects.dto';
import { StudentsSubjectsUseCases } from '../students-subjects/students-subjects.use-case';
import { LectureUseCases } from '../lecture/lecture.use-case';
import { ActiveLectureIdentity } from 'src/core/entities/active-lecture-identity.entity';
import { CreateUpdateSubjectRequestDto } from 'src/core/dtos/requests/create-update-subject-request.dto';
import { CreateUpdateSubjectResponseDto } from '../../core/dtos/responses/create-update-subject-response.dto';

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
    createUpdateSubjectRequestDto: CreateUpdateSubjectRequestDto,
  ): Promise<CreateUpdateSubjectResponseDto> {
    const result = new CreateUpdateSubjectResponseDto();

    try {
      if (createUpdateSubjectRequestDto) {
        const professor: UserEntity = {
          id: createUpdateSubjectRequestDto.professorId,
        };

        const subjectEntity: SubjectEntity = {
          id: createUpdateSubjectRequestDto.id,
          name: createUpdateSubjectRequestDto.name,
          pointsPerPresence: createUpdateSubjectRequestDto.pointsPerPresence,
          professor: professor,
        };

        const subjectInDb = await super.createOrUpdate(
          this.subjectRepository,
          this.loggerUseCases,
          subjectEntity,
        );

        result.id = subjectInDb.id;
      }
    } catch (error) {
      this.loggerUseCases.log(
        ErrorConstants.PostMethodError,
        error?.message,
        error?.stack,
      );
      result.errorMessage = error?.message;
    }

    return result;
  }

  async getSubject(id: number): Promise<SubjectEntity> {
    let result: SubjectEntity | PromiseLike<SubjectEntity>;

    try {
      result = await this.getById(id);
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

  async getActiveSubjects(): Promise<ActiveLectureIdentity[]> {
    return this.lectureUseCases.getActiveLecturesFromExternalCache();
  }

  //#endregion
}
