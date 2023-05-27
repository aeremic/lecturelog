import { IUser } from "../../Models/User";
import { get, getById, post, remove } from "../Common/ServiceBase";

const URL: string = "/user";

export const getUsers = async () => await get(URL);

export const getUser = async (id: number) => await getById(URL, id);

export const createOrUpdateUser = async (data: IUser) => {
  try {
    return await post(`${URL}`, data);
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
