import { UserEntity } from './user.entity';

export class StudentsSubjectsEntity {
  public id?: number;
  public sumOfPresencePoints: number;
  public subjectId: number;
  public studentId: number;
  public student: UserEntity;
}
