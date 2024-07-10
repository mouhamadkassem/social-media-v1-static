import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";
import { AiTwotoneHome, AiOutlineUsergroupAdd } from "react-icons/ai";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { RiImageAddFill } from "react-icons/ri";
import AddPostForm from "../../pages/AddPostForm/AddPostForm";
import {
  fetchProfileDetailsCtrl,
  userdetailsAction,
  userLogoutAction,
} from "../../redux/slices/User/User";
import Image from "../../assets/img/default.jpg";

const Navbar = () => {
  const [addPost, setAddPost] = useState(false);
  const [showSetting, setShowSetting] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation().pathname.split("/")[1];
  const userLoginId = JSON.parse(localStorage.getItem("user-auth")).id;

  useEffect(() => {
    dispatch(userdetailsAction(userLoginId));
  }, [dispatch]);

  const { userLoginDetails } = useSelector((state) => state?.user);

  return (
    <nav className="navbar">
      <div className="logo-icon">
        <Link
          to="/home"
          className={`icon-home ${location === "home" ? "selectedPath" : ""} `}
        >
          <AiTwotoneHome size={30} />
        </Link>
      </div>
      <div className="options">
        <Link
          className={`option ${location === "home" ? "selectedPath" : ""} `}
          to="/home"
          onClick={() => {
            setAddPost(true);
          }}
        >
          <RiImageAddFill size={20} />
        </Link>
        {addPost ? (
          <AddPostForm addPost={addPost} setAddPost={setAddPost} />
        ) : null}

        <Link
          className={`option ${location === "profile" ? "selectedPath" : ""} `}
          to={`/profile/${userLoginId}`}
        >
          <BsFillPersonLinesFill
            size={20}
            onClick={() => dispatch(fetchProfileDetailsCtrl(userLoginId))}
          />
        </Link>
        <Link
          className={`option ${location === "auth" ? "selectedPath" : ""} `}
          to="/auth"
        >
          <AiOutlineUsergroupAdd size={20} />
        </Link>
        <Link
          className={`option ${
            location === "market" || location === "product"
              ? "selectedPath"
              : ""
          } `}
          to="/market"
        >
          <SiHomeassistantcommunitystore size={20} />
        </Link>
      </div>
      <div
        className="nav-profile"
        onClick={() => {
          setShowSetting(!showSetting);
        }}
      >
        {!userLoginDetails ? (
          <img src={Image} alt="profileImg" />
        ) : (
          <img src={userLoginDetails?.profilePhoto} alt="profileImg" />
        )}

        {showSetting ? (
          <div className="imgProfile-setting">
            <Link
              className="imgPro-option"
              to={`/profile/${userLoginDetails?._id}`}
            >
              Profile
            </Link>

            <Link
              to="/Logout"
              className="imgPro-option"
              onClick={() => {
                dispatch(userLogoutAction());
              }}
            >
              Logout
            </Link>
          </div>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
