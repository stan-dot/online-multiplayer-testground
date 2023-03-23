"use client";
import { useState } from "react";
import { getExpanse, Shape } from "./types/CellsCanvasData";
import { useCanvasForCells } from "./utils/useCanvasForCells";

const DEFAULT_SHAPES: Shape[] = [];

function staticDraw() {
}

export function Setup(props: { callback: (shapes: Shape[]) => void }) {
  const [shapes, setShapes] = useState<Shape[]>(DEFAULT_SHAPES);
  const emptyShape: Shape = {
    startingPoint: [0, 0],
    internalCells: [],
  };
  const [newShape, setNewShape] = useState<Shape>(emptyShape);

  return (
    <div id="setup">
      {/* a list of shapes and introduction to a starting point for each */}
      {shapes.map((s, i) => {
        // todo mini preview using staticDraw
        const expanse = getExpanse(s);
        return (
          <div key={i} className="flex flex-row p-2 m-2 ">
            <p>
              {s.startingPoint}
            </p>
            <div id="canvasPreview">
              <canvas height={expanse[0]} width={expanse[1]}></canvas>
            </div>
            <button>
              delete shape
            </button>
          </div>
        );
      })}

      <label htmlFor="ice-cream-choice">Choose a flavor:</label>
      <input
        list="ice-cream-flavors"
        id="ice-cream-choice"
        name="ice-cream-choice"
      />

      <datalist id="ice-cream-flavors">
        <option value="Chocolate" />
        <option value="Coconut" />
        <option value="Mint" />
        <option value="Strawberry" />
        <option value="Vanilla" />
      </datalist>

      <button
        onClick={() => {
          setShapes((existing) => {
            return [...existing, newShape];
          });
          setNewShape(emptyShape);
        }}
      >
        Add new shape
      </button>
      <div>
        <button onClick={() => props.callback(shapes)}>
          Submit
        </button>
      </div>
    </div>
  );
}
