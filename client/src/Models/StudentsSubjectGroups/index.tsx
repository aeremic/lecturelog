import { IUser } from "../User";

export interface IStudentsSubjectGroups {
  id?: number;
  sumOfPresencePoints: number;
  student: IUser;
}
