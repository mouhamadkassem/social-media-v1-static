import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userSlice from "../slices/User/User.js";
import postSlice from "../slices/Post/Post.js";
import commentSlice from "../slices/Comment/Comment.js";
import chatSlice from "../slices/Chat/Chat.js";
import message from "../slices/message/message.js";
import market from "../slices/Market/Market.js";
const store = configureStore({
  reducer: {
    user: userSlice,
    post: postSlice,
    comment: commentSlice,
    chat: chatSlice,
    message,
    market,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
