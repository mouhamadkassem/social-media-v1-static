import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { joinChatAction } from "../../redux/slices/Chat/Chat";
import Navbar from "../../components/Navbar/Navbar";
import "./Chat.css";
import io from "socket.io-client";
import { createMessageAction } from "../../redux/slices/message/message";
import { fetchProfileDetailsCtrl } from "../../redux/slices/User/User";
import ScrollToBottom from "react-scroll-to-bottom";
import dateformat from "dateformat";
import Loading from "../../components/Loading/Loading";
import Button from "../../components/Button/Button";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [typing, setTyping] = useState(false);
  const [userWrite, setUserWrite] = useState(0);

  const dispatch = useDispatch();
  const { id } = useParams();

  const userLogin = JSON.parse(localStorage.getItem("user-auth")).id;

  const { chat, loading } = useSelector((state) => state?.chat);

  const { profileUser, userLoginDetails } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(joinChatAction(id));
    dispatch(fetchProfileDetailsCtrl(id));
  }, []);

  useEffect(() => {
    setMessages(chat?.messages || []);
    const chatId = chat?._id;
    socket.emit("join-room", chatId);
  }, [chat]);

  const socket = io.connect("https://social-media-v1.onrender.com");

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

  // const handleTyping = () => {
  //   const lastDate = new Date().getTime();
  // };

  socket.on("typing", (data) => {
    setTyping(data.isTyping);
    setUserWrite(data?.userLogin);
  });

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
            {typing && userWrite !== userLogin ? <div>Typing...</div> : null}
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
            {messages?.map((message, index) => (
              <div
                key={index}
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
            onFocus={() => {
              socket.emit("isTyping", {
                isTyping: true,
                chatId: chat?._id,
                userLogin,
              });
            }}
            onBlur={() => {
              socket.emit("isTyping", { isTyping: false, chatId: chat?._id });
            }}
            onChange={(e) => {
              setContent(e.target.value);
              // handleTyping();
            }}
          />
          <Button text="Send" onClick={handleSend} />
        </div>
      </div>
    </>
  );
};

export default Chat;
