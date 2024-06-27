import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingPost from "../../../components/Loading/LoadingPost";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import "./PostList.css";
import {
  fetchPostsAction,
  likesAction,
  dislikesAction,
  fetchPostDetailsAction,
} from "../../../redux/slices/Post/Post";
import { Link } from "react-router-dom";
import {
  handleOppositeReview,
  handleReview,
  isUserExistInList,
} from "./handleLikes";

const PostList = () => {
  const { postList, serverErr, appErr, loading, postLike, newPost } =
    useSelector((state) => state?.post);
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Array.isArray(postList)) {
      setPosts(postList);
    }
  }, [postList]);

  useEffect(() => {
    dispatch(fetchPostsAction());
  }, [newPost]);

  const likePost = (index, id) => {
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
  };

  const disLikePost = (index, id) => {
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
  };

  return (
    <div className="PostList">
      {loading && !postList ? (
        <LoadingPost />
      ) : (
        <>
          {posts?.map((post, index) => (
            <div className="post" key={post?._id}>
              <div className="userDetailsPost">
                <div className="postUser">
                  <Link to={`/profile/${post?.user?._id}`}>
                    <img src={post?.user?.profilePhoto} alt="" />
                  </Link>
                  <div>
                    <h3>
                      {post?.user?.firstName} {post?.user?.lastName}
                    </h3>
                    <p>{post?.createAt}</p>
                  </div>
                </div>
                <div className="post-description">
                  <p>{post?.description}</p>
                </div>
              </div>

              <div className="postImg">
                <img src={post?.image} alt="" />
              </div>
              <div className="opinions">
                <div className="opinion">
                  {post?.likes?.length}{" "}
                  <AiFillLike
                    onClick={() => {
                      likePost(index, post?._id);
                    }}
                  />
                </div>
                <div className="opinion">
                  {post?.disLikes?.length}{" "}
                  <AiFillDislike
                    onClick={() => {
                      disLikePost(index, post?._id);
                    }}
                  />
                </div>
                <div className="opinion">
                  <Link to="/comments">
                    <FaCommentAlt
                      onClick={() => {
                        dispatch(fetchPostDetailsAction(post?._id));
                      }}
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default PostList;
