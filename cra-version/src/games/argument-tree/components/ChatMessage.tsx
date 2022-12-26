import React, { useState } from "react";
import { Message } from "../types/Message";
import { Statement } from "../types/TopicTypes";
import { ChatMessageContextMenu } from "./ChatMessageContextMenu";

export function ChatMessage(
  props: {
    message: Message;
    addCallback: (s: string) => void;
    largestId: string;
  },
): JSX.Element {
  const [position, setPosition] = useState([] as number[]);
  const [contextMenuVisibility, setContextMenuVisibility] = useState(false);

  const clickHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    e.preventDefault();
    setPosition([e.pageX, e.pageY]);
    setContextMenuVisibility(true);
  };

  return (
    <div
      id={`text-message-${props.message.id}`}
      style={{
        display: "flex",
        justifyContent: props.message.sender === "ME" ? "end" : "start",
      }}
    >
      <button
        // onClick={() => console.log("clicked a message")}
        onClick={clickHandler}
      // onContextMenu={clickHandler}
      >
        {props.message.text}
      </button>
      {contextMenuVisibility &&
        (
          <div
            style={{
              display: "absolute",
              left: `${position[0]}px`,
              top: `${position[1]}px`,
            }}
          >
            <ChatMessageContextMenu
              message={props.message}
              closeCallback={() => setContextMenuVisibility(false)}
              addCallback={props.addCallback}
            />
          </div>
        )}
    </div>
  );
}
