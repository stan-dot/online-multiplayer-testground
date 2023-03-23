"use client";
import { useState } from "react";
import { Shape } from "../types/CellsCanvasData";

const emptyShape: Shape = {
  startingPoint: [0, 0],
  internalCells: [],
};

export function AddNewShape(props: { addCallback: (newShape: Shape) => void }) {
  const [newShape, setNewShape] = useState<Shape>(emptyShape);
  // todo choose one of available shape names, if input not found there say error disallow submit
  return (
    <div id="addNewShape">
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
          props.addCallback(newShape);
          setNewShape(emptyShape);
        }}
      >
        Add new shape
      </button>
    </div>
  );
}
