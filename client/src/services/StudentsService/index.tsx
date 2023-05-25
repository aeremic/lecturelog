import { AuthHeader } from "../Common/Auth/AuthHeader";
import { get } from "../Common/ServiceBase";

const URL: string = "/student";

export const getStudents = async () =>
  await get(`${URL}/getStudents`, AuthHeader());
