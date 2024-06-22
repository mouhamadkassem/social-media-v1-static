import React from "react";
import ReactLoading from "react-loading";
import "./Loading.css";

const Loading = () => {
  // <ReactLoading type="spin" color="rgb(125, 66, 125)" height={15} width={15} />
  return (
    <div class="neon">
      <div class="big-square">
        <div class="second2-square">
          <div class="second-square">
            <div class="small-square">
              <div class="aqua-led"></div>
              <div class="violet-led"></div>
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
