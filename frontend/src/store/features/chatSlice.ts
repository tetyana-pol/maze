import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { MessageType } from "../../types/Message";

export type ChatState = {
  messages: MessageType[];
};

const initialState: ChatState = {
  messages: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<MessageType>) => {
      state.messages.push(action.payload);
    },

    cleanChat: (state) => {
      state.messages = [];
    },
  },
});

export const chatSelector = (state: RootState) => state.chat;
export const { addMessage, cleanChat } = chatSlice.actions;

export default chatSlice.reducer;
