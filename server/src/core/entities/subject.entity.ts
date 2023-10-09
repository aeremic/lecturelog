import { StudentsSubjectsEntity } from './students-subjects.entity';
import { UserEntity } from './user.entity';

export class SubjectEntity {
  public id?: number;

  public name: string;

  public pointsPerPresence: number;

  public professor: UserEntity;

  public studentsSubjects?: StudentsSubjectsEntity[];
}
