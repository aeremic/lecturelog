import { RoleEnum } from "../common/enums/role.enum";

export class UserEntity {
  public id?: number;

  public firstname: string;
  
  public lastname: string;
  
  public email: string;
  
  public hash?: string;
    
  public role?: RoleEnum
}
