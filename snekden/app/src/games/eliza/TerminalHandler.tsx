import { Resizable } from 're-resizable';
import { SetStateAction, useEffect, useState } from 'react';
import ResizeObserver from 'react-resize-observer';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import {
  DEFAULT_TERMINAL_SETTINGS,
  WELCOME_TEXT,
  PROMPT_SIGN,
} from './defaults';
import { Bot } from './types/Bot';
import './xterm.css';

const TerminalStyle: React.CSSProperties = {
  height: '50rem',
  width: '100rem',
};
const TerminalContainerStyle: React.CSSProperties = {
  background: '',
  fontFamily: 'sans-serif',
  textAlign: 'center',
};

// const RESET_MAGIC_SPELL: string = '\\33[2K\r\u001b[32mscm> \u001b[37m';
const RESET_MAGIC_SPELL: string = '';

export default function TerminalHandler(props: { bot: Bot }) {
  const [entries, setEntries] = useState([] as string[]);
  const fitAddon = new FitAddon();
  const term: Terminal = new Terminal(DEFAULT_TERMINAL_SETTINGS);
  const [terminal, setTerminal] = useState(term);
  const [currentLine, setCurrentLine] = useState('');
  const [currentPosition, setCurrentPosition] = useState(0);

  useEffect(() => {
    if (!term.element) {
      terminal.loadAddon(fitAddon);
      fitAddon.fit();
      const terminalElement: HTMLElement = document.getElementById('xterm')!;
      // Make the terminal's size and geometry fit the size of #terminal-container
      terminal.open(terminalElement);
      terminal.write(WELCOME_TEXT);
      console.log('just after fitting the addon');
      prompt(term);
      return () => { };
    }
  }, []);

  const prompt = (term?: Terminal): void => {
    console.log('trying out prompt', terminal);
    if (terminal) {
      terminal.write('\r\n' + PROMPT_SIGN);
    } else {
      term?.write('\r\n' + PROMPT_SIGN);
    }
  };

  const handler = handleEvent(
    terminal,
    props,
    prompt,
    currentLine,
    setEntries,
    entries,
    setCurrentLine,
    setCurrentPosition,
    currentPosition,
  );
  terminal.onKey(handler);

  return (
    <div id={'terminal-container'} style={TerminalContainerStyle}>
      <h1>{props.bot.name}</h1>
      <Resizable
        minWidth={350}
        minHeight={350}
        maxHeight={20}
        style={{
          background: 'firebrick',
          padding: '0.4em',
          margin: '1em',
        }}
      >
        <div id="xterm" style={TerminalStyle} />
        <ResizeObserver
          onResize={rect => {
            fitAddon.fit();
            // console.log("Resized. New bounds:", rect.width, "x", rect.height);
          }}
          onPosition={rect => {
            // console.log("Moved. New position:", rect.left, "x", rect.top);
          }}
        />
      </Resizable>
    </div>
  );
}

function handleEvent(
  terminal: Terminal,
  props: { bot: Bot },
  prompt: (term?: Terminal) => void,
  currentLine: string,
  setEntries: {
    (value: SetStateAction<string[]>): void;
    (arg0: string[]): void;
  },
  entries: string[],
  setCurrentLine: {
    (value: SetStateAction<string>): void;
    (arg0: string): void;
  },
  setCurrentPosition: {
    (value: SetStateAction<number>): void;
    (arg0: number): void;
  },
  currentPosition: number,
) {
  return (keyboardEvent: { key: string; domEvent: KeyboardEvent }): void => {
    console.log('keyhandler defined');
    const ev: KeyboardEvent = keyboardEvent.domEvent;
    const printable: boolean = !ev.altKey && !ev.ctrlKey && !ev.metaKey;
    const char: string = keyboardEvent.domEvent.key;
    console.log('the click was at', char);
    if (char === 'Enter') {
      reactToEnter(
        terminal,
        props,
        prompt,
        currentLine,
        setEntries,
        entries,
        setCurrentLine,
        setCurrentPosition,
      );
    } else if (char === 'Backspace') {
      reactToBackspace(terminal, setCurrentLine, currentLine);
    } else if (char === 'UpArrow') {
      reactToUpArrow(
        entries,
        currentPosition,
        setCurrentPosition,
        setCurrentLine,
        terminal,
        currentLine,
      );
    } else if (char === 'DownArrow') {
      reactToDownArrow(
        setCurrentPosition,
        currentPosition,
        entries,
        setCurrentLine,
        terminal,
        currentLine,
      );
    } else if (
      printable &&
      !(
        char === 'RightArrow' &&
        terminal.buffer.active.cursorX > currentLine.length + 4
      )
    ) {
      if (char !== 'LeftArrow' && char !== 'RightArrow') {
        console.log('looks like regular string');
        const input: string = char === 'Tab' ? '    ' : char;
        setCurrentPosition(currentLine.length - terminal.buffer.active.cursorX + 4);
        setCurrentLine(
          [
            currentLine.slice(0, terminal.buffer.active.cursorX - 5),
            input,
            currentLine.slice(terminal.buffer.active.cursorX - 5),
          ].join(''),
        );
        terminal.write(RESET_MAGIC_SPELL + currentLine);
        // terminal.write('\\033['.concat(currentPosition.toString()).concat('D'));
        // terminal.write('\\033[<N>D');
      }
      // else {
      //   terminal.write(char);
      // }
    } else {
      terminal.write(char);
    }
    // setTerminal(term);
  };
}

function reactToEnter(
  terminal: Terminal,
  props: { bot: Bot },
  prompt: (term?: Terminal) => void,
  currentLine: string,
  setEntries: {
    (value: SetStateAction<string[]>): void;
    (arg0: string[]): void;
  },
  entries: string[],
  setCurrentLine: {
    (value: SetStateAction<string>): void;
    (arg0: string): void;
  },
  setCurrentPosition: {
    (value: SetStateAction<number>): void;
    (arg0: number): void;
  },
) {
  const statement = 'test';
  terminal.write('\n\r' + statement + '\r\n\u001b[32mscm> \u001b[37m');
  const response: string | Promise<string> = props.bot.getResponse(statement);
  if (typeof response === 'string') {
    terminal.write(response);
  } else {
    terminal.write('...');
    response.then((v: string) => {
      terminal.write(v);
    });
  }
  prompt(terminal);
  const checkValue: RegExp = /^\s+|\s+$/g;
  if (currentLine.replace(checkValue, '').length !== 0) {
    // Check if string is all whitespace
    setEntries(entries.concat([currentLine]));
    setCurrentPosition(entries.length - 1);
    setCurrentLine('');
    prompt(terminal);
  } else {
    // todo odd string
    const text = '\n\\33[2K\r\u001b[32mscm> \u001b[37m';
    terminal.write(text);
  }
}

function reactToDownArrow(
  setCurrentPosition: {
    (value: SetStateAction<number>): void;
    (arg0: number): void;
  },
  currentPosition: number,
  entries: string[],
  setCurrentLine: {
    (value: SetStateAction<string>): void;
    (arg0: string): void;
  },
  terminal: Terminal,
  currentLine: string,
): void {
  setCurrentPosition(currentPosition + 1);
  if (currentPosition === entries.length || entries.length === 0) {
    setCurrentPosition(currentPosition - 1);
    setCurrentLine('');
    terminal.write(RESET_MAGIC_SPELL);
  } else {
    setCurrentLine(entries[currentPosition]);
    terminal.write(RESET_MAGIC_SPELL + currentLine);
  }
}

function reactToUpArrow(
  entries: string[],
  currentPosition: number,
  setCurrentPosition: {
    (value: SetStateAction<number>): void;
    (arg0: number): void;
  },
  setCurrentLine: {
    (value: SetStateAction<string>): void;
    (arg0: string): void;
  },
  terminal: Terminal,
  currentLine: string,
): void {
  if (entries.length > 0) {
    if (currentPosition > 0) {
      setCurrentPosition(currentPosition - 1);
    }
    setCurrentLine(entries[currentPosition]);
    terminal.write(RESET_MAGIC_SPELL + currentLine);
  }
}

function reactToBackspace(
  terminal: Terminal,
  setCurrentLine: {
    (value: SetStateAction<string>): void;
    (arg0: string): void;
  },
  currentLine: string,
): void {
  terminal.write('\b \b');
  if (terminal.buffer.active.cursorX > 5) {
    setCurrentLine(
      currentLine.slice(0, terminal.buffer.active.cursorX - 6) +
      currentLine.slice(terminal.buffer.active.cursorX - 5),
    );
    const pos: number = currentLine.length - terminal.buffer.active.cursorX + 6;
    terminal.write(RESET_MAGIC_SPELL + currentLine);
    const testString = '\\033['.concat(pos.toString()).concat('D');
    console.log(testString);
    terminal.write(testString);
    terminal.write('\\033[<N>D');
    if (
      terminal.buffer.active.cursorX == 5 ||
      terminal.buffer.active.cursorX == currentLine.length + 6
    ) {
      terminal.write('\\033[1C');
    }
  }
}
