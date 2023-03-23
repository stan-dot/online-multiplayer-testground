"use client";
import { useState } from "react";
import { Shape } from "../types/CellsCanvasData";
import { AddNewShape } from "./AddNewShape";
import { EditableShape } from "./EditableShape";

export function Setup(
  props: { callback: (shapes: Shape[]) => void; shapes: Shape[] },
) {
  const [shapes, setShapes] = useState<Shape[]>(props.shapes);

  const newShapeCallback = (newShape: Shape) => {
    const isAlreadyIndex: number = shapes.findIndex((s) =>
      s.name === newShape.name
    );
    if (isAlreadyIndex > -1) {
      const novelIndex: number = shapes.filter((s) =>
        s.type === newShape.type
      ).length;
      newShape.name = `${newShape.name}-${novelIndex}`;
    }

    setShapes((existing) => {
      return [...existing, newShape];
    });
  };

  return (
    <div id="setup">
      {shapes.map((s, i) => (
        <EditableShape
          key={i}
          shape={s}
          deleteCallback={() =>
            setShapes((shapes) => {
              return [...shapes.slice(0, i), ...shapes.slice(i + 1)];
            })}
          changeStartingPointCallback={(newStartingPoint: number[]) => {
            setShapes((shapes) => {
              return shapes.map((s, j) => {
                return j === i ? { ...s, startingPoint: newStartingPoint } : s;
              });
            });
          }}
        />
      ))}
      <AddNewShape addCallback={newShapeCallback} />
      <div>
        <button onClick={() => props.callback(shapes)}>
          Submit
        </button>
      </div>
    </div>
  );
}
