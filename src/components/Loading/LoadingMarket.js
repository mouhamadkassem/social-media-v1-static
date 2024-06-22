import React from "react";
import "./LoadingMarket.css";
import Loading from "./Loading";

const LoadingMarket = () => {
  return (
    <div className="load-market">
      <div className="load-section">
        <div className="load">
          <span>
            <Loading />
          </span>
        </div>
        <div className="load">
          <span>
            <Loading />
          </span>
        </div>
        <div className="load">
          <span>
            <Loading />
          </span>
        </div>
        <div className="load">
          <span>
            <Loading />
          </span>
        </div>
        <div className="load">
          <span>
            <Loading />
          </span>
        </div>
        <div className="load">
          <span>
            <Loading />
          </span>
        </div>
        <div className="load">
          <span>
            <Loading />
          </span>
        </div>
        <div className="load">
          <span>
            <Loading />
          </span>
        </div>
      </div>
      {/* <div className="load-section">
        <div className="load">
          <span>
            Loading...
            <Loading />
          </span>
        </div>
        <div className="load">
          <span>
            Loading...
            <Loading />
          </span>
        </div>
        <div className="load">
          <span>
            Loading...
            <Loading />
          </span>
        </div>
        <div className="load">
          <span>
            Loading...
            <Loading />
          </span>
        </div>
      </div> */}
    </div>
  );
};

export default LoadingMarket;
