import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import usersReducer from "../features/usersSlice";
import listsReducer from "../features/listsSlice";
import playersReducer from "../features/playersSlice";
import chatReducer from "../features/chatSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    lists: listsReducer,
    players: playersReducer,
    chat: chatReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
