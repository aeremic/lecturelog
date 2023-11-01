import { getById } from "./HttpServiceBase";

const URL = "/studentssubjects";

export const getCurrentlyAssignedStudents = async (subjectId: number) => {
  try {
    return await getById(`${URL}/getAssignedStudents`, subjectId);
  } catch (err) {
    console.log(err); // TODO: Fix for PROD.
  }
};
