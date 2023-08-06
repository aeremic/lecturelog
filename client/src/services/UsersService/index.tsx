import { IEmailRegistration } from "../../models/EmailRegistration";
import { IUser } from "../../models/User";
import { get, getById, post, remove } from "../Common/ServiceBase";

const URL = "/user";

export const getUsers: any = async () => {
  try {
    return await get(URL);
  } catch (err) {
    console.log(err); // TODO: Fix for PROD.
  }
};

export const getUser: any = async (id: number) => {
  try {
    return await getById(`${URL}/getById`, id);
  } catch (err) {
    console.log(err); // TODO: Fix for PROD.
  }
};

export const createUser = async (data: IUser) => {
  try {
    return await post(`${URL}/createUser`, data);
  } catch (err) {
    console.log(err); // TODO: Fix for PROD.
  }
};

export const emailRegistration = async (data: IEmailRegistration) => {
  try {
    return await post(`${URL}/emailRegistration`, data);
  } catch (err) {
    console.log(err); // TODO: Fix for PROD.
  }
};

export const removeUser = async (id: number) => {
  try {
    return await remove(`${URL}`, id);
  } catch (err) {
    console.log(err); // TODO: Fix for PROD.
  }
};

export const getAllExceptAdmin = async () => {
  try {
    return await get(`${URL}/getAllExceptAdmin`);
  } catch (err) {
    console.log(err); // TODO: Fix for PROD.
  }
};
