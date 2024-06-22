import React from "react";
import "./LoadingComment.css";
import Loading from "./Loading";

const LoadingComment = () => {
  return (
    <div className="LoadingComment">
      <span>
        <Loading />
      </span>
    </div>
  );
};

export default LoadingComment;
