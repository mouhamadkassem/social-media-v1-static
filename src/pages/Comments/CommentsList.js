import React, { useEffect, useState } from "react";
import "./Comments.css";
import Navbar from "../../components/Navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import LoadingComment from "../../components/Loading/LoadingComment";
import {
  addComment,
  deleteComment,
  editComment,
} from "../../redux/slices/Comment/Comment";
import { TbEdit } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
import { fetchPostDetailsAction } from "../../redux/slices/Post/Post";
import dateformat from "dateformat";
import Button from "../../components/Button/Button";

const Comments = () => {
  const [description, setDescription] = useState("");
  const [edit, setEdit] = useState(false);
  const [commentId, setCommentId] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const userLoginId = JSON.parse(localStorage.getItem("user-auth")).id;

  const dispatch = useDispatch();

  const { postDetails, appErr, serverErr, loading } = useSelector(
    (state) => state?.post
  );

  const addCommentHandler = () => {
    if (description !== "") {
      const data = {
        post: postDetails?._id,
        userId: userLoginId,
        description: description,
      };
      dispatch(addComment(data));
      dispatch(fetchPostDetailsAction(postDetails?._id));
      setDescription("");
    }
  };

  const editCommentHandler = (id) => {
    if (newDescription !== "") {
      const data = {
        description: newDescription,
        id,
      };
      dispatch(editComment(data));
      dispatch(fetchPostDetailsAction(postDetails?._id));
      setEdit(false);
      setDescription("");
    }
  };
  return (
    <>
      <Navbar />
      <div className="Comments">
        <div className="addComment">
          {edit ? (
            <input
              className="addCommentInput"
              id="addComment"
              placeholder="Edit Comment..."
              value={newDescription}
              onChange={(e) => {
                setNewDescription(e.target.value);
              }}
            />
          ) : (
            <input
              className="addCommentInput"
              id="addComment"
              placeholder="Add Comment..."
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          )}
          {edit ? (
            <Button
              onClick={() => {
                editCommentHandler(commentId);
              }}
              text="Edit"
            ></Button>
          ) : (
            <Button text="Add" onClick={addCommentHandler}></Button>
          )}
        </div>

        {loading && !postDetails ? (
          <LoadingComment />
        ) : (
          <div className="comments-list">
            {postDetails?.comment?.map((comment) => (
              <div className="comment" key={comment?._id}>
                <div className="userInfoCmmt">
                  <img src={comment?.user?.profilePhoto} alt="" />
                  <h3>
                    {comment?.user?.firstName} {comment?.user?.lastName}
                  </h3>
                </div>
                <div className="desc-comment">
                  <p>{comment?.description}</p>
                </div>
                {userLoginId === comment?.user?._id ? (
                  <div className="comment-btn">
                    <div className="edit-comment">
                      <TbEdit
                        onClick={() => {
                          setNewDescription(comment?.description);
                          setCommentId(comment?._id);
                          setEdit(true);
                        }}
                      />
                    </div>
                    <div className="delete-comment">
                      <MdDeleteOutline
                        onClick={() => {
                          dispatch(deleteComment(comment?._id));
                          dispatch(fetchPostDetailsAction(postDetails?._id));
                        }}
                      />
                    </div>
                  </div>
                ) : null}
                <div className="timeCreateAt">
                  {dateformat(comment?.createdAt, " HH:MM dd/mm/yy")}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Comments;
