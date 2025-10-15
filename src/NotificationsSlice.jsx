import { createSlice } from "@reduxjs/toolkit";

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: { list: [] },
  reducers: {
    pushNotification: (state, action) => {
      state.list.unshift(action.payload);
    },
    popNotification: (state) => {
      state.list.shift();
    },
    setNotifications: (state, action) => {
      state.list = action.payload || [];
    },
  },
});

export const { pushNotification, popNotification, setNotifications } =
  notificationsSlice.actions;
export default notificationsSlice.reducer;
