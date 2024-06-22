import React from "react";
import "./LoadingPost.css";
import Loading from "./Loading";

const LoadingPost = () => {
  return (
    <div className="LoadingPost">
      <span>
        <Loading />
      </span>
    </div>
  );
};

export default LoadingPost;
