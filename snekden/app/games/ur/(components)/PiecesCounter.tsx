import React from "react";
import { STARTING_PIECES } from "../(logic)/machine";

interface PiecesCounterProps {
  title: string;
  total?: number;
  current: number;
}

function PiecesCounter(
  { title, total = STARTING_PIECES, current }: PiecesCounterProps,
) {
  return (
    <div>
      <h5 className="text-lg">{title}</h5>
      {current} out of {total}
    </div>
  );
}

export default PiecesCounter;
