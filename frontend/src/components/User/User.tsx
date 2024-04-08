import { useState } from "react";
import { useAppDispatch } from "../../store/app/hooks";

import "./user.scss";
import { addUserOne, setCurrentUser } from "../../store/features/usersSlice";

export const User = () => {
  const [user, setUser] = useState("");

  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(addUserOne(user));
    dispatch(setCurrentUser());
    setUser("");
  };

  return (
    <div className="user">
      <form onSubmit={handleSubmit}>
        <input
          name="user"
          placeholder="Type the name of user"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};
