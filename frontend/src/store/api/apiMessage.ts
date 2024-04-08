import { MessageType } from "../../types/Message";
import { client } from "../../http/axiosClient";

export const create = (text: string) => {
  return client.post<MessageType>(`/message`, { text });
};

export const getAll = () => {
  return client.get<MessageType[]>("/message");
};
