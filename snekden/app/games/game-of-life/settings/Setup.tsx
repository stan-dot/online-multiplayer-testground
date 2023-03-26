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

  const [regularCells, setRegularCells] = useState<number[][]>([[]]);
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
      <div id="regularCells">
        <div id="holderForExistingOne">
          {regularCells.map((pair, i) => {
            return <p key={i}>{pair[0]} {pair[1]}</p>;
          })}
        </div>
        <AddNewPair
          addCallback={(newCells: number[]) =>
            setRegularCells((oldCells) => {
              if (oldCells.includes(newCells)) return oldCells;
              return [...oldCells, newCells];
            })}
        />
      </div>
      <div>
        <button
          onClick={() => props.callback(shapes)}
          className="bg-green-600 p-2 rounded shadow"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

function AddNewPair(props: { addCallback: (pair: number[]) => void }) {
  const pairZero = [0, 0];
  const [newPair, setNewPair] = useState<number[]>(pairZero);
  return (
    <div id="addMore" className="p-2">
      <input
        type="number"
        min={0}
        max={100}
        id="xAxis"
        value={newPair[0]}
        onChange={(e) => {
          setNewPair((oldPair) => {
            return [parseInt(e.target.value), oldPair[1]];
          });
        }}
      />
      <input
        type="number"
        min={0}
        max={100}
        id="yAxis"
        value={newPair[1]}
        onChange={(e) => {
          setNewPair((oldPair) => {
            return [oldPair[0], parseInt(e.target.value)];
          });
        }}
      />
      <button
        onClick={() => {
          props.addCallback(newPair);
          setNewPair(pairZero);
        }}
      >
        Add
      </button>
    </div>
  );
}
