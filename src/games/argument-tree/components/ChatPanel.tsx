import React, { useState } from "react";
import { Message } from "../types/Message";
import { StatementModificationCallbacksObject } from "../types/StatementModificationCallbacksObject";
import { Statement } from "../types/TopicTypes";
import { ChatMessage } from "./ChatMessage";

const chatStyles: React.CSSProperties = {
  position: "absolute",
  left: "80%",
  width: "20%",
  top: "100px",
  height: "60%",
  border: "5px solid",
  borderColor: "Highlight",
  display: "grid",
  justifyContent: "space-between",
};

export function ChatPanel(
  props: {
    inSupportOf: Statement;
    tree: Statement[];
    callbacks: StatementModificationCallbacksObject;
    largestId: string;
  },
): JSX.Element {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([] as Message[]);

  function addMessage(messageFromInput: Message) {
    const joined = messages.concat(messageFromInput);
    setMessages(joined);
  }

  function getNewId(): number {
    return messages.length;
  }

  return (
    <div id="chatPanel" style={chatStyles}>
      <div id="charDisplayArea">
        <div>
          <p>
            position argued:
            {props.inSupportOf.title}
          </p>
        </div>
        <div
          id="messagesArea"
          style={{ border: "2px solid", borderColor: "ButtonFace" }}
        >
          {messages.map((m) => (
            <ChatMessage
              message={m}
              addCallback={props.callbacks.add}
              largestId={props.largestId}
            />
          ))}
        </div>
      </div>
      <div id="input area">
        <input
          type={"text"}
          placeholder={"here type a statement"}
          onChange={(v) => setInput(v.target.value)}
          value={input}
        >
        </input>
        <button
          onClick={(e) => {
            const messageFromInput: Message = {
              text: input,
              sender: "ME",
              readStatus: false,
              id: `${getNewId}`,
            };
            addMessage(messageFromInput);
            setInput("");
          }}
          disabled={input === ''}
        >
          send
        </button>
      </div>
    </div>
  );
}

