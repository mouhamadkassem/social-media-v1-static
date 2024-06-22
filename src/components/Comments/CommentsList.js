import React, { useEffect, useState } from "react";
import "./Comments.css";
import Navbar from "../Navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import LoadingComment from "../Loading/LoadingComment";
import {
  addComment,
  deleteComment,
  editComment,
} from "../../redux/slices/Comment/Comment";
import { TbEdit } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
import { fetchPostDetailsAction } from "../../redux/slices/Post/Post";
import dateformat from "dateformat";

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
            <button
              className="btn-addComment"
              onClick={() => {
                editCommentHandler(commentId);
              }}
            >
              Edit Comment
            </button>
          ) : (
            <button className="btn-addComment" onClick={addCommentHandler}>
              Add Comment
            </button>
          )}
        </div>

        {loading && !postDetails ? (
          <LoadingComment />
        ) : (
          <div className="comments-list">
            {postDetails?.comment?.map((comment) => (
              <div className="comment" key={comment?._id}>
                <div>
                  <img src={comment?.user?.profilePhoto} alt="" />
                  <h3>
                    {comment?.user?.firstName} {comment?.user?.lastName}
                  </h3>
                </div>
                <div className="desc-comment">{comment?.description}</div>
                {userLoginId === comment?.user?._id ? (
                  <div className="comment-btn">
                    <div className="edit-comment">
                      <TbEdit
                        size={25}
                        onClick={(e) => {
                          setNewDescription(comment?.description);
                          setCommentId(comment?._id);
                          setEdit(true);
                        }}
                      />
                    </div>
                    <div className="delete-comment">
                      <MdDeleteOutline
                        size={25}
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
