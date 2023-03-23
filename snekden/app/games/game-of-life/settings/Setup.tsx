"use client";
import { useState } from "react";
import { basicSquare, defaultGlider } from "../constants/defaults";
import { Shape } from "../types/CellsCanvasData";
import { AddNewShape } from "./AddNewShape";
import { ExampleLine } from "./ExampleLine";

const DEFAULT_SHAPES: Shape[] = [ defaultGlider, basicSquare];
const availableShapes: Shape[] = [ defaultGlider, basicSquare];

export function Setup(
  props: { callback: (shapes: Shape[]) => void; cancelCallback: () => void },
) {
  const [shapes, setShapes] = useState<Shape[]>(DEFAULT_SHAPES);

  const newShapeCallback = (newShape: Shape) => {
    setShapes((existing) => {
      return [...existing, newShape];
    });
  };
  return (
    <div id="setup">
      {/* a list of shapes and introduction to a starting point for each */}
      {shapes.map((s, i) => <ExampleLine key={i} s={s} />)}
      <AddNewShape addCallback={newShapeCallback} />
      <div>
        <button onClick={() => props.callback(shapes)}>
          Submit
        </button>
        <button onClick={props.cancelCallback}>
          Cancel
        </button>
      </div>
    </div>
  );
}
