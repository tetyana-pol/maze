import { Indicator } from "../Indicator";
import { Row } from "../Row";
import "./maze.scss";
import { maze } from "./maze.template";

export const Maze = () => {
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
        <button>Give up</button>
        <button disabled={true}>Exit</button>
      </div>
    </div>
  );
};
