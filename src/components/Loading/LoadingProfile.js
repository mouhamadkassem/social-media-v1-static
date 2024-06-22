import React from "react";
import "./LoadingProfile.css";
import Loading from "./Loading";

const LoadingProfile = () => {
  return (
    <div className="LoadingProfile">
      <div className="l1">
        <span>
          <Loading />
        </span>
      </div>
      <div className="l2">
        <span>
          <Loading />
        </span>
      </div>
    </div>
  );
};

export default LoadingProfile;
