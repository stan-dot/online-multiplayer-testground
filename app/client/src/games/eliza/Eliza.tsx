import { Terminal } from 'xterm';
import { TerminalPanel } from './TerminalPanel';

export default function Eliza(): JSX.Element {
  const term = new Terminal();
  term.open(document.getElementById('terminal'));
  term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')
  return <div id='terminal-container'>
    <TerminalPanel draw={drawArc} />
  </div>
}