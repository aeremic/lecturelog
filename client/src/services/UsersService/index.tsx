import axios from "axios";
import { API } from "../Common";

const URL: string = API + "/user";

export const getUsers = () => {
  return axios.get(URL + "");
};

export const getUser = (id: number) => {
  return axios.get(URL + "/" + id);
};
