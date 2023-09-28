import { IRegisterStudent } from "../../../modelHelpers/RegisterStudent";
import { get, getById } from "../HttpServiceBase";
import { post } from "../HttpServiceBase/index";

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

export const registerStudent = async (data: IRegisterStudent) => {
  try {
    return await post(`${URL}/createStudent`, data);
  } catch (err) {
    console.log(err); // TODO: Fix for PROD.
  }
};

export const uploadStudents = async (data: any) => {
  try {
        return await post(
          `${URL}/uploadStudents`,
          data,
          true,
          "multipart/form-data"
        );
  
  } catch (err) {
    console.log(err); // TODO: Fix for PROD.
  }
};
