import axios from "axios";
import { API } from "../Common";
import { AuthHeader } from "../Common/Auth/AuthHeader";
import { get, getById } from "../Common/ServiceBase";

const URL: string = "/subject";

export const getSubjects = async () => await get(URL, AuthHeader());

export const getSubject = async (id: number) =>
  await getById(URL, id, AuthHeader());
