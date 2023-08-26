"use client";
import React, { useState } from "react";
import { getDiceRoll } from "../utils";

interface RollAreaProps {
  callback: (result: number) => void;
}

function RollArea({ callback }: RollAreaProps) {
  const [result, setResult] = useState<number>(0);
  const handleClick = () => {
    const r = getDiceRoll();
    setResult(r);
    callback(r);
  };

  return (
    <div>
      RollArea
      <p>{result}</p>
      <button onClick={handleClick}>click me</button>
    </div>
  );
}

export default RollArea;
