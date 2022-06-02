import React from 'react';
import logo from './logo.svg';
type CatOutput = {
  fact: string,
  length: number,
}
const defaultText: CatOutput = {
  fact: 'empty fact',
  length: 10,
}

export default function App() {
  const [mainText, setMainText] = React.useState(defaultText.fact);
  const getFacts = () => {
    fetch('/api/cats/')
      .then(result => result.json())
      .then(body => { console.log('body:', body); handleIncoming(body); });
  }

  const handleIncoming = (body: any): void => {
    const text: string = body.fact;
    console.log('text:', text);
    setMainText(text);
  }

  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div>
        <h1> cat facts</h1>
        <input value={mainText} onChange={handleIncoming} />
        <button onClick={getFacts}>Find Cat Facts</button>
        {mainText}
      </div>
    </div>
  );

}
