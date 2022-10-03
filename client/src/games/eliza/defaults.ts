import c from 'ansi-colors';
import { ITerminalOptions } from 'xterm';

export const PROMPT_SIGN = '$ ';
// export const WelcomeText = c.magenta("I am ") + c.blue("Blue") + c.red(" and i like it");
export const WELCOME_TEXT = 'Welcome!';
export const DEFAULT_TERMINAL_SETTINGS: ITerminalOptions = {
  convertEol: true,
  fontFamily: `'Fira Mono', monospace`,
  fontSize: 15,
  fontWeight: 900,
  theme: {
    background: 'black',
    foreground: 'white',
  },
  cursorBlink: false,
  allowProposedApi: true,
};
