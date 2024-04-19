import { Indicator } from "../Indicator";
import { Row } from "../Row";
import "./maze.scss";
import { maze } from "./maze.template";
import { setWinner } from "../../store/features/playersSlice";
import { playersSelector } from "../../store/features/playersSlice";
import { chatSelector } from "../../store/features/chatSlice";
import { usersSelector } from "../../store/features/usersSlice";
import { addMessage } from "../../store/features/chatSlice";
import { useAppSelector, useAppDispatch } from "../../store/app/hooks";
import { deleteUserTwo } from "../../store/features/usersSlice";
import { nextNumber } from "../../services/services";

export const Maze = () => {
  const { winner, currentPlayer } = useAppSelector(playersSelector);
  const { userOne, userTwo } = useAppSelector(usersSelector);
  const { messages } = useAppSelector(chatSelector);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    let giveup;
    if (window.confirm("Are you sure?")) {
      if (currentPlayer === "playerOne") {
        giveup = userOne;
        dispatch(setWinner("playerTwo"));
      } else {
        giveup = userTwo;
        dispatch(setWinner("playerOne"));
      }
    }

    dispatch(
      addMessage({
        id: nextNumber(messages.map((el) => el.id)),
        text: `${giveup} gave up`,
        created_at: new Date().toISOString(),
      })
    );
  };

  return (
    <div className="container-maze">
      <Indicator />
      {maze.map((el, y) => {
        return (
          <div className="row" key={y}>
            <Row y={y} row={el} />
          </div>
        );
      })}
      <div className="maze_buttons">
        <button disabled={!!winner} onClick={handleClick}>
          Give up
        </button>
        <button
          disabled={!winner}
          onClick={() => {
            dispatch(deleteUserTwo());
          }}
        >
          Exit
        </button>
      </div>
    </div>
  );
};
