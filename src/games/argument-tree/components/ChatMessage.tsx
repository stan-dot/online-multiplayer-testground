import React, { useState } from "react";
import { Message } from "../types/Message";
import { Statement } from "../types/TopicTypes";

export function ChatMessage(
  props: { message: Message; addCallback: (s: Statement) => void; largestId: string; }): JSX.Element {
  const [position, setPosition] = useState([] as number[]);
  const [contextMenuVisibility, setContextMenuVisibility] = useState(false);


  const clickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    setPosition([e.pageX, e.pageY]);
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
        onClick={() => console.log("clicked a message")}
        onContextMenu={clickHandler}
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
              largestId={props.largestId} />
          </div>
        )}
    </div>
  );
}
function statementFromMessage(s: Message, largestId: string): Statement {
  const num: number = parseInt(largestId) ?? 0 + 1;
  const newId: string = num.toString();

  const n: Statement = {
    title: s.text,
    id: newId,
    supportingChildren: [],
    opposingChildren: [],
  };
  return n;
}
function ChatMessageContextMenu(
  props: {
    message: Message;
    closeCallback: () => void;
    addCallback: (s: Statement) => void;
    largestId: string;
  }
): JSX.Element {
  const clickaHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    const statement: Statement = statementFromMessage(props.message, props.largestId);
  };
  return (
    <div
      id="chatMessageContextMenu"
      className="contextMenu"
    >
      <div className="group1">
        <p>copy buton</p>
      </div>
      <div className="group2">
        <button
          onClick={clickaHandler}
        >
          <p>make this a new statement</p>
        </button>
        <div className="group3">
          <button onClick={() => props.closeCallback()}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
