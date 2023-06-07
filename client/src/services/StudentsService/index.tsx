import { get } from "../Common/ServiceBase";

const URL = "/student";

export const getStudents = async (query: string) => {
  try {
    return await get(`${URL}/getStudents${query}`);
  } catch (err) {
    console.log(err); // TODO: Fix for PROD.
  }
};
