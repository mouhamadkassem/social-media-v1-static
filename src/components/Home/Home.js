import React from "react";
import PostList from "./PostList/PostList";
import ProfileSide from "./HomePage/ProfileSide";
import FollowingList from "./FollowingList/FollowingList";
import "./Home.css";
import Navbar from "../Navbar/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="home-page">
        <ProfileSide />
        <PostList />
        <FollowingList />
      </div>
    </>
  );
};

export default Home;
