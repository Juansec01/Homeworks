import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "not-authenticated", // 'checking' | 'authenticated'
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    checkingCredentials: (state) => {
      state.status = "checking";
    },
    login: (state, action) => {
      state.status = "authenticated";
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.displayName = action.payload.displayName;
      state.photoURL = action.payload.photoURL;
      state.errorMessage = null;
    },
    logout: (state, action) => {
      state.status = "not-authenticated";
      state.uid = null;
      state.email = null;
      state.displayName = null;
      state.photoURL = null;
      state.errorMessage = action.payload?.errorMessage || null;
    },
  },
});

export const { checkingCredentials, login, logout } = authSlice.actions;
export default authSlice.reducer;
