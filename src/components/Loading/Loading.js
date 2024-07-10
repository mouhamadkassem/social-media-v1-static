import React from "react";
import ReactLoading from "react-loading";
import "./Loading.css";

const Loading = ({ size }) => {
  // <ReactLoading type="spin" color="rgb(125, 66, 125)" height={15} width={15} />

  const sizeObj = size
    ? { width: size + "px", height: size + "px" }
    : { width: "100px", height: "100px" };

  const ledSize = size
    ? { width: size / 2 + "px", height: size / 2 + "px" }
    : { width: "50px", height: "50px" };

  return (
    <div className="neon" style={sizeObj}>
      <div className="big-square">
        <div className="second2-square">
          <div className="second-square">
            <div className="small-square">
              <div className="aqua-led" style={ledSize}></div>
              <div className="violet-led" style={ledSize}></div>
              <div className="circle"></div>
              <div className="circle circle1"></div>
              <div className="circle circle2"></div>
              <div className="sign sign"></div>
              <div className="sign sign1"></div>
              <div className="sign sign2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
