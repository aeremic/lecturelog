import axios from "axios";
import { API } from "..";
import { AuthHeader } from "../Headers/AuthHeader";

export const get = async (
  endpoint: string,
  autoIncludeAuthHeader: boolean = true,
  header: any = null
) => {
  if (autoIncludeAuthHeader && header == null) {
    header = AuthHeader();
  }
  const URL: string = API + endpoint;
  return axios.get(URL, { headers: header });
};

export const getById = async (
  endpoint: string,
  id: number,
  autoIncludeAuthHeader: boolean = true,
  header: any = null
) => {
  if (autoIncludeAuthHeader && header == null) {
    header = AuthHeader();
  }
  const URL: string = API + endpoint;
  return axios.get(`${URL}/${id}`, { headers: header });
};

export const post = async (
  endpoint: string,
  modelToPost: any,
  autoIncludeAuthHeader: boolean = true,
  header: any = null
) => {
  if (autoIncludeAuthHeader && header == null) {
    header = AuthHeader();
  }
  const URL: string = API + endpoint;
  return axios.post(URL, modelToPost);
};
