import { UserType } from "../../types/User";
import { client } from "../../http/axiosClient";

export const create = (name: string) => {
  return client.post<UserType>(`/message`, { name });
};

export const getAll = () => {
  return client.get<UserType[]>("/message");
};
