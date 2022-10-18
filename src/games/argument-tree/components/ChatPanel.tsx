import React, { useState } from "react";
import { Message } from "../ArgumentTree";
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
    top: "50px",
    height: '60%',
    border: "5px solid",
    borderColor: "Highlight",
    display: 'flex-row',
    justifyContent: 'space-between'
  };

  return (
    <div id="chatPanel" style={chatStyles}>
      <div id="charDisplayArea">
        <div>
          <p>
            position argued:
            {props.inSupportOf.title}
          </p>
        </div>
        {messages.map((m) => {
          return (
            <div id={`text-message-${m.id}`}>
              <button onClick={() => console.log("clicked a message")}>
                m.text
              </button>
            </div>
          );
        })}
      </div>
      <div id="input area" >
        <input type={"text"} placeholder={"here type a statement"}>
        </input>
        <button
          onClick={(e) => {
            const messageFromInput: Message = {
              text: input,
              sender: "ME",
              readStatus: false,
              id: `${messages[messages.length - 1].id}`,
            };
            const joined = messages.concat(messageFromInput);
            setMessages(joined);
            setInput("");
          }}
        >
          send
        </button>
      </div>
    </div>
  );
}
