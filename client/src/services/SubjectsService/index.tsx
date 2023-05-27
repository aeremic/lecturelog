import { get, getById } from "../Common/ServiceBase";

const URL: string = "/subject";

export const getSubjects = async () => {
  try {
    return await get(URL);
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
