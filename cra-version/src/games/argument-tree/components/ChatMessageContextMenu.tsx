import React from "react";
import { Message } from "../types/Message";
import { Statement } from "../types/TopicTypes";

export function ChatMessageContextMenu(
  props: {
    message: Message;
    closeCallback: () => void;
    addCallback: (s: string) => void;
  }): JSX.Element {
  const clickaHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    // todo add diff creator handling
    props.addCallback(props.message.text);
  };
  return (
    <div
      id="chatMessageContextMenu"
      className="contextMenu"
      onBlur={() => props.closeCallback()}
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

      </div>
    </div>
  );
}
