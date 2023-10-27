import { RoleEnum } from "../models/Enums";
import { getCurrentUserData } from "../services/HttpService/AuthService";

const useCurrentUserRole = (): RoleEnum => {
  let currentUserRole = RoleEnum.Invalid;
  const userData = getCurrentUserData();

  if (userData && userData.id) {
    currentUserRole = userData.role;
  }

  return currentUserRole;
};

export default useCurrentUserRole;
