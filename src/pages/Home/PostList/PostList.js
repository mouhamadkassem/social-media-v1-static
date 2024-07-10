import React from "react";
import LoadingPost from "../../../components/Loading/LoadingPost";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import "./PostList.css";
import { Link } from "react-router-dom";
import { usePostList } from "./usePostList";

const PostList = () => {
  const { postList, posts, likePost, disLikePost, loading } = usePostList();

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
                  <div className="userNamePost">
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
                  {post?.likes?.length}
                  <AiFillLike
                    onClick={() => {
                      likePost(index, post?._id);
                    }}
                  />
                </div>
                <div className="opinion">
                  {post?.disLikes?.length}
                  <AiFillDislike
                    onClick={() => {
                      disLikePost(index, post?._id);
                    }}
                  />
                </div>
                <div className="opinion">
                  <Link
                    to={`/comments/${post?._id}`}
                    style={{ display: "flex" }}
                  >
                    <FaCommentAlt />
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
