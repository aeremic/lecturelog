import axios from "axios";
import { API } from "../Common";
import { AuthHeader } from "../Common/Auth/AuthHeader";

const URL: string = API + "/professor";

export const getProfessors = async () => {
  let result: any = null;
  try {
    result = await axios.get(URL + "/getProfessors", { headers: AuthHeader() });
  } catch (err) {
    console.log(err);
  }

  return result;
};
