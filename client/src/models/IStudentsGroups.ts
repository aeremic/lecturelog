import { IUser } from "./IUser";

export interface IStudentsGroups {
  id?: number;
  sumOfPresencePoints: number;
  student: IUser;
}
