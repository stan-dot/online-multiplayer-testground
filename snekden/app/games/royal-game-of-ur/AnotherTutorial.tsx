import { useState, useRef } from 'react';
import { useMachine } from '@xstate/react';
import { toggleMachine } from './toggleMachine';

export default function AnotherTutorial() {
  const [current, send] = useMachine(toggleMachine);
  return <div id="anotherTutorial">
    <p>tutorial contents</p>

    <button onClick={() => send('TOGGLE')}>
      {current.matches('inactive') ? 'Off' : 'On'}
    </button>
  </div>
}