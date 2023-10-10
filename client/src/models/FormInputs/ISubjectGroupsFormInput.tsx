import { IUser } from "../IUser";
import { IStudentFormInput } from "./IStudentFormInput";

export interface ISubjectGroupsFormInput {
  professors: IUser[];
  pointsPerPresence: number;
  students: IStudentFormInput;
}
