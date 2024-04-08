import { useAppSelector } from "../../store/app/hooks";
import { playersSelector } from "../../store/features/playersSlice";
import "./indicator.scss";

export const Indicator = () => {
  const { currentPlayer } = useAppSelector(playersSelector);

  return (
    <h3 className="indicator">
      <strong>Now is turn {currentPlayer}</strong>
    </h3>
  );
};
