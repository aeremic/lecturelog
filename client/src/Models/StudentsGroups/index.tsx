import { IUser } from "../User";

export interface IStudentsGroups {
  id?: number;
  sumOfPresencePoints: number;
  student: IUser;
}
