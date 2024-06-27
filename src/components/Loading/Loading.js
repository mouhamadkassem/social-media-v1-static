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
    <div class="neon" style={sizeObj}>
      <div class="big-square">
        <div class="second2-square">
          <div class="second-square">
            <div class="small-square">
              <div class="aqua-led" style={ledSize}></div>
              <div class="violet-led" style={ledSize}></div>
              <div class="circle"></div>
              <div class="circle circle1"></div>
              <div class="circle circle2"></div>
              <div class="sign sign"></div>
              <div class="sign sign1"></div>
              <div class="sign sign2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
