import React, { useRef, useState } from "react";
import axios from "axios";
import { Statement, Topic } from "../types/TopicTypes";

const dialogStyles: React.CSSProperties = {
  position: "absolute",
  left: "10px",
  top: "10px",
  height: "300px",
  width: "300px",
  zIndex: 10,
};

// todo make sure the close is handled safely
// todo possibly provide a step by step experience, as the are many things to be added here
export function TopicCreationDialogue(
  props: {
    dialogOpen: boolean;
    closeCallback: Function;
  },
): JSX.Element {
  const textRef = useRef("");
  const opposedIdRef = useRef("");
  const supportedIdRef = useRef("");

  // https://blog.logrocket.com/building-a-tag-input-field-component-for-react/
  const topic: Topic = {
    statements: [],
    metadata: {
      creatorsIds: [], // todo this needs a ref and a input field
      confirmationPercent: 0, // todo this needs a ref and a input field
      tags: [], // todo this needs a ref and a input field
      triggerWarnings: [], // todo this needs a ref and a input field
      question: "", // todo this needs a ref and a input field
      imageUrl: undefined, // todo this needs a ref and a input field
    },
  };

  const handleSubmit = () => {
    console.log("created new topic");
  };

  return (
    <dialog
      open={props.dialogOpen}
      style={dialogStyles}
      onSubmit={handleSubmit}
    >
      <form>
        <label htmlFor="question">
          Write the main question of the topic
          <input
            type={"text"}
            id="supportedId"
            value={supportedIdRef.current}
            onChange={(e) => supportedIdRef.current = e.target.value}
          />
        </label>
        <button type="submit">
          ready
        </button>
      </form>
      <button onClick={() => props.closeCallback()}>close</button>
    </dialog>
  );
}
