import { Rect } from "konva/lib/shapes/Rect";
import React from "react";
import { KonvaNodeComponent } from "react-konva";
import { KonvaHandler } from "./KonvaHandler";

export default function KonvaDisplay() {
  const dimensions: number[] = [window.innerWidth, window.innerHeight];
  return (
    <KonvaHandler dimensions={dimensions} />
  );
}


