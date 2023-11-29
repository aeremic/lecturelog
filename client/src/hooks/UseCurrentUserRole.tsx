import { RoleEnum } from "../models/Enums";
import { getAccessTokenData } from "../services/HttpService/AuthService";

const useCurrentUserRole = (): RoleEnum => {
  let currentUserRole = RoleEnum.Invalid;
  const userData = getAccessTokenData();

  if (userData && userData.id) {
    currentUserRole = userData.role;
  }

  return currentUserRole;
};

export default useCurrentUserRole;
