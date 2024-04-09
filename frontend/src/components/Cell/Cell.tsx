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
        cell: element === "c",
        wall: element === "w",
        exitr: element === "er",
      })}
    >
      {player !== "none" && <div className={player}></div>}
    </div>
  );
};
