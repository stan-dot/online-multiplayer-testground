import React from "react";

interface PiecesCounterProps {
  title: string;
  total: number;
  current: number;
}

function PiecesCounter({title, total, current }: PiecesCounterProps) {
  return (
    <div>
      PiecesCounter
      <h5 className="text-lg">{title}</h5>
      {current} out of {total}
    </div>
  );
}

export default PiecesCounter;
