"use client";
import { Container, Sprite, Stage, useTick } from "@pixi/react";
import { useReducer, useRef } from "react";

const reducer = (_: any, { data }: Thing) => data;


type Thing = {
  type: string,
  data: MotionData
}

type MotionData = {
  x: number,
  y: number,
  rotation: number,
  anchor: number,
}

const initMotionData: MotionData = {
  x: 0,
  y: 0,
  rotation: 0,
  anchor: 0
};

const Bunny = () => {
  const [motion, update] = useReducer(reducer, initMotionData);
  const iter = useRef(0);

  useTick((delta) => {
    const i = (iter.current += 0.05 * delta);

    update({
      type: 'update',
      data: {
        x: Math.sin(i) * 100,
        y: Math.sin(i / 1.5) * 100,
        rotation: Math.sin(i) * Math.PI,
        anchor: Math.sin(i / 2),
      },
    }
    );
  });

  return <Sprite image="/pixi-react/img/bunny.png" {...motion} />;
};


export default function PixijisPage() {

  const count = 10;
  const width = 300;
  const height = 300;
  const stageProps = {
    height,
    width,
    options: {
      backgroundAlpha: 0,
      antialias: true,
    },
  };

  return <Stage {...stageProps}>
    {[...Array(count).keys()].map(i => (
      <Sprite
        key={i}
        image="/pixi-react/img/coin.png"
        scale={(360 / count) * 0.004}
        anchor={0.5}
        rotation={i * (360 / count) * (Math.PI / 180)}
        x={width / 2 + Math.cos(i * (360 / count) * (Math.PI / 180)) * 100}
        y={height / 2 + Math.sin(i * (360 / count) * (Math.PI / 180)) * 100}
      />
    ))}
  </Stage>
  return <Stage width={300} height={300} options={{ backgroundAlpha: 0 }}>
    <Bunny />
  </Stage>

}