import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import "./PostList.css";
import LoadingPost from "../../Loading/LoadingPost";

import {
  fetchPostsAction,
  likesAction,
  dislikesAction,
  fetchPostDetailsAction,
} from "../../../redux/slices/Post/Post";
import { userdetailsAction } from "../../../redux/slices/User/User";
import { Link } from "react-router-dom";
import { fetchProductAction } from "../../../redux/slices/Market/Market";
import LoadingComment from "../../Loading/LoadingComment";
const PostList = () => {
  const dispatch = useDispatch();

  const { postList, serverErr, appErr, loading, postLike, newPost } =
    useSelector((state) => state?.post);

  useEffect(() => {
    dispatch(fetchPostsAction());
  }, [dispatch, postLike, newPost]);

  // useEffect(() => {
  //   dispatch(fetchProductAction());
  // }, [dispatch]);

  return (
    <div className="PostList">
      {loading && !postList ? (
        <LoadingPost />
      ) : (
        <>
          {postList?.map((post) => (
            <div className="post" key={post?._id}>
              <div className="postUser">
                <Link
                  to={`/profile/${post?.user?._id}`}
                  // onClick={() => {
                  //   dispatch(userdetailsAction(post?.user?._id));
                  // }}
                >
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
              <div className="postImg">
                <img src={post?.image} alt="" />
              </div>
              <div className="opinions">
                <div className="opinion">
                  {post?.likes?.length}{" "}
                  <AiFillLike
                    onClick={() => {
                      dispatch(likesAction(post?._id));
                    }}
                  />
                </div>
                <div className="opinion">
                  {post?.disLikes?.length}{" "}
                  <AiFillDislike
                    onClick={() => {
                      dispatch(dislikesAction(post?._id));
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
