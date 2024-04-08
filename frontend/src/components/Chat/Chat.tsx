import { useAppDispatch, useAppSelector } from "../../store/app/hooks";
import { chatSelector } from "../../store/features/chatSlice";
import { usersSelector } from "../../store/features/usersSlice";
import "./chat.scss";
import { getMessages, createMessage } from "../../store/features/chatSlice";
import {
  moveLeft,
  moveRight,
  moveUp,
  moveDown,
  switchPlayer,
} from "../../store/features/playersSlice";
import { useEffect, useState } from "react";
import { MessageType } from "../../types/Message";

export const Chat = () => {
  const [textValue, setTextValue] = useState("");

  const { currentUser } = useAppSelector(usersSelector);

  const { messages } = useAppSelector(chatSelector);

  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    switch (textValue) {
      case "/up":
        dispatch(moveUp());
        dispatch(switchPlayer());
        dispatch(createMessage(textValue));
        setTextValue("");
        return;
      case "/down":
        dispatch(moveDown());
        dispatch(switchPlayer());
        dispatch(createMessage(textValue));
        setTextValue("");
        return;
      case "/left":
        dispatch(moveLeft());
        dispatch(switchPlayer());
        dispatch(createMessage(textValue));
        setTextValue("");
        return;
      case "/right":
        dispatch(moveRight());
        dispatch(switchPlayer());
        dispatch(createMessage(textValue));
        setTextValue("");
        return;
    }

    dispatch(createMessage(currentUser + ": " + textValue));
  };

  useEffect(() => {
    dispatch(getMessages());
  }, []);

  return (
    <div className="container-chat">
      {messages.map((message: MessageType) => (
        <p key={message.id}>{message.text}</p>
      ))}
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
        />
        <button className="button-app">Send</button>
      </form>
    </div>
  );
};
