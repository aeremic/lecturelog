import { get } from "../Common/ServiceBase";

const URL: string = "/professor";

// TODO: Wrap call with try-catch block. Error is thrown when session expires!
export const getProfessors = async () => await get(`${URL}/getProfessors`);
