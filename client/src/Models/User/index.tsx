import { RoleEnum } from "../Enums";

export interface IUser {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  role: RoleEnum;
  index?: number | null;
  year?: number | null;
}
