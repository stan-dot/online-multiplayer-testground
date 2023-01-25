import React from "react";
import { BotCaller } from "../huzbao/bot/BotCaller";
import { useTerminal } from "./useTerminal";

export const TerminalPanel = (props: { bot: BotCaller, draw?: any; }) => {
  const termRef = useTerminal(props.draw);
  return <>
    <h1>Eliza terminal</h1>
    <div
      id="terminal"
      style={{ border: "1px solid #d3d3d3" }} ref={termRef}
    />
  </>
};
