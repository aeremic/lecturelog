import { SubjectEntity } from 'src/core/entities';
import { Subject } from '../models';
import { UserMapper } from './user.mapper';
import { StudentsSubjectsMapper } from './students-subjects.mapper';

export class SubjectMapper {
  public static ToEntity(subjectModel: Subject): SubjectEntity {
    const subjectEntity: SubjectEntity = {
      id: subjectModel?.id,
      name: subjectModel?.name,
      professor: UserMapper.ToEntity(subjectModel?.professor),
      studentsSubjects: StudentsSubjectsMapper.ToEntities(
        subjectModel?.studentsSubjects,
      ),
    };

    return subjectEntity;
  }

  public static ToEntities(subjectModels: Subject[]): SubjectEntity[] {
    let subjectEntities: SubjectEntity[];
    if (subjectModels && subjectModels.length > 0) {
      subjectEntities = subjectModels.map((subjectModel) => {
        return this.ToEntity(subjectModel);
      });
    }

    return subjectEntities;
  }

  public static ToModel(subjectEntity: SubjectEntity): Subject {
    const subjectModel: Subject = {
      id: subjectEntity?.id,
      name: subjectEntity?.name,
      professor: UserMapper.ToModel(subjectEntity?.professor),
      studentsSubjects: StudentsSubjectsMapper.ToModels(
        subjectEntity?.studentsSubjects,
      ),
    };

    return subjectModel;
  }
}
