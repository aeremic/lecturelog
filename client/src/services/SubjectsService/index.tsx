import { get, getById } from "../Common/ServiceBase";

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
    return await getById(URL, id);
  } catch (err) {
    console.log(err); // TODO: Fix for PROD.
  }
};
