import React, { useEffect, useRef } from 'react';
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

  React.useEffect(() => {
    var canvas: HTMLCanvasElement = document.getElementById("myCanvas") as HTMLCanvasElement
    var ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
    if (ctx) {
      ctx.moveTo(0, 0);
      ctx.lineTo(200, 100);
      ctx.stroke();
    }
  }, []);

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
      <h1>HTML5 Canvas + React.js</h1>
      <canvas
        id="myCanvas"
        width="200"
        height="100"
        style={{ border: "1px solid #d3d3d3" }}
      >
        Your browser does not support the HTML canvas tag.
      </canvas>
    </div>
  );
}
