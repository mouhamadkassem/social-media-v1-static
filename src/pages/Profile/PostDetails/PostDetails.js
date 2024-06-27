import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../../components/Navbar/Navbar";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import "../../Home/PostList/PostList.css";
import {
  likesAction,
  dislikesAction,
  fetchPostDetailsAction,
} from "../../../redux/slices/Post/Post";
import "./PostDetails.css";

const PostDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPostDetailsAction(id));
  }, []);

  const post = useSelector((state) => state?.post?.postDetails);
  return (
    <>
      <Navbar />
      <div className="post-details">
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
      </div>
    </>
  );
};

export default PostDetails;
