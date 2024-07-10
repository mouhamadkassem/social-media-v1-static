import React, { useCallback, useEffect, useState } from "react";
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
import { useParams } from "react-router-dom";

const Comments = () => {
  const postId = useParams().id;
  const [description, setDescription] = useState("");
  const [comments, setComments] = useState([]);
  const [edit, setEdit] = useState(false);
  const [toEditCommentId, setToEditCommentId] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const userLogin = JSON.parse(localStorage.getItem("user-auth"));

  const dispatch = useDispatch();

  const { postDetails, loading } = useSelector((state) => state?.post);
  const { newComment, deletedComment, editedComment } = useSelector(
    (state) => state?.comment
  );

  useEffect(() => {
    setComments(postDetails?.comment);
  }, [postDetails]);

  useEffect(() => {
    dispatch(fetchPostDetailsAction(postId));
  }, [newComment, deletedComment, editedComment, postId]);

  const addCommentHandler = useCallback(() => {
    if (description !== "") {
      const data = {
        post: postDetails?._id,
        userId: userLogin.id,
        description: description,
      };
      setComments((prev) => [
        ...prev,
        {
          ...data,
          user: { profilePhoto: userLogin?.photo, _id: userLogin?.id },
        },
      ]);
      dispatch(addComment(data));
      setDescription("");
    }
  }, [description, comments]);

  const editCommentHandler = useCallback(
    (id) => {
      if (newDescription !== "") {
        const data = {
          description: newDescription,
          id,
        };
        const newCommentList = comments?.map((comment) => {
          if (comment._id === id) {
            return { ...comment, description: newDescription };
          }
          return comment;
        });
        setComments(newCommentList);
        dispatch(editComment(data));
        setEdit(false);
        setDescription("");
      }
    },
    [newDescription, comments]
  );

  const deleteCommentHandler = useCallback(
    (commentId) => {
      const newCommentList = comments.filter(
        (comment) => comment?._id !== commentId
      );

      setComments(newCommentList);
      dispatch(deleteComment(commentId));
    },
    [comments]
  );

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
                editCommentHandler(toEditCommentId);
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
          <>
            {comments?.length === 0 ? (
              <div className="emptyArray">Oopps!! Not Comments Added Yet.</div>
            ) : (
              <div className="comments-list">
                {comments?.map((comment) => (
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
                    {userLogin.id === comment?.user?._id ? (
                      <div className="comment-btn">
                        <div className="edit-comment">
                          <TbEdit
                            onClick={() => {
                              setNewDescription(comment?.description);
                              setToEditCommentId(comment?._id);
                              setEdit(true);
                            }}
                          />
                        </div>
                        <div className="delete-comment">
                          <MdDeleteOutline
                            onClick={() => {
                              deleteCommentHandler(
                                comment?._id,
                                postDetails?._id
                              );
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
          </>
        )}
      </div>
    </>
  );
};

export default Comments;
