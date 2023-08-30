import React, { useCallback, useRef } from "react";
import { Graphics, Stage, Text } from "@pixi/react";

interface RectangleProps {
  lineWidth: number;
  color: string;
  width: number;
  height: number;
  ref: any;
}

function Rectangle(props: RectangleProps) {
  const draw = useCallback((g) => {
    g.clear();
    g.lineStyle(props.lineWidth, props.color);
    g.drawRect(
      props.lineWidth,
      props.lineWidth,
      props.width - 2 * props.lineWidth,
      props.height - 2 * props.lineWidth,
    );
  }, [props]);

  return <Graphics draw={draw} />;
}

interface GridProps {
  height: number;
  width: number;
}
export function Grid({ height, width }: GridProps) {
  const rect = useRef();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Stage
      height={300}
      width={300}
      renderOnComponentChange={true}
      // raf={false}
      options={{ antialias: true, backgroundAlpha: 0 }}
    >
      <Rectangle
        ref={rect}
        lineWidth={5}
        color={"#ff0033"}
        width={10}
        height={10}
      />
      <Text
        text="testing graphics"
        anchor={{ x: 5, y: 5 }}
      />
      {/* <Ele mounted={mounted} rect={rect} width={200} height={200} /> */}
    </Stage>
  );
}

interface EleProps {
  mounted: boolean;
  rect: React.MutableRefObject<undefined>;
  width: number;
  height: number;
}

function Ele(
  { mounted, rect, width, height }: EleProps,
) {
  return (
    <div>
      {/* make sure to wait till `Rectangle` is mounted */}
      {/* geometry can only be set during component creation */}
      {mounted && (
        <>
          <Graphics
            width={50}
            height={50}
            x={0}
            y={0}
            // geometry={rect.current}
          />
        </>
      )}
    </div>
  );
}
