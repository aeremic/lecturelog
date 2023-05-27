import { post } from "../ServiceBase";

const URL: string = "/auth";

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
  } catch (err) {
    console.log(err); // TODO: Fix for PROD.
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
