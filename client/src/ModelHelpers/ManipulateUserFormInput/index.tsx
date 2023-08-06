import { RoleEnum } from "../../models/Enums";

export interface IManipulateUserFormInput {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  index?: number | null;
  year?: number | null;
  role: RoleEnum;
}
