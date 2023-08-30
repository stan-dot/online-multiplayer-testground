"use client";
import { Container, Sprite, Stage, Text } from "@pixi/react";

export const MyComponent = () => {
  // const blurFilter = useMemo(() => new BlurFilter(4), []);

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
          anchor={{ x: 0.5, y: 0.5 }}
          // filters={[blurFilter]}
        />
      </Container>
    </Stage>
  );
};
