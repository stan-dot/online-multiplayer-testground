import React, { useEffect, useState } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "./xterm.css";
import "./App.css";
import { Resizable } from "re-resizable";
import ResizeObserver from "react-resize-observer";
import c from "ansi-colors";

const PROMPT_SIGN = "$ ";

export default function TerminalHandler(props: {}): JSX.Element {
  const [logs, setlogs] = useState('');
  const fitAddon = new FitAddon();
  const [terminal, setTerminal] = useState(null as unknown as Terminal);
  useEffect(() => {
    if (!terminal) {

      const term = new Terminal({
        convertEol: true,
        fontFamily: `'Fira Mono', monospace`,
        fontSize: 15,
        fontWeight: 900,
        theme: {
          background: 'black',
          foreground: "white"
        }
        // rendererType: "dom" // default is canvas
      });

      term.loadAddon(fitAddon);

      // todo error handling
      const terminalElement: HTMLElement = document.getElementById("xterm")!;
      // Open the terminal in #terminal-container
      term.open(terminalElement);

      const WelcomeText = c.magenta("I am ") + c.blue("Blue") + c.red(" and i like it");
      term.write(WelcomeText);

      // Make the terminal's size and geometry fit the size of #terminal-container
      fitAddon.fit();

      const keyHandler = (key: { key: string; domEvent: KeyboardEvent; }): void => {
        const char = key.domEvent.key;
        console.log('the click was at', char);
        if (char === "Enter") {
          prompt(term);
        } else if (char === "Backspace") {
          term.write("\b \b");
        } else {
          term.write(char);
        }
      };

      term.onKey(keyHandler);

      setTerminal(term);
      prompt(term);
    }
    return () => {
    }
  }, []);

  const prompt = (term?: Terminal): void => {
    console.log('trying out prompt', terminal);
    if (terminal) {
    } else {
      term?.write("\r\n" + PROMPT_SIGN);
    }
  };

  const TerminalSTyle = { height: '50rem', width: '100rem' };
  return (
    <div className="App" style={{ background: "" }}>
      <h1>Xterm.js</h1>
      <Resizable
        minWidth={350}
        minHeight={350}
        maxHeight={20}
        style={{
          background: "firebrick",
          padding: "0.4em",
          margin: "1em"
        }}
      >
        <div id="xterm" style={TerminalSTyle} />
        <ResizeObserver
          onResize={rect => {
            fitAddon.fit();
            console.log("Resized. New bounds:", rect.width, "x", rect.height);
          }}
          onPosition={rect => {
            console.log("Moved. New position:", rect.left, "x", rect.top);
          }}
        />
      </Resizable>
    </div>
  );
}
