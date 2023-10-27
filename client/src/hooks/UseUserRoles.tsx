import { RoleEnum } from "../models/Enums";

export function useUserRoles() {
  const userRoles: Array<RoleEnum> = [
    RoleEnum.Admin,
    RoleEnum.Professor,
    RoleEnum.Student,
    RoleEnum.Invalid,
  ];

  return userRoles;
}
