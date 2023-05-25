import { get, getById } from "../Common/ServiceBase";

const URL: string = "/subject";

export const getSubjects = async () => await get(URL);

export const getSubject = async (id: number) => await getById(URL, id);
