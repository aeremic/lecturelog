export const AuthHeader = () => {
  const accessToken = localStorage.getItem("accessToken");
  let parsedAccessToken = null;
  if (accessToken) {
    parsedAccessToken = JSON.parse(accessToken);
  }

  if (parsedAccessToken) {
    return "Bearer " + parsedAccessToken;
  } else {
    return "";
  }
};
