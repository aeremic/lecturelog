import { IUser } from "../../Models/User";
import { IStudentFormInput } from "../StudentFormInput";

export interface ISubjectGroupsFormInput {
  professors: IUser[];
  pointsPerPresence: number;
  students: IStudentFormInput;
}
