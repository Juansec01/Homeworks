import { createSlice } from "@reduxjs/toolkit";

const messagesSlice = createSlice({
  name: "messages",
  initialState: { list: [] },
  reducers: {
    enqueueMessage: (state, action) => {
      state.list.push(action.payload);
    },
    dequeueMessage: (state) => {
      state.list.shift();
    },
    setMessages: (state, action) => {
      state.list = action.payload || [];
    },
  },
});

export const { enqueueMessage, dequeueMessage, setMessages } =
  messagesSlice.actions;
export default messagesSlice.reducer;
