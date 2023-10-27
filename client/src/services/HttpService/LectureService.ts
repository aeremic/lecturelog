import { IRemovePresentStudentModel } from "../../models/IRemovePresentStudentModel";
import { ISessionMetadata } from "../../models/ISessionMetadata";
import { getById, post, remove } from "./HttpServiceBase";

const URL = "/lecture";

export const getCodeGeneratedState = async (sessionData: ISessionMetadata) => {
  try {
    return await post(`${URL}/getCodeStateByActiveLecture`, sessionData);
  } catch (err) {
    console.log(err); // TODO: Fix for PROD.
  }
};

export const getCode = async (sessionData: ISessionMetadata) => {
  try {
    return await post(`${URL}/getCodeByActiveLecture`, sessionData);
  } catch (err) {
    console.log(err); // TODO: Fix for PROD.
  }
};

export const getCurrentlyPresentStudents = async (id: number) => {
  try {
    return await getById(`${URL}/getActiveLectureAttendees`, id);
  } catch (err) {
    console.log(err); // TODO: Fix for PROD.
  }
};

export const removePresentStudent = async (
  removePesentStudentModel: IRemovePresentStudentModel
) => {
  try {
    return await post(`${URL}/removeLectureAttendee`, removePesentStudentModel);
  } catch (err) {
    console.log(err); // TODO: Fix for PROD.
  }
};
