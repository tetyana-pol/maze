import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { ListType } from "../../types/List";

export type ListsState = {
  lists: ListType[];
};

const initialState: ListsState = {
  lists: [],
};

export const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    addList: (state, action: PayloadAction<ListType>) => {
      state.lists.push(action.payload);
    },
  },
});

export const listsSelector = (state: RootState) => state.lists;
export const { addList } = listsSlice.actions;

export default listsSlice.reducer;
