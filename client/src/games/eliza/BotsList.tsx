import React, { useState } from 'react';

export function BotsList(props: { callback: Function }) {
  const [chosen, setchosen] = useState('');
  return <div>

    <h3>List of bots available</h3>
    <ul>
      <li>Echo bot</li>
      <li>Eliza bot</li>
    </ul>
  </div>
}
