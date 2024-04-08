import { useAppSelector } from "../../store/app/hooks";
import { playersSelector } from "../../store/features/playersSlice";
import { usersSelector } from "../../store/features/usersSlice";
import "./indicator.scss";

export const Indicator = () => {
  const { userOne, userTwo } = useAppSelector(usersSelector);
  const { currentPlayer } = useAppSelector(playersSelector);

  return (
    <h3 className="indicator">
      <strong>
        Now is turn {currentPlayer === "playerOne" ? userOne : userTwo}
      </strong>
    </h3>
  );
};
