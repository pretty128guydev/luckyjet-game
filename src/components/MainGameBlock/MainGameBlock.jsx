import React, { useEffect, useState } from "react";
import "./MainGameBlock.css"; // Import the CSS file
import usePolling from "../../hooks/usePolling";
import useSmoothIncrement from "../../hooks/useSmoothIncrement";
import GameAnimation from "./GameAnimation";
import { useDispatch, useSelector } from "react-redux";

const MainGameBlock = () => {
  const [animationKey, setAnimationKey] = useState(0); // State to reset animation
  const [flyAway, setFlyAway] = useState(false);
  const [resetCoefficient, setResetCoefficient] = useState(true);

  const historyData = useSelector((state) => state.history.historyData);

  const handleFlyAway = () => {
    setFlyAway(true);
  };

  // Function to restart animations
  const restartAnimations = () => {
    setFlyAway(false); // Reset flyAway state
    setAnimationKey((prev) => prev + 1); // Trigger animation reset
    setResetCoefficient(true); // Reset coefficient at the start of a new round
  };

  const targetCoefficient = resetCoefficient ? 1 : historyData?.current_coefficients[0] || 0;
  // console.log(targetCoefficient);
  const displayCoefficient = useSmoothIncrement(targetCoefficient);

  useEffect(() => {
    if (historyData?.state === "betting") {
      restartAnimations();
    } else if (historyData?.state === "ending") {
      // setTimeout(() => {
      //   handleFlyAway();
      //   setResetCoefficient(false); // Stop resetting coefficient when the round ends
      // }, 2000)
    } else {
      setResetCoefficient(false);
    }
  }, [historyData?.state]);

  useEffect(() => {
    if (historyData?.state === "ending" && displayCoefficient === historyData?.current_coefficients[0]) {
      handleFlyAway();
      setResetCoefficient(false); // Stop resetting coefficient when the round ends
    }
  }, [displayCoefficient, historyData?.current_coefficients]);


  console.log(historyData?.state)
  // const loadingStyle = {
  //   width: historyData?.state === "waiting" || historyData?.state === "betting" ? "0%" : "100%", // Adjust the width as needed
  //   transition: "width 7s ease-in-out" // Smooth transition for width change
  // }
  const loadingStyle = {
    width: historyData?.state === "waiting" || historyData?.state === "betting" ? "0%" : "100%", // Adjust the width as needed
    transition: "width 7s ease-in-out" // Smooth transition for width change
  }

  console.log(loadingStyle)

  if (historyData?.state === "waiting" || historyData?.state === "betting") {
  // if (1 === 1) {
    return (
      <>
        <div className="loading-container">
          <img src="/loading.svg" alt="" />
          <h3 className="waiting-text">Waiting for the next <br></br>round</h3>
          <div style={{ width: "245px" }}>
            <div className="jMhEmG" style={loadingStyle}>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <div style={{ height: "100%" }} className={`game-container ${historyData?.state === "waiting" ? "loading" : ""} ${flyAway ? "animation-stopped" : ""}`}>
      <div className="star"></div>
      <div className="cloud"></div>
      <div className="game-center-text">
        <div className={`current-coffecient ${flyAway ? "animation-coffecient" : ''}`}><span style={{ fontSize: "40px" }}>x</span> {displayCoefficient.toFixed(2)}</div>
        {historyData?.state === "ending" && flyAway && <h3 className="game-text flew-away">Flew Away</h3>}
      </div>
      <GameAnimation
        flyAway={flyAway}
        animationKey={animationKey}
      />
    </div>
  );
};

export default MainGameBlock;
