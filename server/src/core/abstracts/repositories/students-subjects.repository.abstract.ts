import { StudentsSubjectsEntity } from 'src/core/entities/students-subjects.entity';
import { GenericRepositoryAbstract } from './generic.repositoty.abstract';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class StudentsSubjectsRepositoryAbstract extends GenericRepositoryAbstract<StudentsSubjectsEntity> {
  abstract getBySubjectIdAndStudentId(
    subjectId: number,
    studentId: number,
  ): Promise<StudentsSubjectsEntity>;

  abstract getBySubjectId(subjectId: number): Promise<StudentsSubjectsEntity[]>;
}
