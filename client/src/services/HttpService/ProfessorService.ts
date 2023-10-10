import { ISessionData } from "../../models/ISessionData";
import { get, getById, getFile, post } from "./HttpServiceBase";

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

export const uploadProfessors = async (data: any) => {
  try {
    return await post(
      `${URL}/uploadProfessors`,
      data,
      true,
      "multipart/form-data"
    );
  } catch (err) {
    console.log(err); // TODO: Fix for PROD.
  }
};

export const generateTemplateFile = async () => {
  try {
    return await getFile(`${URL}/generateUploadTemplate`);
  } catch (err) {
    console.log(err); // TODO: Fix for PROD.
  }
};
