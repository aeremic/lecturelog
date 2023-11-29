import { getAccessTokenData } from "../services/HttpService/AuthService";

const useCurrentUserIdentifier = (): number => {
  let currentUserIdentifier = -1;
  const userData = getAccessTokenData();

  if (userData && userData.id) {
    currentUserIdentifier = userData.id;
  }

  return currentUserIdentifier;
};

export default useCurrentUserIdentifier;
