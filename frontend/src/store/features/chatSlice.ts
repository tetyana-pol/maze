import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { MessageType } from "../../types/Message";
import { create, getAll } from "../api/apiMessage";

export type ChatState = {
  messages: MessageType[];
};

const initialState: ChatState = {
  messages: [],
};

export const getMessages = createAsyncThunk("messages/fetch", async () => {
  return await getAll();
});

export const createMessage = createAsyncThunk(
  "messages/add",
  async (text: string) => {
    return await create(text);
  }
);

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<MessageType>) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMessages.fulfilled, (state, action) => {
      state.messages = action.payload;
    });

    builder.addCase(createMessage.fulfilled, (state, action) => {
      chatSlice.caseReducers.addMessage(state, action);
    });
  },
});

export const chatSelector = (state: RootState) => state.chat;
export const { addMessage } = chatSlice.actions;

export default chatSlice.reducer;
