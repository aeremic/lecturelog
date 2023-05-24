import axios from "axios";
import { API } from "../Common";
import { AuthHeader } from "../Common/Auth/AuthHeader";

const URL: string = API + "/user";

export const getUsers = async () => {
  let result: any = null;
  try {
    result = await axios.get(URL + "", { headers: AuthHeader() });
  } catch (err) {
    console.log(err);
  }

  return result;
};

export const getUser = async (id: number) => {
  let result: any = null;
  try {
    result = await axios.get(URL + "/" + id, { headers: AuthHeader() });
  } catch (err) {
    console.log(err);
  }

  return result;
};
