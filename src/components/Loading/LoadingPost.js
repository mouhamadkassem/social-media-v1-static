import React from "react";
import "./LoadingPost.css";
import Loading from "./Loading";

const LoadingPost = () => {
  return (
    <div className="LoadingPost">
      <span>
        Loading...
        <Loading />
      </span>
    </div>
  );
};

export default LoadingPost;
