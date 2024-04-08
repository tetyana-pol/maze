import { UserType } from "../../types/User";
import { client } from "../../http/axiosClient";

export const create = (text: string) => {
  return client.post<UserType>(`/message`, { text });
};

export const getAll = () => {
  return client.get<UserType[]>("/message");
};
