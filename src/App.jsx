import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Header from "./Header";
import Login from "./Login";
import DirectMessages from "./DirectMessages";
import PostList from "./PostList";

import { auth, loadStateFromFirestore } from "./firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { loginSuccess } from "./AuthSlice";
import { setPosts } from "./PostSlice";
import { setMessages } from "./MessagesSlice";
import { setNotifications } from "./NotificationsSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(loginSuccess({ uid: user.uid, email: user.email }));
        const persisted = await loadStateFromFirestore(user.uid);
        if (persisted) {
          if (persisted.posts) dispatch(setPosts(persisted.posts.posts || persisted.posts));
          if (persisted.messages) dispatch(setMessages(persisted.messages.list || persisted.messages));
          if (persisted.notifications)
            dispatch(setNotifications(persisted.notifications.list || persisted.notifications));
        }
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div>
      <Header />
      <main>
        <section>
          <Login />
          <PostList />
        </section>
        <section>
          <DirectMessages />
        </section>
      </main>
    </div>
  );
};

export default App;
