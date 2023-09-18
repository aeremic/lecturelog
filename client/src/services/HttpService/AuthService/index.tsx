import { post } from "../HttpServiceBase";

const URL = "/auth";

interface ILogin {
  email: string;
  password: string;
}

export const login = async (data: ILogin) => {
  try {
    const res = await post(`${URL}/login`, data, false);
    if (res && res.data && res.data.accessToken) {
      localStorage.setItem("accessToken", JSON.stringify(res.data.accessToken));
    }

    return res;
  } catch (err: any) {
    console.log(err); // TODO: Fix for PROD.
    return err.response;
  }
};

export const logout = () => {
  localStorage.removeItem("accessToken");
};

export const getCurrentUserData = () => {
  const token = getAuthorizationToken();
  return token != "" ? parseJwt(token) : undefined;
};

const getAuthorizationToken = () => {
  const accessToken = localStorage.getItem("accessToken");
  let parsedAccessToken = "";
  if (accessToken) {
    parsedAccessToken = JSON.parse(accessToken);
  }

  return parsedAccessToken;
};

const parseJwt = (token: string) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};
