import React from "react";
import { GameCard } from "../types/GameCard";
import { CANVAS_NAME, DEFAULT_HEIGHT, DEFAULT_WIDTH } from "../utils/canvasDefaults";
import { CanvasContextWrapper } from "../wrappers/CanvasContextWrapper";
import { GameFieldWithCanvas } from "./GameFieldWithCanvas";

export function ProvidedCanvas(
  props: { gameCard: GameCard, height?: number, width?: number }
): JSX.Element {
  const [hasRenderedCanvas, setHasRenderedCanvas] = React.useState(false);
  React.useEffect(() => setHasRenderedCanvas(true), []);
  return <>
    <canvas
      id={CANVAS_NAME}
      width={props.width ?? DEFAULT_WIDTH}
      height={props.height ?? DEFAULT_HEIGHT}
    >
      Your browser does not support the HTML canvas tag.
    </canvas>
    {hasRenderedCanvas
      ? <CanvasContextWrapper>
        <GameFieldWithCanvas gameCard={props.gameCard} />
      </CanvasContextWrapper>
      : <p> Loading game graphics...</p>
    }
  </>
}


