import { useAppDispatch, useAppSelector } from "../../store/app/hooks";
import { usersSelector } from "../../store/features/usersSlice";
import { WaitingList } from "../WaitingList";
import "./dashboard.scss";
import { addList, listsSelector } from "../../store/features/listsSlice";
import { useState } from "react";
import { ListType } from "../../types/List";
import { nextNumber } from "../../services/services";

export const Dashbord = () => {
  const [isDisabled, setIsDisabled] = useState(false);

  const { userOne } = useAppSelector(usersSelector);
  const { lists } = useAppSelector(listsSelector);

  const dispatch = useAppDispatch();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    dispatch(
      addList({
        id: nextNumber(lists.map((el: ListType) => el.id)),
        initializer: userOne,
        date: new Date().toISOString(),
      })
    );
    setIsDisabled(true);
  };

  const getDiff = () => {
    const milliDiff: number =
      new Date().getTime() -
      new Date(
        lists.filter((list: ListType) => list.initializer === userOne)[0].date
      ).getTime();
    const totalSeconds = Math.floor(milliDiff / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const remSeconds = totalSeconds % 60;
    const remMinutes = totalMinutes % 60;

    return `${totalHours} h ${remMinutes} min ${remSeconds} sec `;
  };

  return (
    <div className="dashboard">
      <h3 className="message">
        <strong>Hello {userOne}</strong>
      </h3>
      <div>Waiting list</div>
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
          You started a new game {getDiff()}
          ago. Waiting for a second player…
        </p>
      )}
    </div>
  );
};
