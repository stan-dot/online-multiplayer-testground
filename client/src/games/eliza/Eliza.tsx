import React, { useState } from 'react';
import { possibleBots } from '../huzbao/bot/bots';
import { EchoBot } from './bots/echo-bot/EchoBot';
import { BotsList } from './BotsList';
import TerminalHandler from './TerminalHandler';
import { TerminalPanel } from './TerminalPanel';
import { Bot } from './types/Bot';

export default function Eliza(): JSX.Element {
  const defaultBot: Bot = new EchoBot('EchoBot1', 'some decription');
  const [currentBot, setCurrentBot] = useState(defaultBot)
  // todo lazy load the bots
  return <div id='terminal-container'>
    <BotsList callback={setCurrentBot} />
    {/* <TerminalPanel bot={currentBot} /> */}
    <TerminalHandler bot={currentBot} />
    <Footer currentBot={currentBot} />
  </div>
}

function Footer(props: { currentBot: Bot }): JSX.Element {
  const additionalText: string =  '';
  // const additionalText: string = props.currentBot.getDescription() ?? '';
  return <>
    <p>
      {additionalText}
    </p>
    <p>
      made in 2022 by <a href='https://github.com/stan-dot'>stan-dot</a>
    </p>
  </>
}
