import { RoleEnum } from "../common/enums/role.enum";

export class UserEntity {
  public id?: number;

  public firstname: string;

  public lastname: string;

  public email: string;

  public index?: number;

  public year?: number;

  public hash?: string;

  public isActivated?: boolean;

  public role?: RoleEnum
}
