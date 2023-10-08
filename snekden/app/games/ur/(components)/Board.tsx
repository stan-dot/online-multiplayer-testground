import { Container, Sprite, Stage, Text } from "@pixi/react";
import { UrContext } from "../(logic)/types";
import { TextStyle } from "pixi.js";
import PiecesCounter from "./PiecesCounter";

const bannerStyle: TextStyle = new TextStyle({
  align: "center",
  fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
  fontSize: 50,
  fontWeight: "400",
  fill: ["#ffffff", "#00ff99"], // gradient
  stroke: "#01d27e",
  strokeThickness: 5,
  letterSpacing: 20,
  dropShadow: true,
  dropShadowColor: "#ccced2",
  dropShadowBlur: 4,
  dropShadowAngle: Math.PI / 6,
  dropShadowDistance: 6,
  wordWrap: true,
  wordWrapWidth: 440,
});

function Board({ p1assets, p2assets }: UrContext) {
  console.log(p1assets);
  console.log(p2assets);
  return (
    <Stage>
      <Sprite
        image="https://pixijs.io/pixi-react/img/bunny.png"
        x={400}
        y={270}
        anchor={{ x: 0.5, y: 0.5 }}
      />
      <Container x={400} y={330}>
        <Text
          text="Hello World"
          style={bannerStyle}
          anchor={{ x: 0.5, y: 0.5 }}
          // filters={[blurFilter]}
        />
      </Container>
    </Stage>
  );
}

export default Board;

function Square(props: {}) {
  return (
    <div
      className={"h-20 w-20 bg-cyan-600 m-3 grid flow-grid-row grid-rows-1 place-content-center "}
    >
      <p className="text-4xl p-2 m-2 text-cyan-100">
        test square
      </p>
    </div>
  );
}
