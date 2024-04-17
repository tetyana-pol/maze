import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { ListType } from "../../types/List";
import { getAll, create } from "../api/apiList";

export type ListsState = {
  lists: ListType[];
};

const initialState: ListsState = {
  lists: [],
};

export const getLists = createAsyncThunk("lists/fetch", async () => {
  return await getAll();
});

export const createList = createAsyncThunk(
  "lists/add",
  async (data: Omit<ListType, "id">) => {
    return await create(data);
  }
);

export const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    addList: (state, action: PayloadAction<ListType>) => {
      state.lists.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createList.fulfilled, (state, action) => {
      listsSlice.caseReducers.addList(state, action);
    });

    builder.addCase(getLists.fulfilled, (state, action) => {
      state.lists = action.payload;
    });
  },
});

export const listsSelector = (state: RootState) => state.lists;
export const { addList } = listsSlice.actions;

export default listsSlice.reducer;
