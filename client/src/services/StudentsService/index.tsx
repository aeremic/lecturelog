import { get, getById } from "../Common/ServiceBase";

const URL = "/student";

export const getStudents = async (query: string) => {
  try {
    return await get(`${URL}/getStudents${query}`);
  } catch (err) {
    console.log(err); // TODO: Fix for PROD.
  }
};

export const getAvailableGroups = async (id: number) => {
  try {
    return await getById(`${URL}/getAvailableGroups`, id);
  } catch (err) {
    console.log(err); // TODO: Fix for PROD.
  }
};
