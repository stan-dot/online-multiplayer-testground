import React, { useEffect, useState } from 'react';
import { EchoBot } from './bots/echo-bot/EchoBot';
import ElizaBot from './bots/eliza-bot/ElizaBot';
import { RemoteBot } from './bots/remote-bot/RemoteBot';
import { Bot } from './types/Bot';

const botNameMap: Map<string, Bot> = new Map([
  ['echo', new EchoBot('test1')],
]);

function BotCreator(name: string): Bot {
  const n = 0;
  // const bot: Bot = new ElizaBot(`name${n}`, true);

  const bot = botNameMap.get(name) ?? new EchoBot('echo1');
  return bot;
}

export function BotsList(props: { callback: React.Dispatch<React.SetStateAction<Bot>>, startingBot: Bot }) {
  const [chosen, setchosen] = useState(props.startingBot);
  const [remoteUrl, setRemoteUrl] = useState('');

  useEffect(() => {
    props.callback(chosen);
    console.log('calling callback')
    return () => {
    }
  }, [chosen])

  const handleRemoteClick = (v: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    console.log('clicked remote button', v);
    setchosen(new RemoteBot('gold2') as Bot)
  };

  return <div>
    <h2>List of bots available</h2>
    <ul>
      <li>
        <button onClick={v => setchosen(BotCreator('echo'))}>
          Echo bot
        </button>
      </li>
      <li>
        <button disabled onClick={v => setchosen(BotCreator('eliza'))}>
          Eliza Bot
        </button>
      </li>
    </ul>
    <div>
      <h3>Talk to a remote bot</h3>
      <div>
        <input type={"url"} value={remoteUrl} onChange={v => setRemoteUrl(v.target.value)} />
        <button onClick={handleRemoteClick}>
          Remote Bot
        </button>
      </div>
    </div>
  </div>
}
