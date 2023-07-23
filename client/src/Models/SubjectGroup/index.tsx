import { IProfessorsGroups } from "../ProfessorsGroups";
import { IStudentsGroups } from "../StudentsGroups";

export interface ISubjectGroup {
  id?: number;
  groupNo: number;
  pointsPerPresence: number;
  students: IStudentsGroups[];
  professors: IProfessorsGroups[];
}
