import { RoleEnum } from "./Enums";

export interface IEditStudent {
  id: number;
  firstname: string;
  lastname: string;
  index?: number | null;
  year?: number | null;
}
