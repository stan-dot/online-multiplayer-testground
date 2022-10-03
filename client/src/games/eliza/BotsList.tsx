import React, { useEffect, useState } from 'react';
import { AvailableBots } from './types/AvailableBots';

export function BotsList(props: { callback: Function }) {
  const [chosen, setchosen] = useState(AvailableBots.ECHO);
  const [remoteUrl, setRemoteUrl] = useState('');

  useEffect(() => {
    props.callback(chosen);
    console.log('calling callback')
    return () => {
    }
  }, [chosen])

  const handleRemoteClick = (v: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    console.log('clicked remote button', v);
    setchosen(AvailableBots.REMOTE)
  };
  return <div>
    <h2>List of bots available</h2>
    <ul>
      <li>
        <button onClick={v => setchosen(AvailableBots.ECHO)}>
          {AvailableBots.ECHO}
        </button>
      </li>
      <li>
        <button onClick={v => setchosen(AvailableBots.ELIZA)}>
          {AvailableBots.ELIZA}
        </button>
      </li>
    </ul>
    <div>
      <h3>Talk to a remote bot</h3>
      <div>
        <input type={"url"} value={remoteUrl} onChange={v => setRemoteUrl(v.target.value)} />
        <button onClick={handleRemoteClick}>
          {AvailableBots.REMOTE}
        </button>
      </div>
    </div>
  </div>
}
