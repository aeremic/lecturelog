import { IUser } from "../../Models/User";

export interface IStudentFormInput {
  checked: IUser[];
  left: IUser[];
  leftChecked: IUser[];
  right: IUser[];
  rightChecked: IUser[];
}
