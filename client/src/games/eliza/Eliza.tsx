import React, { useState } from 'react';
import { possibleBots } from '../huzbao/bot/bots';
import { EchoBot } from './bots/echo-bot/EchoBot';
import { BotsList } from './BotsList';
import TerminalHandler from './TerminalHandler';
import { TerminalPanel } from './TerminalPanel';
import { Bot } from './types/Bot';

export default function Eliza(): JSX.Element {
  const defaultBot: Bot = new EchoBot('EchoBot1');
  const [currentBot, setCurrentBot] = useState(defaultBot)
  // todo lazy load the bots
  return <div id='terminal-container'>
    <BotsList callback={setCurrentBot} />
    {/* <TerminalPanel bot={currentBot} /> */}
    <Footer />
    <TerminalHandler bot={currentBot} />
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