"use client";
import React from "react";
import { Layer, Stage, Star, Text } from "react-konva";
import Swal from "sweetalert2";
import { DEFAULT_TREE } from "./DEFAULT_TREE";
import { generateShapes, getThing, KonvaShape } from "./KonvaShape";
import { Statement } from "./TopicTypes";


type BigObject = {
  data: Statement;
  display: KonvaShape;
  callbacks: ((o: BigObject) => void)[];
}

function stringifyObject(o: BigObject): string {
  return `${o.data.title}`
}

const callbackCreator: () => (o: BigObject) => void = (): (o: BigObject) => void => {
  return (o: BigObject) => {
    const message: string = `This star is assigned statement: ${stringifyObject(o)}`;
    Swal.fire('Clicked!', message, 'success')
  };
}

const INITIAL_STATE: KonvaShape[] = generateShapes(
  document.documentElement.clientWidth,
  document.documentElement.clientHeight
);

const BIG_OBJ_ARR: BigObject[] = DEFAULT_TREE.statements.map((v, i) => {
  const thing: BigObject = {
    data: v,
    display:
      getThing(i,
        document.documentElement.clientWidth,
        document.documentElement.clientHeight
      ),
    callbacks: [callbackCreator]
  };
  return thing;
});

export function KonvaHandler(props: { dimensions: number[]; }) {

  const [objects, setObjects] = React.useState(BIG_OBJ_ARR);

  const handleDragStart = (e: any) => {
    const id = e.target.id();
    setObjects(
      objects.map((obj: BigObject) => {
        const d: KonvaShape = {
          ...obj.display,
          isDragging: obj.display.id === id,
        };
        return {
          data: obj.data,
          display: d,
          callbacks: obj.callbacks
        };
      })
    );
  };

  const handleDragEnd = (e: any) => {
    setObjects(
      objects.map((obj: BigObject) => {
        const d: KonvaShape = {
          ...obj.display,
          isDragging: false,
        };
        return {
          data: obj.data,
          display: d,
          callbacks: obj.callbacks
        };
      })
    )
  };

  return (
    <Stage width={props.dimensions[0]} height={props.dimensions[1]}>
      <Layer>
        <Text text="Try to drag a star" />
        {objects.map((m: BigObject) => {
          const star: KonvaShape = m.display;
          return <Star
            key={star.id}
            id={star.id}
            x={star.x}
            y={star.y}
            numPoints={5}
            innerRadius={20}
            outerRadius={40}
            fill="#89b717"
            opacity={0.8}
            draggable
            rotation={star.rotation}
            shadowColor="black"
            shadowBlur={10}
            shadowOpacity={0.6}
            shadowOffsetX={star.isDragging ? 10 : 5}
            shadowOffsetY={star.isDragging ? 10 : 5}
            scaleX={star.isDragging ? 1.2 : 1}
            scaleY={star.isDragging ? 1.2 : 1}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onClick={(e) => {
              console.log('did a click', e);
              m.callbacks[0](m)
              const message: string = `This star is assigned statement: ${stringifyObject(m)}`;
              Swal.fire('Clicked!', message, 'success');
              (e as unknown as Event).preventDefault();
            }}
            onContextMenu={(e) => {
              console.log('checked context menu', e);
              m.callbacks[0](m)
              const message: string = `This star is assigned statement: ${stringifyObject(m)}`;
              Swal.fire('Clicked!', message, 'success');
              (e as unknown as Event).preventDefault();
            }}
          />
        })}
      </Layer>
    </Stage>
  );
}
