import React, { useEffect, useRef, useState } from "react";
import { useWindowSize } from "../../hooks/useWindowSize";
import "./AimTrainer.css";

interface Measurements {
  height: number;
  width: number;
}

interface Coords {
  top: number;
  left: number;
}

const AimTrainer: React.FC = () => {
  const ref = useRef<HTMLDivElement>(document.createElement("div"));
  const windowSize = useWindowSize();
  const [measurements, setMeasurements] = useState<Measurements>({ height: 0, width: 0 });
  const [coords, setCoords] = useState<Coords>({ top: 0, left: 0 });
  const [targetsHit, setTargetsHit] = useState<number>(0);
  const [score, setScore] = useState(null);

  useEffect(() => {
    const el = ref.current;
    setMeasurements({ height: el.clientHeight, width: el.clientWidth });
  }, [windowSize]);

  const setRandomCoords = () => {
    setCoords({
      top: Math.floor(Math.random() * Math.abs(measurements.height - 50)),
      left: Math.floor(Math.random() * Math.abs(measurements.width - 50)),
    });
  };

  const handleTargetClick = () => {
    // Increment targets hit
    setTargetsHit(targetsHit + 1);

    if (targetsHit + 1 === 20) {
      // Set score
      console.log("game over");
      // Reset targets hit
      setTargetsHit(0);
    } else {
      // Set new target position
      setRandomCoords();
    }
  };

  return (
    <div ref={ref} className="aim-trainer">
      <div className="target" style={coords} onClick={handleTargetClick}></div>
    </div>
  );
};

export default AimTrainer;
