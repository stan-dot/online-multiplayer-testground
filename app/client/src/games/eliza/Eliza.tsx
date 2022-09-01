import React from 'react';
import { BotsList } from './BotsList';
import { TerminalPanel } from './TerminalPanel';

export default function Eliza(): JSX.Element {
  // todo lazy load the bots
  return <div id='terminal-container'>
    <BotsList/>
    <TerminalPanel />
  </div>
}