import { IUser } from "../../models/User";

export interface IStudentFormInput {
  checked: IUser[];
  left: IUser[];
  leftChecked: IUser[];
  right: IUser[];
  rightChecked: IUser[];
}
