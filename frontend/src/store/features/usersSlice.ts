import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export type UsersState = {
  userOne: string;
  userTwo: string;
  currentUser: string;
};

const initialState: UsersState = {
  userOne: "",
  userTwo: "",
  currentUser: "",
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

    setCurrentUser: (state) => {
      state.currentUser = state.userOne;
    },

    switchUser: (state) => {
      if (state.currentUser === state.userOne) {
        state.currentUser = state.userTwo;
      } else {
        state.currentUser = state.userOne;
      }
    },
  },
});

export const usersSelector = (state: RootState) => state.users;
export const { addUserOne, addUserTwo, setCurrentUser, switchUser } =
  usersSlice.actions;
export default usersSlice.reducer;
