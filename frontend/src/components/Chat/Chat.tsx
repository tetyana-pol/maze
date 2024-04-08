import { useAppDispatch, useAppSelector } from "../../store/app/hooks";
import { chatSelector } from "../../store/features/chatSlice";
import { playersSelector } from "../../store/features/playersSlice";
import "./chat.scss";
import { getMessages, createMessage } from "../../store/features/chatSlice";
import { useEffect, useState } from "react";
import { MessageType } from "../../types/Message";

export const Chat = () => {
  const [textValue, setTextValu] = useState("");

  const { currentPlayer } = useAppSelector(playersSelector);

  const { messages } = useAppSelector(chatSelector);

  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createMessage(textValue));
  };

  useEffect(() => {
    dispatch(getMessages());
  }, []);

  return (
    <div className="container-chat">
      {messages.map((message: MessageType) => (
        <p>{message.text}</p>
      ))}
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          value={textValue}
          onChange={(e) => setTextValu(e.target.value)}
        />
        <button className="button-app">Send</button>
      </form>
    </div>
  );
};
