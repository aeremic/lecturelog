import { IProfessorsSubjectGroups } from "../ProfessorsSubjectGroups";
import { IStudentsSubjectGroups } from "../StudentsSubjectGroups";

export interface ISubjectGroup {
  id?: number;
  groupNo: number;
  pointsPerPresence: number;
  students: IStudentsSubjectGroups[];
  professors: IProfessorsSubjectGroups[];
}
