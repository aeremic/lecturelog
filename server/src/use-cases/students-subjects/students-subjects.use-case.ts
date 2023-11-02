import { Inject, Injectable } from '@nestjs/common';
import { GenericUseCases } from '../generic.use-case';
import { StudentsSubjectsRepositoryAbstract } from 'src/core/abstracts/repositories/students-subjects.repository.abstract';
import { LoggerUseCases } from '../logger/logger.use-case';
import { StudentsSubjectsEntity } from 'src/core/entities/students-subjects.entity';
import { ErrorConstants } from 'src/core/common/constants/error.constant';
import { GetAssignedStudentsDto } from 'src/core/dtos/responses/get-assigned-students.dto';
import { RemoveAssignedStudentDto } from '../../core/dtos/requests/remove-assigned-student.dto';

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

  async getAssignedStudents(
    subjectId: number,
  ): Promise<GetAssignedStudentsDto[]> {
    const result: GetAssignedStudentsDto[] = [];
    try {
      const studentsSubjects =
        await this.studentsSubjectsRepository.getBySubjectId(subjectId);
      if (studentsSubjects && studentsSubjects.length > 0) {
        for (let i = 0; i < studentsSubjects.length; i++) {
          const getAssignedStudentsDto: GetAssignedStudentsDto = {
            id: studentsSubjects[i].student.id,
            firstname: studentsSubjects[i].student.firstname,
            lastname: studentsSubjects[i].student.lastname,
            index: studentsSubjects[i].student.index,
            year: studentsSubjects[i].student.year,
            sumOfPresencePoints: studentsSubjects[i].sumOfPresencePoints,
          };

          result.push(getAssignedStudentsDto);
        }
      }
    } catch (error) {
      this.loggerUseCases.log(
        ErrorConstants.GetMethodError,
        error?.message,
        error?.stack,
      );
    }

    return result;
  }

  async removeAssignedStudent(
    removeAssignedStudentDto: RemoveAssignedStudentDto,
  ): Promise<boolean> {
    let result = false;
    try {
      if (removeAssignedStudentDto) {
        const studentsSubjects =
          await this.studentsSubjectsRepository.getBySubjectIdAndStudentId(
            removeAssignedStudentDto.subjectId,
            removeAssignedStudentDto.studentId,
          );

        if (studentsSubjects && studentsSubjects.id > 0) {
          const deleteResult = await this.studentsSubjectsRepository.delete(
            studentsSubjects.id,
          );
          if (deleteResult > 0) {
            result = true;
          }
        }
      }
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
