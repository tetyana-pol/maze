import { ListType } from "../../types/List";
import { client } from "../../http/axiosClient";

export const create = (data: Omit<ListType, "id">) => {
  return client.post<ListType>(`/list`, data);
};

export const getAll = () => {
  return client.get<ListType[]>("/list");
};

export const remove = (id: number) => {
  return client.delete(`/list/${id}`);
};
