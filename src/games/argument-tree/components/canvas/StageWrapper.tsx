import Konva from "konva";
import { useState } from "react";
import { Layer, Stage, Text } from "react-konva";

// todo add arrrow shape
// https://konvajs.org/api/Konva.Arrow.html
export function StageWrapper(
  props: { width: number; height: number; objects: any },
): JSX.Element {
  const [textAreaMode, setTextAreaMode] = useState(false);

  const interactionHandler = () => {
    // const textPosition = textNode.getAbsolutePosition();

    // const stageBox = stage.container().getBoundingClientRect();

    // const areaPosition = {
    //   x: stageBox.left + textPosition.x,
    //   y: stageBox.top + textPosition.y,
    // };

    // const textarea = document.createElement('textarea');
    // document.body.appendChild(textarea);

    // textarea.value = textNode.text();
    // textarea.style.position = 'absolute';
    // textarea.style.top = areaPosition.y + 'px';
    // textarea.style.left = areaPosition.x + 'px';
    // textarea.style.width = textNode.width().toString();

    // textarea.focus();

    // textarea.addEventListener('keydown', e => {
    //   if (e.key === 'enter') {
    //     textNode.text(textarea.value);
    //     document.body.removeChild(textarea);
    //   }
    // });
  };

  return (
    <div id="konvaWrapper" style={{ border: '1px solid #555555' }}>
      <Stage
        width={props.width}
        height={props.height}
      >
        <Layer>
          <Text
            onDblClick={interactionHandler}
            onDblTap={interactionHandler}
            text={"some test text"}
          />
        </Layer>
      </Stage>
    </div>
  );
}
