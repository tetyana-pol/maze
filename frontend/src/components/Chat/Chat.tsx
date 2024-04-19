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
import { useEffect, useRef, useState } from "react";
import { MessageType } from "../../types/Message";
import { nextNumber } from "../../services/services";
import dayjs from "dayjs";

export const Chat = () => {
  const [textValue, setTextValue] = useState("");
  const ref = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (messages.length && ref.current) {
      ref.current.scrollTop = Number.MAX_SAFE_INTEGER;
    }
  }, [messages.length]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    switch (textValue) {
      case "/up":
        if (winner) return;
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
        if (winner) return;
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
        if (winner) return;
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
        if (winner) return;
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
      <div ref={ref} className="chat_messages">
        {messages.map((message: MessageType) => (
          <div key={message.id} className="chat_message">
            <div className="chat_message-date">
              {dayjs(message.created_at).format("hh:mm:ss")}
            </div>
            <div className="chat_message-text">{message.text}</div>
          </div>
        ))}
      </div>

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
