import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { joinChatAction } from "../../redux/slices/Chat/Chat";
import Navbar from "../Navbar/Navbar";
import "./Chat.css";
import io from "socket.io-client";
import { createMessageAction } from "../../redux/slices/message/message";
import { fetchProfileDetailsCtrl } from "../../redux/slices/User/User";
import ScrollToBottom from "react-scroll-to-bottom";
import dateformat from "dateformat";
import Loading from "../Loading/Loading";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");

  const dispatch = useDispatch();
  const { id } = useParams();
  const userLogin = JSON.parse(localStorage.getItem("user-auth")).id;

  const { chat, loading } = useSelector((state) => state?.chat);

  const { profileUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(joinChatAction(id));
    dispatch(fetchProfileDetailsCtrl(id));
  }, []);

  useEffect(() => {
    setMessages(chat?.messages || []);
    const chatId = chat?._id;
    socket.emit("join-room", chatId);
  }, [chat]);

  const socket = io.connect("http://localhost:5000");

  const handleSend = () => {
    const newMessage = {
      sender: userLogin,
      chatId: chat?._id,
      content: content,
      createdAt: new Date(),
    };
    socket.emit("send-message", newMessage);
    dispatch(createMessageAction(newMessage));
    setContent("");
  };

  useEffect(() => {
    socket.on("receive-message", (data) => {
      setMessages((message) => [...message, data]);
    });
  }, [socket]);

  // {profileUser?.profilePhoto}

  return (
    <>
      <Navbar />
      <div className="ChatPage">
        <div className="userMessage">
          <div className="img-div-user">
            <img src={profileUser?.profilePhoto} alt="" />
          </div>
          <div>
            <h2>
              {profileUser?.firstName} {profileUser?.lastName}
            </h2>
          </div>
        </div>
        {loading ? (
          <div className="LoadingChat">
            <span>
              Loading...
              <Loading />
            </span>
          </div>
        ) : (
          <ScrollToBottom className="box-chat">
            {messages?.map((message) => (
              <div
                className={
                  message?.sender === userLogin
                    ? "userAuthMessage msg"
                    : "  message msg"
                }
              >
                <h5>{message?.content}</h5>
                <p>
                  {dateformat(message?.createdAt, " H:MM TT").toLowerCase()}
                </p>
              </div>
            ))}
          </ScrollToBottom>
        )}

        <div className="input-chat">
          <input
            type="text"
            placeholder="write message"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
          <button onClick={handleSend}>send</button>
        </div>
      </div>
    </>
  );
};

export default Chat;
