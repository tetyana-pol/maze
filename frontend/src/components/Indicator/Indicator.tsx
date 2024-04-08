import { useAppSelector } from "../../store/app/hooks";
import { usersSelector } from "../../store/features/usersSlice";
import "./indicator.scss";

export const Indicator = () => {
  const { currentUser } = useAppSelector(usersSelector);

  return (
    <h3 className="indicator">
      <strong>Now is turn {currentUser}</strong>
    </h3>
  );
};
