import React, { useState } from "react";
import { Message } from "../types/Message";
import { Statement } from "../types/TreeOfStatements";

export function ChatPanel(
  props: {
    inSupportOf: Statement;
    tree: Statement[];
    callback: (s: Statement) => void;
  },
): JSX.Element {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([] as Message[]);
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
          {messages.map((m) => {
            return (
              <div
                id={`text-message-${m.id}`}
                style={{
                  display: "flex",
                  justifyContent: m.sender === "ME" ? "end" : "start",
                }}
              >
                <button onClick={() => console.log("clicked a message")}>
                  {m.text}
                </button>
              </div>
            );
          })}
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
        >
          send
        </button>
      </div>
    </div>
  );
}
