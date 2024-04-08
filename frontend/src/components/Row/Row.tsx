import { Cell } from "../Cell";
import "./row.scss";
import { useAppSelector } from "../../store/app/hooks";
import { playersSelector } from "../../store/features/playersSlice";

interface Props {
  row: string[];
  y: number;
}

export const Row: React.FC<Props> = ({ row, y }) => {
  const { playerOne, playerTwo } = useAppSelector(playersSelector);

  return (
    <div className="row">
      {row.map((el, x) => {
        let player = "none";
        if (x === playerOne.positionX && y === playerOne.positionY)
          player = "player-one";
        if (x === playerTwo.positionX && y === playerTwo.positionY)
          player = "player-two";

        return <Cell key={x} element={el} player={player} />;
      })}
    </div>
  );
};
