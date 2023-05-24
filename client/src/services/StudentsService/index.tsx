import axios from "axios";
import { API } from "../Common";
import { AuthHeader } from "../Common/Auth/AuthHeader";

const URL: string = API + "/student";

export const getStudents = async () => {
  let result: any = null;
  try {
    result = await axios.get(URL + "/getStudents", { headers: AuthHeader() });
  } catch (err) {
    console.log(err);
  }

  return result;
};
