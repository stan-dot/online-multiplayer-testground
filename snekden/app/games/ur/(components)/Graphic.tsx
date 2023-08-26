import React, { useCallback, useRef } from "react";
import { Graphics } from "@pixi/react";

function Rectangle({ props }: any) {
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
    <div>
      {/* create the graphics component here */}
      <Rectangle ref={rect} />

      {/* make sure to wait till `Rectangle` is mounted */}
      {/* geometry can only be set during component creation */}
      {mounted && (
        <>
          <Graphics
            width={50}
            height={50}
            x={0}
            y={0}
            geometry={rect.current}
          />
          <Graphics
            width={50}
            height={50}
            x={width}
            y={0}
            geometry={rect.current}
          />
          <Graphics
            width={50}
            height={50}
            x={0}
            y={height}
            geometry={rect.current}
          />
          <Graphics
            width={50}
            height={50}
            x={width}
            y={height}
            geometry={rect.current}
          />
        </>
      )}
    </div>
  );
}
