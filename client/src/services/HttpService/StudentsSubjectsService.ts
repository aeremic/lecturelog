import { IRemoveAssignedStudentModel } from "../../models/IRemoveAssignedStudentModel";
import { getById, post, remove } from "./HttpServiceBase";

const URL = "/studentssubjects";

export const getCurrentlyAssignedStudents = async (subjectId: number) => {
  try {
    return await getById(`${URL}/getAssignedStudents`, subjectId);
  } catch (err) {
    console.log(err); // TODO: Fix for PROD.
  }
};

export const removeAssignedStudent = async (
  data: IRemoveAssignedStudentModel
) => {
  try {
    return await post(`${URL}/removeAssignedStudent`, data);
  } catch (err) {
    console.log(err); // TODO: Fix for PROD.
  }
};

export const removeAllAssignedStudents = async (subjectId: number) => {
  try {
    return await remove(`${URL}/removeAllAssignedStudents`, subjectId);
  } catch (err) {
    console.log(err); // TODO: Fix for PROD.
  }
};
