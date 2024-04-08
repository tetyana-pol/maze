import { useAppDispatch, useAppSelector } from "../../store/app/hooks";
import { listsSelector } from "../../store/features/listsSlice";
import { ListType } from "../../types/List";
import "./waiting.scss";
import { addUserTwo } from "../../store/features/usersSlice";
import { useState } from "react";

export const WaitingList = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [userName, setUserName] = useState("");

  const { lists } = useAppSelector(listsSelector);

  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addUserTwo(userName));
  };

  return (
    <h3 className="message">
      <ul>
        {lists?.map((list: ListType) => (
          <li key={list.initializer}>
            <span className="waiting_item">{list.initializer}</span>
            <span className="waiting_item">{list.date.toDateString()}</span>
            <button
              type="button"
              className="button-app"
              onClick={() => setIsFormVisible(true)}
            >
              Join game
            </button>
          </li>
        ))}
      </ul>
      {isFormVisible && (
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <button className="button-app" type="submit">
            Type user name
          </button>
        </form>
      )}
    </h3>
  );
};
