import { RoleEnum } from "./Enums";

export interface IRegisterStudent {
  id: number;
  firstname: string;
  lastname: string;
  role: RoleEnum;
  email: string;
  index?: number | null;
  year?: number | null;
}
