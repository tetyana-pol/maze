import "./cell.scss";
import cn from "classnames";

interface Props {
  element: string;

  player: string;
}

export const Cell: React.FC<Props> = ({ element, player }) => {
  return (
    <div
      className={cn({
        cell: element === "c" || element === "e",
        wall: element === "w",
      })}
    >
      {player !== "none" && <div className={player}></div>}
      {element === "e" && "E"}
    </div>
  );
};
