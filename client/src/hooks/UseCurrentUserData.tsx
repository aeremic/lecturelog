import { IUserData } from "../models/IUserData";
import { getUserData } from "../services/HttpService/AuthService";

const useCurrentUserData = (): IUserData | undefined => {
  try {
    const userData = getUserData();
    if (userData) {
      return JSON.parse(userData);
    }
  } catch (error) {
    console.log(error); // TODO: Fix for PROD.
  }

  return undefined;
};

export default useCurrentUserData;
