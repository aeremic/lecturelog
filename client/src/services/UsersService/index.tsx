import { AuthHeader } from "../Common/Auth/AuthHeader";
import { get, getById } from "../Common/ServiceBase";

const URL: string = "/user";

export const getUsers = async () => await get(URL, AuthHeader());

export const getUser = async (id: number) =>
  await getById(URL, id, AuthHeader());

// export const getUsers = async () => {
//   let result: any = null;
//   try {
//     result = await axios.get(URL + "", { headers: AuthHeader() });
//   } catch (err) {
//     console.log(err);
//   }

//   return result;
// };

// export const getUser = async (id: number) => {
//   let result: any = null;
//   try {
//     result = await axios.get(URL + "/" + id, { headers: AuthHeader() });
//   } catch (err) {
//     console.log(err);
//   }

//   return result;
// };
