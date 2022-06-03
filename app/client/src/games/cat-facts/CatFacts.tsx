import React from 'react';
import { defaultText } from './defaults';

export default function CatFacts(): JSX.Element {
  const [mainText, setMainText] = React.useState(defaultText.fact);
  const getFacts = () => {
    fetch('/api/cats/')
      .then(handleIncoming)
      .catch((error) => console.error("couldn't react the remote API", error));
  };

  const handleIncoming = (result: any): void => {
    const json = result.json();
    const text: string = json.fact;
    setMainText(text);
  };
  return <div>
    <h1> cat facts</h1>
    <button onClick={getFacts}>Find Cat Facts</button>
    {mainText}
  </div>;
}
