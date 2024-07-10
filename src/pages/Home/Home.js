import React, { useCallback, useEffect, useState } from "react";
import PostList from "./PostList/PostList";
import ProfileSide from "./HomePage/ProfileSide";
import FollowingList from "./FollowingList/FollowingList";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";

const Home = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [showFollowingList, setShowFollowingList] = useState(true);
  const [showLayout, setShowLayout] = useState("Posts");

  /////////////////////// Resize is re Rendered every single rezise , try use Condition

  window.addEventListener("resize", () => {
    setWidth(window.innerWidth);
  });

  const handleShowLayout = useCallback(() => {
    setShowFollowingList(!showFollowingList);
  }, [showFollowingList]);

  return (
    <>
      <Navbar />

      <div className="home-page">
        {width <= 756 ? (
          <div className="phoneNav">
            <div
              className={`phoneNavOption ${
                showLayout === "Posts" ? "phoneNavOptionSelected" : ""
              }`}
              onClick={() => setShowLayout("Posts")}
            >
              Posts
            </div>
            <div
              className={`phoneNavOption ${
                showLayout === "Profile Posts" ? "phoneNavOptionSelected" : ""
              }`}
              onClick={() => setShowLayout("Profile Posts")}
            >
              Profile Posts
            </div>
            <div
              className={`phoneNavOption ${
                showLayout === "Following List" ? "phoneNavOptionSelected" : ""
              }`}
              onClick={() => setShowLayout("Following List")}
            >
              Following List
            </div>
          </div>
        ) : (
          <></>
        )}

        {width > 1200 ? (
          <>
            <ProfileSide />

            <PostList />

            <FollowingList />
          </>
        ) : width > 756 ? (
          <>
            <PostList />
            {showFollowingList ? (
              <FollowingList handleShowLayout={handleShowLayout} />
            ) : (
              <ProfileSide handleShowLayout={handleShowLayout} />
            )}
          </>
        ) : (
          <>
            {showLayout === "Posts" ? (
              <PostList />
            ) : showLayout === "Profile Posts" ? (
              <ProfileSide />
            ) : (
              <FollowingList />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Home;
