import React, { useState, useRef } from "react";

function ReactionTime() {
  const [gameStatus, setGameStatus] = useState("ready");
  const [clickTimes, setClickTimes] = useState(() => ({ start: new Date(), end: new Date() }));
  const reactionEl = useRef(document.createElement("div"));

  const handleClick = (gameStatus: string) => {
    console.log(clickTimes);
    console.log(gameStatus);

    switch (gameStatus) {
      case "ready":
        //// WAITING FOR NOTIFICATION TO CLICK ////
        reactionEl.current.style.background = "red";
        setGameStatus("wait");

        // TODO: randomise time to click & handle if user click before or after
        setTimeout(() => {
          console.log("CLICK NOW");
        }, Math.floor(Math.random() * (10000 - 2000) + 2000));

        break;
      case "wait":
        //// USER CLICKED ////
        reactionEl.current.style.background = "yellow";
        setClickTimes({ ...clickTimes, start: new Date() });
        setGameStatus("reset");
        break;
      case "reset":
        reactionEl.current.style.background = "red";
        setClickTimes({ ...clickTimes, end: new Date() });
        setGameStatus("wait");
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div
        ref={reactionEl}
        onClick={() => handleClick(gameStatus)}
        style={{ width: 300, height: 300, background: "blue" }}
      ></div>
    </>
  );
}

export default ReactionTime;
