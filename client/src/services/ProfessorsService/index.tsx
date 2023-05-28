import { get } from "../Common/ServiceBase";

const URL: string = "/professor";

export const getProfessors = async (query: string) => {
  try {
    return await get(`${URL}/getProfessors${query}`);
  } catch (err) {
    console.log(err); // TODO: Fix for PROD.
  }
};
