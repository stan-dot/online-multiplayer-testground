import React from 'react';
import { BotsList } from './BotsList';
import { TerminalPanel } from './TerminalPanel';

export default function Eliza(): JSX.Element {
  // todo lazy load the bots
  return <div id='terminal-container'>
    <BotsList />
    <TerminalPanel />
    <Footer />
  </div>
}

function Footer(): JSX.Element {
  return <div>
    <p>this is a modern typescript reimplementation of the 2005 js version, uploaded <a
      href='
        https://github.com/PatInshuti/ELIZA-api/tree/main/node_modules/eliza-as-promised)
      '>here</a> in 2020.
      made in 2020 by <a href='https://github.com/stan-dot'>stan-dot</a>
    </p>
  </div>
}