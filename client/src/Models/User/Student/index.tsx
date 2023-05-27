import { IUser } from "..";

export interface IStudent extends IUser {
  index: number | null;
  year: number | null;
}
