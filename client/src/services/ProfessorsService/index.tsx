import { get, getById } from "../Common/ServiceBase";

const URL = "/professor";

export const getProfessors = async (query: string) => {
  try {
    return await get(`${URL}/getProfessors${query}`);
  } catch (err) {
    console.log(err); // TODO: Fix for PROD.
  }
};

export const getAssignedGroups = async (id: number) => {
  try {
    return await getById(`${URL}/getAssignedGroups`, id);
  } catch (err) {
    console.log(err); // TODO: Fix for PROD.
  }
};

export const getActiveAssignedGroups = async (id: number) => {
  try {
    return await getById(`${URL}/getActiveAssignedGroups`, id);
  } catch (err) {
    console.log(err); // TODO: Fix for PROD.
  }
};
