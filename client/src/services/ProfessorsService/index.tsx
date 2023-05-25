import { get } from "../Common/ServiceBase";

const URL: string = "/professor";

export const getProfessors = async () => await get(`${URL}/getProfessors`);
