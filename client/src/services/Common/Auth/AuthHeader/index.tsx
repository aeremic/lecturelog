export const AuthHeader = () => {
  let accessToken = localStorage.getItem("accessToken");
  let parsedAccessToken = null;
  if (accessToken) {
    parsedAccessToken = JSON.parse(accessToken);
  }

  if (parsedAccessToken) {
    return { Authorization: "Bearer " + parsedAccessToken };
  } else {
    return { Authorization: "" };
  }
};
