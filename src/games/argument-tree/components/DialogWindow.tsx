import React, { useRef, useState } from "react";
import { Statement } from "../types/TreeOfStatements";

export function DialogWindow(
  props: {
    dialogOpen: boolean;
    closeCallback: Function;
    creationCallback: (s: Statement) => void;
    largestId: string;
  }) {
  const dialogStyles: React.CSSProperties = {
    position: "absolute",
    left: "10px",
    top: "10px",
    height: "300px",
    width: "300px",
    zIndex: "auto",
  };
  const textRef = useRef("");
  const opposedIdRef = useRef("");
  const supportedIdRef = useRef("");

  const num: number = parseInt(props.largestId) ?? 0 + 1;
  const newId: string = num.toString();
  const handleSubmit = () => {
    const n: Statement = {
      title: textRef.current as string ?? 'empty',
      id: newId,
      supportingChildren: [],
      opposingChildren: []
    };

    props.creationCallback(n);
  };
  return (
    <dialog open={props.dialogOpen} style={dialogStyles} onSubmit={handleSubmit}>
      <form>
        <label htmlFor="title">
          Text of the statement
          <input type={"text"} id="title" value={textRef.current} onChange={e => textRef.current = e.target.value} />
        </label>
        <label htmlFor="opposedId">
          write 1 id of what this claim opposes
          <input type={"text"} id="opposedId" value={opposedIdRef.current} onChange={e => opposedIdRef.current = e.target.value} />
        </label>
        <label htmlFor="supportedId">
          write 1 id of what supports this claim
          <input type={"text"} id="supportedId" value={supportedIdRef.current} onChange={e => supportedIdRef.current = e.target.value} />
        </label>
        <button type="submit" >
          ready
        </button>
      </form>

      <button onClick={() => props.closeCallback()}>close</button>
    </dialog>
  );
}
