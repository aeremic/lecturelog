import { Inject, Injectable } from '@nestjs/common';
import { GenericUseCases } from '../generic.use-case';
import { StudentsSubjectsRepositoryAbstract } from 'src/core/abstracts/repositories/students-subjects.repository.abstract';
import { LoggerUseCases } from '../logger/logger.use-case';
import { StudentsSubjectsEntity } from 'src/core/entities/students-subjects.entity';
import { ErrorConstants } from 'src/core/common/constants/error.constant';

@Injectable()
export class StudentsSubjectsUseCases extends GenericUseCases<StudentsSubjectsEntity> {
  //#region Properties

  @Inject(StudentsSubjectsRepositoryAbstract)
  private studentsSubjectsRepository: StudentsSubjectsRepositoryAbstract;

  @Inject(LoggerUseCases)
  private loggerUseCases: LoggerUseCases;

  //#endregion

  //#region Public methods

  async createOrUpdate(
    studentsSubjectsEntity: StudentsSubjectsEntity,
  ): Promise<StudentsSubjectsEntity> {
    return await super.createOrUpdate(
      this.studentsSubjectsRepository,
      this.loggerUseCases,
      studentsSubjectsEntity,
    );
  }

  async getBySubjectIdAndStudentId(
    subjectId: number,
    studentId: number,
  ): Promise<StudentsSubjectsEntity> {
    let result: StudentsSubjectsEntity = undefined;
    try {
      result = await this.studentsSubjectsRepository.getBySubjectIdAndStudentId(
        subjectId,
        studentId,
      );
    } catch (error) {
      this.loggerUseCases.log(
        ErrorConstants.GetMethodError,
        error?.message,
        error?.stack,
      );
    }

    return result;
  }

  //#endregion
}
