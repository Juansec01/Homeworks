import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "posts",
  initialState: { posts: [], loading: false, error: null },
  reducers: {
    fetchPostsStart: (state) => {
      state.loading = true;
    },
    fetchPostsSuccess: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    },
    fetchPostsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
    setPosts: (state, action) => {
      state.posts = action.payload || [];
    },
  },
});

export const {
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostsFailure,
  addPost,
  setPosts,
} = postSlice.actions;
export default postSlice.reducer;
