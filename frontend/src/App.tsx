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
} from "./store/features/playersSlice";
import { Chat } from "./components/Chat";
import { usersSelector } from "./store/features/usersSlice";
import { User } from "./components/User";
import { Dashbord } from "./components/Dashboard";

const App = () => {
  const { userOne, userTwo } = useAppSelector(usersSelector);

  const dispatch = useAppDispatch();

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft":
          dispatch(moveLeft());
          dispatch(switchPlayer());
          break;

        case "ArrowRight":
          dispatch(moveRight());
          dispatch(switchPlayer());
          break;

        case "ArrowDown":
          dispatch(moveDown());
          dispatch(switchPlayer());
          break;

        case "ArrowUp":
          dispatch(moveUp());
          dispatch(switchPlayer());
          break;
      }
    },
    [dispatch]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

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
