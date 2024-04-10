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
  playersSelector,
} from "../../store/features/playersSlice";
import { useEffect, useState } from "react";
import { MessageType } from "../../types/Message";
import { nextNumber } from "../../services/services";

export const Chat = () => {
  const [textValue, setTextValue] = useState("");

  const { currentUser, userOne, userTwo } = useAppSelector(usersSelector);

  const { messages } = useAppSelector(chatSelector);

  const { winner } = useAppSelector(playersSelector);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!winner) return;
    dispatch(
      addMessage({
        id: nextNumber(messages.map((el) => el.id)),
        text: `${winner === "playerOne" ? userOne : userTwo} has won`,
        created_at: new Date().toISOString(),
      })
    );
  }, [winner]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    switch (textValue) {
      case "/up":
        dispatch(moveUp());
        dispatch(switchPlayer());
        dispatch(
          addMessage({
            id: nextNumber(messages.map((el) => el.id)),
            text: "(going up)",
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
            text: "(going down)",
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
            text: "(going left)",
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
            text: "(going right)",
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
