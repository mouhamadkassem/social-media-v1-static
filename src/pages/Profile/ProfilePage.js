import React, { useEffect, useState } from "react";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import { TbEdit } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
import { BsCameraFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
import {
  fetchProfileDetailsCtrl,
  userdetailsAction,
  followUserAction,
  unFollowUserAction,
  blockUserAction,
  unBlockUserAction,
} from "../../redux/slices/User/User";
import "./ProfilePage.css";

import {
  likesAction,
  dislikesAction,
  fetchPostDetailsAction,
  deletePostAction,
} from "../../redux/slices/Post/Post";
import { useParams, Link } from "react-router-dom";
import UpdateProfile from "./UpdateProfile/UpdateProfile";
import UpdatePost from "./UpdatePost/UpdatePost";
import UploadProfileImg from "./UpdatePost/UploadProfileImg/UploadProfileImg";
import dateFormat from "dateformat";
import LoadingProfile from "../../components/Loading/LoadingProfile";
import Button from "../../components/Button/Button";

const ProfilePage = () => {
  const [updateProfile, setUpdateProfile] = useState(false);
  const [updatePost, setUpdatePost] = useState(false);
  const [uploadProImg, setUploadProImg] = useState(false);
  const [postId, setPostId] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();

  const {
    profileUser,
    loading,
    unFollowUser,
    followUser,
    blockUser,
    unBlockUser,
    userLoginDetails,
    imgUploaded,
  } = useSelector((state) => state?.user);

  const { postLike, postDeleted, postUpdated } = useSelector(
    (state) => state?.post
  );

  const userLogin = JSON.parse(localStorage.getItem("user-auth")).id;
  const isFollow = profileUser?.followers?.find(
    (user) => user?._id.toString() === userLogin.toString()
  );

  const isBlock = userLoginDetails?.isblocked?.find((user) => user?._id === id);

  const isUserAuth = id === userLogin;

  useEffect(() => {
    dispatch(fetchProfileDetailsCtrl(id));
    dispatch(userdetailsAction(userLogin));
  }, [
    unFollowUser,
    followUser,
    blockUser,
    unBlockUser,
    postLike,
    postDeleted,
    postUpdated,
    imgUploaded,
  ]);

  return (
    <>
      <Navbar />
      {(loading && !userLoginDetails) ||
      (loading && id !== profileUser?._id) ? (
        <LoadingProfile />
      ) : (
        <div className="ProfilePage">
          <div className="user-Info">
            <div className="user-info-sec">
              <div className="pro-info-img">
                <img src={profileUser?.profilePhoto} alt="" />
                {isUserAuth ? (
                  <div className="to-uploadProfileImg">
                    <BsCameraFill
                      onClick={() => {
                        setUploadProImg(true);
                      }}
                    />
                  </div>
                ) : null}
              </div>
              <div className="pro-info">
                <h3>
                  {profileUser?.firstName} {profileUser?.lastName}
                </h3>
                <p className="pro-create-at">
                  {dateFormat(profileUser?.createdAt, "d / m / yyyy")}
                </p>
                <p className="bio">bio : {profileUser?.bio}</p>
              </div>
            </div>
            <div className="pro-right-section">
              <div className="pro-btn">
                {isUserAuth ? null : (
                  <>
                    {!isFollow ? (
                      <Button
                        classname="follow-btn"
                        text="Follow"
                        onClick={() => {
                          dispatch(followUserAction(profileUser?._id));
                          dispatch(unBlockUserAction(profileUser?._id));
                        }}
                      />
                    ) : (
                      <Button
                        text="Unfollow"
                        classname="unfollow-btn"
                        onClick={() => {
                          dispatch(unFollowUserAction(profileUser?._id));
                        }}
                      />
                    )}
                    <Link to={`/chat/${profileUser?._id}`}>
                      <Button classname="message-btn" text="Message" />
                    </Link>
                    {!isBlock ? (
                      <Button
                        text="Block"
                        classname="block-btn"
                        onClick={() => {
                          dispatch(blockUserAction(profileUser?._id));
                          dispatch(unFollowUserAction(profileUser?._id));
                        }}
                      />
                    ) : (
                      <Button
                        text="UnBlock"
                        classname="block-btn"
                        onClick={() => {
                          dispatch(unBlockUserAction(profileUser?._id));
                        }}
                      />
                    )}
                  </>
                )}
                {isUserAuth ? (
                  <p className="update-profile-btn">
                    <TbEdit
                      size={30}
                      onClick={() => {
                        setUpdateProfile(true);
                      }}
                    />
                  </p>
                ) : null}
              </div>
              <div className="user-interaction">
                <span>
                  <h3>followers</h3>
                  <h3>{profileUser?.followers?.length}</h3>
                </span>
                <span>
                  <h3>following</h3>
                  <h3>{profileUser?.following?.length}</h3>
                </span>
                <span>
                  <h3>posts</h3>
                  <h3>{profileUser?.posts?.length}</h3>
                </span>
              </div>
            </div>
          </div>
          <div className="pro-posts">
            {profileUser?.posts?.map((post) => (
              <div className="pro-post" key={post?._id}>
                {isUserAuth ? (
                  <div className="edit-delete-post">
                    <TbEdit
                      onClick={() => {
                        setUpdatePost(true);
                        setPostId(post?._id);
                      }}
                    />
                    <MdDeleteOutline
                      onClick={() => {
                        dispatch(deletePostAction(post?._id));
                      }}
                    />
                  </div>
                ) : null}
                <div className="pro-post-img">
                  <Link to={`/postDetails/${post?._id}`}>
                    <img src={post?.image} alt="" />
                  </Link>
                </div>
                <div className="pro-opinions">
                  <div className="opinion">
                    {post?.likes?.length}
                    <AiFillLike
                      size={15}
                      onClick={() => {
                        dispatch(likesAction(post?._id));
                      }}
                    />
                  </div>
                  <div className="opinion">
                    {post?.disLikes?.length}
                    <AiFillDislike
                      size={15}
                      onClick={() => {
                        dispatch(dislikesAction(post?._id));
                      }}
                    />
                  </div>
                  <div className="opinion">
                    <Link to="/comments">
                      <FaCommentAlt
                        size={15}
                        onClick={() => {
                          dispatch(fetchPostDetailsAction(post?._id));
                        }}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {updateProfile ? (
            <UpdateProfile setUpdateProfile={setUpdateProfile} />
          ) : null}
          {updatePost ? (
            <UpdatePost setUpdatePost={setUpdatePost} postId={postId} />
          ) : null}
          {uploadProImg ? (
            <UploadProfileImg setUploadProImg={setUploadProImg} />
          ) : null}
        </div>
      )}
    </>
  );
};

export default ProfilePage;
