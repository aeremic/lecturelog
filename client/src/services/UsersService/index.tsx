import { IUser } from "../../Models/User";
import { get, getById, post, remove } from "../Common/ServiceBase";

const URL: string = "/user";

export const getUsers: any = async () => {
  try {
    return await get(URL);
  } catch (err) {
    console.log(err); // TODO: Fix for PROD.
  }
};

export const getUser: any = async (id: number) => {
  try {
    return await getById(URL, id);
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

export const removeUser = async (id: number) => {
  try {
    return await remove(`${URL}`, id);
  } catch (err) {
    console.log(err); // TODO: Fix for PROD.
  }
};
