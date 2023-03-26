"use client";
import { useState } from "react";
import { availableShapes } from "../constants/defaults";
import { Shape } from "../types/CellsCanvasData";
import { emptyShape } from "./emptyShape";

export function AddNewShape(props: { addCallback: (newShape: Shape) => void }) {
  const [newShape, setNewShape] = useState<Shape>(emptyShape);
  return (
    <div
      id="addNewShape"
      className="h-[40rem] w-[40rem] flex flex-row justify-between"
    >
      <div id="typeChoice">
        <label htmlFor="ice-cream-choice" className="mx-2">
          Choose a type:
        </label>
        <select
          id="shape-selection"
          name="shape-selection"
          onChange={(e) => {
            console.log(e);
            const name = e.target.value;
            const newShape: Shape | undefined = availableShapes.find((s) =>
              s.name === name
            );
            if (newShape === undefined) {
              throw Error("shape picked from not those available");
            }
            setNewShape(newShape);
          }}
        >
          <optgroup label="nothing">
            {availableShapes.filter((v) => v.type === "nothing").map(
              (s, i) => {
                return (
                  <option key={`shape-option-nothing${i}`} value={s.name}>
                    {s.name}
                  </option>
                );
              },
            )}
          </optgroup>
          <optgroup label="repeat">
            {availableShapes.filter((v) => v.type === "repeat").map(
              (s, i) => {
                return (
                  <option key={`shape-option-repeat${i}`} value={s.name}>
                    {s.name}
                  </option>
                );
              },
            )}
          </optgroup>
          <optgroup label="stable">
            {availableShapes.filter((v) => v.type === "stable").map(
              (s, i) => {
                return (
                  <option key={`shape-option-stable${i}`} value={s.name}>
                    {s.name}
                  </option>
                );
              },
            )}
          </optgroup>
        </select>
      </div>
      <button
        onClick={() => {
          props.addCallback(newShape);
          setNewShape(emptyShape);
        }}
        className="bg-green-600 shadow rounded m-2 p-2"
      >
        Add new shape
      </button>
    </div>
  );
}
