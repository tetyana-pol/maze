import { useAppDispatch, useAppSelector } from "../../store/app/hooks";
import { addMessage, chatSelector } from "../../store/features/chatSlice";
import { usersSelector } from "../../store/features/usersSlice";
import "./chat.scss";
import {
  moveLeft,
  moveRight,
  moveUp,
  moveDown,
  switchPlayer,
} from "../../store/features/playersSlice";
import { useState } from "react";
import { MessageType } from "../../types/Message";
import { nextNumber } from "../../services/services";

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
        dispatch(
          addMessage({
            id: nextNumber(messages.map((el) => el.id)),
            text: textValue,
            created_at: new Date().toISOString(),
          })
        );
        setTextValue("");
        return;
      case "/down":
        dispatch(moveDown());
        dispatch(switchPlayer());
        dispatch(
          addMessage({
            id: nextNumber(messages.map((el) => el.id)),
            text: textValue,
            created_at: new Date().toISOString(),
          })
        );
        setTextValue("");
        return;
      case "/left":
        dispatch(moveLeft());
        dispatch(switchPlayer());
        dispatch(
          addMessage({
            id: nextNumber(messages.map((el) => el.id)),
            text: textValue,
            created_at: new Date().toISOString(),
          })
        );
        setTextValue("");
        return;
      case "/right":
        dispatch(moveRight());
        dispatch(switchPlayer());
        dispatch(
          addMessage({
            id: nextNumber(messages.map((el) => el.id)),
            text: textValue,
            created_at: new Date().toISOString(),
          })
        );
        setTextValue("");
        return;
    }

    dispatch(
      addMessage({
        id: nextNumber(messages.map((el) => el.id)),
        text: `${currentUser} :  ${textValue}`,
        created_at: new Date().toISOString(),
      })
    );
    setTextValue("");
  };

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
