import React, { useState } from "react";
import "./ReactionTime.css";

const initialDateState = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  return tomorrow.setDate(tomorrow.getDate() + 1);
};

const liveTimeouts: Array<NodeJS.Timeout> = [];

function ReactionTime() {
  const [gameStatus, setGameStatus] = useState("ready");
  const [clickTime, setClickTime] = useState(initialDateState());
  const [afterTime, setAfterTime] = useState(false);

  const handleClick = (gameStatus: string) => {
    const startGame = () => {
      // Clear previous timeouts
      liveTimeouts.forEach((t, i, obj) => {
        clearTimeout(t);
        obj.splice(i, 1);
      });

      // Set initial date to tomorrow (to figure out if click was before or after trigger time)
      setClickTime(initialDateState());

      // Set timeout
      const timeout = setTimeout(() => {
        setAfterTime(true);
        setClickTime(new Date().valueOf());
      }, Math.floor(Math.random() * (8000 - 2000) + 2000));
      liveTimeouts.push(timeout);
    };

    switch (gameStatus) {
      case "ready":
        setGameStatus("wait");
        startGame();
        break;
      case "wait":
        setGameStatus("reset");
        break;
      case "reset":
        setGameStatus("wait");
        setAfterTime(false);
        startGame();
        break;
      default:
        break;
    }
  };

  // Calculate score
  const score = () => {
    return new Date().valueOf() - clickTime.valueOf();
  };

  // Save entries in local storage
  if (score() > 0) {
    const reactionTimes = window.localStorage.getItem("reactionTimes");
    if (reactionTimes && score() > 10) {
      const storedEntries = JSON.parse(reactionTimes);
      storedEntries[new Date().valueOf()] = score();
      window.localStorage.setItem("reactionTimes", JSON.stringify(storedEntries));
    } else if (!reactionTimes && score() > 10) {
      window.localStorage.setItem("reactionTimes", JSON.stringify({}));
    }
  }

  return (
    <div className="reaction-time" onClick={() => handleClick(gameStatus)}>
      {gameStatus === "ready" && (
        <div>
          <h2 className="display-4 text-light">Click as soon as the red box turns green</h2>
          <h2 className="h3 text-light">Click anywhere to start</h2>
        </div>
      )}

      {gameStatus === "wait" && (
        <div className={`${afterTime ? "after-time" : "before-time"}`}>
          {!afterTime ? (
            <h2 className="display-4 text-light">Wait...</h2>
          ) : (
            <h2 className="display-4 text-light">Click!</h2>
          )}
        </div>
      )}

      {gameStatus === "reset" && (
        <div>
          {score() > 0 ? (
            <>
              <h2 className="display-4 text-light">
                <b>{score()}</b>ms
              </h2>
              <h3 className="h3 text-light">Click to try again</h3>
            </>
          ) : (
            <h2 className="display-4 text-light">Clicked too soon</h2>
          )}
        </div>
      )}
    </div>
  );
}

export default ReactionTime;
