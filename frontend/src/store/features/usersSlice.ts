import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export type UsersState = {
  userOne: string;
  userTwo: string;
};

const initialState: UsersState = {
  userOne: "",
  userTwo: "",
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUserOne: (state, action: PayloadAction<string>) => {
      state.userOne = action.payload;
    },

    addUserTwo: (state, action: PayloadAction<string>) => {
      state.userTwo = action.payload;
    },
  },
});

export const usersSelector = (state: RootState) => state.users;
export const { addUserOne, addUserTwo } = usersSlice.actions;
export default usersSlice.reducer;
