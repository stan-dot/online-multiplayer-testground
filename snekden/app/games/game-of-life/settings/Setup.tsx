"use client";
import { useState } from "react";
import { Shape } from "../types/CellsCanvasData";
import { AddNewShape } from "./AddNewShape";
import { EditableShape } from "./EditableShape";

export function Setup(
  props: { callback: (shapes: Shape[]) => void; shapes: Shape[] },
) {
  const [shapes, setShapes] = useState<Shape[]>(props.shapes);

  const newShapeCallback = (shape: Shape) => {
    let clone = structuredClone(shape);
    const isAlreadyIndex: number = shapes.findIndex((s) =>
      s.name === clone.name
    );
    if (isAlreadyIndex > -1) {
      const novelIndex: number = shapes.filter((s) =>
        s.type === clone.type
      ).length;
      clone.name = `${clone.name}-${novelIndex}`;
    }

    setShapes((existing) => {
      return [...existing, clone];
    });
  };

  const [regularCells, setRegularCells] = useState<number[][]>([]);
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
      <br />
      <div id="regularCells" className="m-2">
        <p>Individual cells:</p>
        <div id="holderForExistingOne" className="m-2 flex flex-row ">
          {regularCells.map((pair, i) => {
            return <p key={i}>{`[${pair[0]}, ${pair[1]}]`}</p>;
          })}
        </div>
        <AddPointsPair
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
          className="bg-green-600 p-2 rounded shadow m-2"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

function AddPointsPair(props: { addCallback: (pair: number[]) => void }) {
  const pairZero = [0, 0];
  const [newPair, setNewPair] = useState<number[]>(pairZero);
  return (
    <div id="addMore" className="p-2 flex flex-row">
      <p className="m-2">Add specific cells yourself</p>
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
        className="bg-green-600  m-2 p-2 rounded shadow"
      >
        Add
      </button>
    </div>
  );
}
