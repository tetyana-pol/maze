import { useAppDispatch, useAppSelector } from "../../store/app/hooks";
import { usersSelector } from "../../store/features/usersSlice";
import { WaitingList } from "../WaitingList";
import "./dashboard.scss";
import {
  getLists,
  createList,
  listsSelector,
} from "../../store/features/listsSlice";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export const Dashbord = () => {
  const [isDisabled, setIsDisabled] = useState(false);

  const { userOne } = useAppSelector(usersSelector);
  const { lists } = useAppSelector(listsSelector);

  const dispatch = useAppDispatch();

  dayjs.extend(relativeTime);

  useEffect(() => {
    dispatch(getLists());
  }, [dispatch]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    dispatch(
      createList({
        initializer: userOne,
        game: "maze",
        date_at: new Date().toISOString(),
      })
    );
    setIsDisabled(true);
  };

  return (
    <div className="dashboard">
      <h3 className="message">
        <strong>Hello {userOne}</strong>
      </h3>
      <h2>Waiting list</h2>
      <WaitingList />
      <button
        className="button-app"
        disabled={isDisabled}
        type="button"
        onClick={(e) => {
          handleClick(e);
        }}
      >
        New game
      </button>
      {isDisabled && (
        <p>
          You started a new game{" "}
          {dayjs(
            lists.filter((el) => el.initializer === userOne)[0]?.date_at
          ).fromNow(true)}{" "}
          ago. Waiting for a second player…
        </p>
      )}
    </div>
  );
};
