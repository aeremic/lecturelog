import axios from "axios";
import { API } from "../../Common";
import { AuthHeader } from "./Headers";

export const get = async (endpoint: string, autoIncludeAuthHeader = true) => {
  let header = { Authorization: "" };
  if (autoIncludeAuthHeader) {
    header = AuthHeader();
  }
  const URL: string = API + endpoint;
  return axios.get(URL, { headers: header });
};

export const getById = async (
  endpoint: string,
  id: number,
  autoIncludeAuthHeader = true
) => {
  let header = { Authorization: "" };
  if (autoIncludeAuthHeader) {
    header = AuthHeader();
  }
  const URL: string = API + endpoint;
  return axios.get(`${URL}/${id}`, { headers: header });
};

export const post = async (
  endpoint: string,
  modelToPost: any,
  autoIncludeAuthHeader = true
) => {
  let header = { Authorization: "" };
  if (autoIncludeAuthHeader) {
    header = AuthHeader();
  }
  const URL: string = API + endpoint;
  return axios.post(URL, modelToPost, { headers: header });
};

export const remove = async (
  endpoint: string,
  id: number,
  autoIncludeAuthHeader = true
) => {
  let header = { Authorization: "" };
  if (autoIncludeAuthHeader) {
    header = AuthHeader();
  }
  const URL: string = API + endpoint;
  return axios.delete(`${URL}/${id}`, { headers: header });
};
