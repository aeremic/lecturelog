import { IUser } from "../User";

export interface ISubjectGroup {
  id?: number;
  groupNo: number;
  pointsPerPresence: number;
  students: IUser[];
  professors: IUser[];
}
