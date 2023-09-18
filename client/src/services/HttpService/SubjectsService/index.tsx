import { get, getById, post, remove } from "../HttpServiceBase";

const URL = "/subject";

export const getSubjects = async (query: string) => {
  try {
    return await get(`${URL}/getSubjects${query}`);
  } catch (err) {
    console.log(err); // TODO: Fix for PROD.
  }
};

export const getSubject = async (id: number) => {
  try {
    return await getById(`${URL}/getSubject`, id);
  } catch (err) {
    console.log(err); // TODO: Fix for PROD.
  }
};

export const createOrUpdateSubject = async (data: any) => {
  try {
    return await post(`${URL}/createOrUpdateSubject`, data);
  } catch (err) {
    console.log(err); // TODO: Fix for PROD.
  }
};

export const removeSubject = async (id: number) => {
  try {
    return await remove(`${URL}`, id);
  } catch (err) {
    console.log(err); // TODO: Fix for PROD.
  }
};
