import "./App.css";
import { Maze } from "./components/Maze";
import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store/app/hooks";
import {
  moveLeft,
  moveRight,
  moveUp,
  moveDown,
  switchPlayer,
  playersSelector,
} from "./store/features/playersSlice";
import { Chat } from "./components/Chat";
import { usersSelector } from "./store/features/usersSlice";
import { User } from "./components/User";
import { Dashbord } from "./components/Dashboard";
import { addMessage, chatSelector } from "./store/features/chatSlice";
import { remove } from "./store/api/apiList";
import { nextNumber } from "./services/services";
import { listsSelector } from "./store/features/listsSlice";

const App = () => {
  const { userOne, userTwo } = useAppSelector(usersSelector);

  const dispatch = useAppDispatch();

  const { messages } = useAppSelector(chatSelector);
  const { activeListId } = useAppSelector(listsSelector);
  const { winner } = useAppSelector(playersSelector);

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft":
          dispatch(moveLeft());
          dispatch(switchPlayer());
          dispatch(
            addMessage({
              id: nextNumber(messages.map((el) => el.id)),
              text: "(going left)",
              created_at: new Date().toISOString(),
            })
          );
          break;

        case "ArrowRight":
          dispatch(moveRight());
          dispatch(switchPlayer());
          dispatch(
            addMessage({
              id: nextNumber(messages.map((el) => el.id)),
              text: "(going right)",
              created_at: new Date().toISOString(),
            })
          );
          break;

        case "ArrowDown":
          dispatch(moveDown());
          dispatch(switchPlayer());
          dispatch(
            addMessage({
              id: nextNumber(messages.map((el) => el.id)),
              text: "(going down)",
              created_at: new Date().toISOString(),
            })
          );
          break;

        case "ArrowUp":
          dispatch(moveUp());
          dispatch(switchPlayer());
          dispatch(
            addMessage({
              id: nextNumber(messages.map((el) => el.id)),
              text: "(going up)",
              created_at: new Date().toISOString(),
            })
          );
          break;
      }
    },
    [dispatch, messages]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  useEffect(() => {
    if (winner) {
      remove(activeListId);
    }
  });

  return (
    <>
      {!userOne && !userTwo && <User />}
      {userOne && !userTwo && <Dashbord />}
      {userOne && userTwo && (
        <div className="container">
          <Maze />
          <Chat />
        </div>
      )}
    </>
  );
};

export default App;
