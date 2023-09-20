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

export const getAssignedSubjects = async (id: number) => {
  try {
    return await getById(`${URL}/getAssignedSubjects`, id);
  } catch (err) {
    console.log(err); // TODO: Fix for PROD.
  }
};

export const getActiveAssignedSubjects = async (id: number) => {
  try {
    return await getById(`${URL}/getActiveAssignedSubjects`, id);
  } catch (err) {
    console.log(err); // TODO: Fix for PROD.
  }
};

export const getCodeGeneratedState = async (sessionData: ISessionData) => {
  try {
    return await post(`${URL}/getCodeEventByActiveLecture`, sessionData);
  } catch (err) {
    console.log(err); // TODO: Fix for PROD.
  }
};

export const getCode = async (sessionData: ISessionData) => {
  try {
    return await post(`${URL}/getCodeByActiveLecture`, sessionData);
  } catch (err) {
    console.log(err); // TODO: Fix for PROD.
  }
};