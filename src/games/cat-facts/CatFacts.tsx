import React from 'react';
import { CatOutput } from './CatOutput';
import { defaultText } from './defaults';

const url: string = 'https://catfact.ninja/fact';

export default function CatFacts(): JSX.Element {
  const [mainText, setMainText] = React.useState(defaultText.fact);
  const getFacts = () => fetch(url).then(handleIncoming);

  const handleIncoming = (r: Response): void => {

    try {
      const reader: ReadableStreamDefaultReader<Uint8Array> = r.body!.getReader();
      reader.read().then(({ done, value }) => {
        const str: string = new TextDecoder().decode(value);
        const j: CatOutput = JSON.parse(str);
        setMainText(j.fact);
      });
    } catch (error) {
      console.error('could not log the cat fact');
    }

  };
  return <div>
    <h1> cat facts</h1>
    <button onClick={getFacts}>Find Cat Facts</button>
    {mainText}
  </div>;
}
