import React, { useEffect, useState } from 'react';
import { AvailableBots } from './types/AvailableBots';

export function BotsList(props: { callback: Function }) {
  const [chosen, setchosen] = useState(AvailableBots.NULL);
  const [remoteUrl, setRemoteUrl] = useState('');

  useEffect(() => {
    props.callback(chosen);
    return () => {
    }
  }, [chosen])

  return <div>
    <h3>List of bots available</h3>
    <ul>
      <li>
        <button value={AvailableBots.ECHO} onClick={v => setchosen(AvailableBots.ECHO)}>
          Echo bot
        </button>
      </li>
      <li>
        <button value={AvailableBots.ELIZA} onClick={v => setchosen(AvailableBots.ELIZA)}>
        </button>
      </li>
    </ul>
    <div>
      <h3>Talk to a remote bot</h3>
      <div>
        <input type={"url"} value={remoteUrl} onChange={v => setRemoteUrl(v.target.value)} />
        <button value={AvailableBots.REMOTE} onClick={v => setchosen(AvailableBots.REMOTE)}>
        </button>
      </div>
    </div>
  </div>
}
