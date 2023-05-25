import axios from "axios";
import { API } from "..";

export const get = async (endpoint: string, header: any) => {
  const URL: string = API + endpoint;
  return axios.get(URL, { headers: header });
};

export const getById = async (endpoint: string, id: number, header: any) => {
  const URL: string = API + endpoint;
  return axios.get(`${URL}/${id}`, { headers: header });
};

export const post = async (endpoint: string, modelToPost: any) => {
  const URL: string = API + endpoint;
  return axios.post(URL, modelToPost);
};
