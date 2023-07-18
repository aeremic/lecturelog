import { ProfessorsSubjectGroupsEntity } from "./professors-subjectgroups.entity";
import { StudentsSubjectGroupsEntity } from "./students-subjectgroups.entity";

export class SubjectGroupEntity {
  public id: number;

  public groupNo: number;

  public pointsPerPresence: number;

  public students: StudentsSubjectGroupsEntity[];

  public professors: ProfessorsSubjectGroupsEntity[];
}
