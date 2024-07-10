import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleOppositeReview,
  handleReview,
  isUserExistInList,
} from "./handleLikes";
import {
  dislikesAction,
  fetchPostsAction,
  likesAction,
} from "../../../redux/slices/Post/Post";

const PostListContext = createContext();

export const PostListContextProvider = (props) => {
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();

  const { postList, loading, newPost } = useSelector((state) => state?.post);

  useEffect(() => {
    if (Array.isArray(postList)) {
      setPosts(postList);
    }
  }, [postList]);

  useEffect(() => {
    dispatch(fetchPostsAction());
  }, [newPost]);

  const likePost = useCallback(
    (index, id) => {
      let updatedPost = posts;
      const isUserLikedPost = isUserExistInList(posts[index]?.likes);

      if (!isUserLikedPost) {
        updatedPost = handleOppositeReview(
          posts[index]?.disLikes,
          updatedPost,
          id,
          true
        );
      } else {
        updatedPost = handleReview(posts[index]?.likes, updatedPost, id, true);
      }

      if (updatedPost) setPosts(updatedPost);
      dispatch(likesAction(id));
    },
    [posts]
  );

  const disLikePost = useCallback(
    (index, id) => {
      let updatedPost = posts;
      const isUserdisLikedPost = isUserExistInList(posts[index]?.disLikes);

      if (!isUserdisLikedPost) {
        updatedPost = handleOppositeReview(
          posts[index]?.likes,
          updatedPost,
          id,
          false
        );
      } else {
        updatedPost = handleReview(
          posts[index]?.disLikes,
          updatedPost,
          id,
          false
        );
      }

      if (updatedPost) setPosts(updatedPost);
      dispatch(dislikesAction(id));
    },
    [posts]
  );

  const value = {
    postList,
    posts,
    loading,
    likePost,
    disLikePost,
  };

  return <PostListContext.Provider value={value} {...props} />;
};

export const usePostList = () => {
  const context = useContext(PostListContext);

  if (context === null) {
    throw new Error("useCart must be used within cartContextProvider");
  }

  return context;
};
