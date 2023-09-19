import { get, getById } from "../HttpServiceBase";

const URL = "/student";

export const getStudents = async (query: string) => {
  try {
    return await get(`${URL}/getStudents${query}`);
  } catch (err) {
    console.log(err); // TODO: Fix for PROD.
  }
};

export const getAvailableSubjects = async (id: number) => {
  try {
    return await getById(`${URL}/getAvailableSubjects`, id);
  } catch (err) {
    console.log(err); // TODO: Fix for PROD.
  }
};
