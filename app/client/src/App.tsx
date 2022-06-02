import React from 'react';
import { defaultText } from './utils/defaults';
import { Canvas } from './utils/Canvas';
import { postdraw, predraw } from './utils/canvasOptionUtils';
import { drawArc } from './utils/canvasUtils';
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
    var ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>test landing page</h1>
      </header>
      <div>
        <h1> cat facts</h1>
        <button onClick={getFacts}>Find Cat Facts</button>
        {mainText}
      </div>
      <h1>test canvas</h1>
      <Canvas draw={drawArc} predraw={predraw} postdraw={postdraw} />
    </div>
  );
}
