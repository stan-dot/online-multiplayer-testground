import React from 'react';
import { defaultText } from './defaults';

export default function CatFacts(): JSX.Element {
  const [mainText, setMainText] = React.useState(defaultText.fact);
  const getFacts = () => {
    fetch('/api/cats/')
      .then(result => result.json())
      .then(handleIncoming);
  };

  const handleIncoming = (body: any): void => {
    const text: string = body.fact;
    console.log('text:', text);
    setMainText(text);
  };
  return <div>
    <h1> cat facts</h1>
    <button onClick={getFacts}>Find Cat Facts</button>
    {mainText}
  </div>;
}
