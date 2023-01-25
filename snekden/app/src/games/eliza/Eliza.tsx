import { useState } from 'react';
import { EchoBot } from './bots/echo-bot/EchoBot';
import { BotsList } from './BotsList';
import TerminalHandler from './TerminalHandler';
import { Bot } from './types/Bot';

export default function Eliza(): JSX.Element {
  const defaultBot: Bot = new EchoBot('EchoBot1', 'some description');
  const [currentBot, setCurrentBot] = useState(defaultBot)
  return <>
    <div>
      current bot:{currentBot.name}
    </div>
    <BotsList callback={setCurrentBot} startingBot={currentBot} />
    <TerminalHandler bot={currentBot} />
    <Footer currentBot={currentBot} />
  </>
}

function Footer(props: { currentBot: Bot }): JSX.Element {
  const additionalText: string = '';
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
