import React from "react";
import { Message } from "../types/Message";
import { Statement } from "../types/TopicTypes";
import { statementFromMessage } from "./ChatMessage";

export function ChatMessageContextMenu(
  props: {
    message: Message;
    closeCallback: () => void;
    addCallback: (s: Statement) => void;
    largestId: string;
  }): JSX.Element {
  const clickaHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    const statement: Statement = statementFromMessage(props.message, props.largestId);
    props.addCallback(statement);
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
