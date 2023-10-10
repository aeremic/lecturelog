import { IProfessorsGroups } from "./IProfessorsGroups";
import { IStudentsGroups } from "./IStudentsGroups";

export interface ISubjectGroup {
  id?: number;
  groupNo: number;
  pointsPerPresence: number;
  students: IStudentsGroups[];
  professors: IProfessorsGroups[];
}
