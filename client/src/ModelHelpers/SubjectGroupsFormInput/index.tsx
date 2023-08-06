import { IUser } from "../../models/User";
import { IStudentFormInput } from "../StudentFormInput";

export interface ISubjectGroupsFormInput {
  professors: IUser[];
  pointsPerPresence: number;
  students: IStudentFormInput;
}
