import { Indicator } from "../Indicator";
import { Row } from "../Row";
import "./maze.scss";

const maze = [
  ["c", "c", "w", "c", "c", "c", "c", "c"],
  ["w", "c", "w", "c", "w", "w", "w", "c"],
  ["c", "c", "w", "c", "c", "w", "c", "c"],
  ["c", "w", "w", "w", "c", "w", "w", "w"],
  ["c", "c", "c", "c", "c", "c", "c", "c"],
  ["w", "w", "w", "w", "w", "c", "w", "c"],
  ["w", "c", "c", "c", "c", "c", "w", "w"],
  ["c", "c", "w", "w", "w", "c", "c", "c"],
];

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
    </div>
  );
};
