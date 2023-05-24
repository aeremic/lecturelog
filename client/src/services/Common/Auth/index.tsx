import axios from "axios";
import { API } from "..";

const URL: string = API + "/auth";

interface ILogin {
  email: string;
  password: string;
}

export const login = async (data: ILogin) => {
  let email: string = data?.email;
  let password: string = data?.password;
  try {
    const res = await axios.post(URL + "/login", {
      email,
      password,
    });

    if (res && res.data && res.data.accessToken) {
      localStorage.setItem("accessToken", JSON.stringify(res.data.accessToken));
    }

    return res;
  } catch (err) {
    console.log(err);
  }
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
