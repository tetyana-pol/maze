import { Indicator } from "../Indicator";
import { Row } from "../Row";
import "./maze.scss";
import { maze } from "./maze.template";
import { playersSelector } from "../../store/features/playersSlice";
import { useAppSelector } from "../../store/app/hooks";

export const Maze = () => {
  const { winner } = useAppSelector(playersSelector);

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
        <button disabled={!!winner}>Give up</button>
        <button disabled={!winner}>Exit</button>
      </div>
    </div>
  );
};
