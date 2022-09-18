import { Resizable } from "re-resizable";
import { useEffect, useState } from "react";
import ResizeObserver from "react-resize-observer";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "./App.css";
import { DEFAULT_TERMINAL_SETTINGS, WelcomeText, PROMPT_SIGN } from "./defaults";
import { Bot } from "./types/Bot";
import "./xterm.css";

export default function TerminalHandler(props: { bot: Bot }): JSX.Element {
  const [logs, setlogs] = useState('');
  const fitAddon = new FitAddon();
  const [terminal, setTerminal] = useState(null as unknown as Terminal);
  useEffect(() => {
    if (!terminal) {
      const term: Terminal = new Terminal(DEFAULT_TERMINAL_SETTINGS);

      term.loadAddon(fitAddon);
      const terminalElement: HTMLElement = document.getElementById("xterm")!;
      term.open(terminalElement);
      term.write(WelcomeText);

      // Make the terminal's size and geometry fit the size of #terminal-container
      fitAddon.fit();

      const keyHandler = (key: { key: string; domEvent: KeyboardEvent; }): void => {
        const ev = key.domEvent;
        const printable =
          !ev.altKey &&
          !ev.ctrlKey &&
          !ev.metaKey;
        const char = key.domEvent.key;
        console.log('the click was at', char);
        if (char === "Enter") {
          const statement = 'test';
          term.write('\n\r' + statement + '\r\n\u001b[32mscm> \u001b[37m');
          term.write(props.bot.getResponse(statement));
          prompt(term);
          // Enter key
          // if (curr_line.replace(/^\s+|\s+$/g, '').length != 0) {
          //   // Check if string is all whitespace
          //   entries.push(curr_line);
          //   currPos = entries.length - 1;
          //   curr_line = '';
          //   term.prompt();
          // } else {
          //   term.write('\n\33[2K\r\u001b[32mscm> \u001b[37m');
          // }
        } else if (char === "Backspace") {
          term.write("\b \b");
          // Backspace
          // if (term.buffer.cursorX > 5) {
          //   curr_line =
          //     curr_line.slice(0, term.buffer.cursorX - 6) +
          //     curr_line.slice(term.buffer.cursorX - 5);
          //   pos = curr_line.length - term.buffer.cursorX + 6;
          //   term.write('\33[2K\r\u001b[32mscm> \u001b[37m' + curr_line);
          //   term.write('\033['.concat(pos.toString()).concat('D')); //term.write('\033[<N>D');
          //   if (
          //     term.buffer.cursorX == 5 ||
          //     term.buffer.cursorX == curr_line.length + 6
          //   ) {
          //     term.write('\033[1C');
          //   }
          // }
        } else if (ev.keyCode === 38) {
          // Up arrow
          // if (entries.length > 0) {
          //   if (currPos > 0) {
          //     currPos -= 1;
          //   }
          //   curr_line = entries[currPos];
          //   term.write('\33[2K\r\u001b[32mscm> \u001b[37m' + curr_line);
          // }
        } else if (ev.keyCode === 40) {
          // Down arrow
          // currPos += 1;
          // if (currPos === entries.length || entries.length === 0) {
          //   currPos -= 1;
          //   curr_line = '';
          //   term.write('\33[2K\r\u001b[32mscm> \u001b[37m');
          // } else {
          //   curr_line = entries[currPos];
          //   term.write('\33[2K\r\u001b[32mscm> \u001b[37m' + curr_line);
          // }
        } else if (
          printable
          // !(ev.keyCode === 39 && term.buffer.cursorX > curr_line.length + 4)
        ) {
          // if (ev.keyCode != 37 && ev.keyCode != 39) {
          //   var input = ev.key;
          //   if (ev.keyCode == 9) {
          //     // Tab
          //     input = '    ';
          //   }
          //   pos = curr_line.length - term.buffer.cursorX + 4;
          //   curr_line = [
          //     curr_line.slice(0, term.buffer.cursorX - 5),
          //     input,
          //     curr_line.slice(term.buffer.cursorX - 5),
          //   ].join('');
          //   term.write('\33[2K\r\u001b[32mscm> \u001b[37m' + curr_line);
          //   term.write('\033['.concat(pos.toString()).concat('D')); //term.write('\033[<N>D');
          // } else {
          //   term.write(key);
          // }
          // }
        } else {
          term.write(char);
        }

        term.onKey(keyHandler);

        setTerminal(term);
        prompt(term);
      }
      return () => {
      }
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
      <h1>{props.bot.name}</h1>
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
