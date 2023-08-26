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

export function Grid({ props }: any) {
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
          <Graphics x={0} y={0} geometry={rect.current} />
          <Graphics x={props.width} y={0} geometry={rect.current} />
          <Graphics x={0} y={props.height} geometry={rect.current} />
          <Graphics x={props.width} y={props.height} geometry={rect.current} />
        </>
      )}
    </div>
  );
}
