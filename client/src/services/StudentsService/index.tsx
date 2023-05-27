import { get } from "../Common/ServiceBase";

const URL: string = "/student";

export const getStudents = async () => {
  try {
    return await get(`${URL}/getStudents`);
  } catch (err) {
    console.log(err); // TODO: Fix for PROD.
  }
};
