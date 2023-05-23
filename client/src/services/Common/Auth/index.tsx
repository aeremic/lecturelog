import axios from "axios";
import { API } from "..";

const URL: string = API + "/auth";

export const login = (email: string, password: string) => {
  return axios
    .post(URL + "/login", {
      email,
      password,
    })
    .then((res: any) => {
      if (res && res.accessToken) {
        // TODO: Implemend Redux possibly
        localStorage.setItem("accessToken", JSON.stringify(res.accessToken));
      }

      return res;
    });
};

export const logout = () => {
  localStorage.removeItem("accessToken");
};

export const getAuthorizationToken = () => {
  let accessToken = localStorage.getItem("accessToken");
  let parsedAccessToken = null;
  if (accessToken) {
    parsedAccessToken = JSON.parse(accessToken);
  }

  return parsedAccessToken;
};
