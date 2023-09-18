import { ISessionData } from "../../../modelHelpers/SessionData";
import { get, getById, post } from "../HttpServiceBase";

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

export const getCodeGeneratedState = async (group: ISessionData) => {
  try {
    return await post(`${URL}/getLastCodeEventByGroup`, group);
  } catch (err) {
    console.log(err); // TODO: Fix for PROD.
  }
};

export const getCode = async (group: ISessionData) => {
  try {
    return await post(`${URL}/getCodeByGroup`, group);
  } catch (err) {
    console.log(err); // TODO: Fix for PROD.
  }
};
