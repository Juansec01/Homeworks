import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import postReducer from "./PostSlice";
import messagesReducer from "./MessagesSlice";
import notificationsReducer from "./NotificationsSlice";

import { auth, saveStateToFirestore } from "./firebase/config";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    messages: messagesReducer,
    notifications: notificationsReducer,
  },
});

// Persistencia automática (debounce)
let saveTimeout = null;
store.subscribe(() => {
  if (saveTimeout) clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    const state = store.getState();
    const uid = auth.currentUser?.uid;
    if (uid) {
      saveStateToFirestore(uid, {
        posts: state.posts,
        messages: state.messages,
        notifications: state.notifications,
      });
    }
  }, 800);
});
