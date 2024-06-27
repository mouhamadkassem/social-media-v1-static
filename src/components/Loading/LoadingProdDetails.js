import React from "react";
import "./LoadingProdDetails.css";
import Loading from "./Loading";

const LoadingProdDetails = () => {
  return (
    <div className="LoadingProdDetails">
      <div className="load-imgs-product loadProdDetail">
        <span>
          <span>
            <Loading />
          </span>
        </span>
        <span>
          <span>
            <Loading />
          </span>
        </span>
        <span>
          <span>
            <Loading />
          </span>
        </span>
        <span>
          <span>
            <Loading />
          </span>
        </span>
      </div>
      <div className="load-info-product loadProdDetail">
        <span>
          <Loading />
        </span>
      </div>
    </div>
  );
};

export default LoadingProdDetails;
