import { UserMapper } from './user.mapper';
import { SubjectMapper } from './subject.mapper';
import { StudentsSubjects } from '../models';
import { StudentsSubjectsEntity } from 'src/core/entities/students-subjects.entity';

export class StudentsSubjectsMapper {
  public static ToEntity(
    studentsSubjectsModel: StudentsSubjects,
  ): StudentsSubjectsEntity {
    const studentsSubjectsEntity: StudentsSubjectsEntity = {
      id: studentsSubjectsModel?.id,
      sumOfPresencePoints: Number.parseFloat(
        studentsSubjectsModel?.sumOfPresencePoints?.toString(),
      ),
      studentId: studentsSubjectsModel.studentId,
      subjectId: studentsSubjectsModel?.subjectId,
    };

    return studentsSubjectsEntity;
  }

  public static ToEntities(
    studentsSubjectsModels: StudentsSubjects[],
  ): StudentsSubjectsEntity[] {
    let studentsSubjectsEnties: StudentsSubjectsEntity[];
    if (studentsSubjectsModels && studentsSubjectsModels.length > 0) {
      studentsSubjectsEnties = studentsSubjectsModels.map(
        (studentsSubjectsModel) => {
          return this.ToEntity(studentsSubjectsModel);
        },
      );
    }

    return studentsSubjectsEnties;
  }

  public static ToModel(
    studentsSubjectsEntity: StudentsSubjectsEntity,
  ): StudentsSubjects {
    const studentsSubjects: StudentsSubjects = {
      id: studentsSubjectsEntity?.id,
      sumOfPresencePoints: Number.parseFloat(
        studentsSubjectsEntity?.sumOfPresencePoints?.toString(),
      ),
      studentId: studentsSubjectsEntity?.studentId,
      subjectId: studentsSubjectsEntity?.subjectId,

      student: undefined,
      subject: undefined,
    };

    return studentsSubjects;
  }

  public static ToModels(
    studentsSubjectsEntities: StudentsSubjectsEntity[],
  ): StudentsSubjects[] {
    let studentsSubjectsModels: StudentsSubjects[];
    if (studentsSubjectsEntities && studentsSubjectsEntities.length > 0) {
      studentsSubjectsModels = studentsSubjectsEntities.map(
        (studentsSubjectsEntitity) => {
          return this.ToModel(studentsSubjectsEntitity);
        },
      );
    }

    return studentsSubjectsModels;
  }
}
