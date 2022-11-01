import React, { useRef, useState } from "react";
import axios from "axios";
import { Statement, Topic } from "../types/TopicTypes";

const dialogStyles: React.CSSProperties = {
  position: "absolute",
  left: "10px",
  top: "10px",
  height: "300px",
  width: "300px",
  zIndex: 5,
};

// this will be replaced by a different dialogue
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
      creatorsIds: [],
      confirmationPercent: 0,
      tags: [],
      triggerWarnings: [],
      question: textRef.current,
      imageUrl: undefined,
    },
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("created new topic", topic);
  };

  return (
    <dialog
      open={props.dialogOpen}
      style={dialogStyles}
      onSubmit={handleSubmit}
      onBlur={() => props.closeCallback()}
    >
      <form>
        <label htmlFor="question">
          Write the main question of the topic
          <input
            type={"text"}
            id="supportedId"
            // value={supportedIdRef.current}
            onChange={(e) => textRef.current = e.target.value}
          />
        </label>
        <button type="submit">
          ready
        </button>
      </form>
      <button onClick={() => props.closeCallback()}>Cancel</button>
    </dialog>
  );
}
