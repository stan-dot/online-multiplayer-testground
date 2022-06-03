import React from 'react';
import { Canvas } from './utils/Canvas';
import { postdraw, predraw } from './utils/canvasOptionUtils';
import { drawArc } from './utils/canvasUtils';
import { LandingFooter } from './LandingFooter';
import { FriendsBar } from './FriendsBar';
import { MainNavigation } from './MainNavigation';
import { CatsApiBox } from './CatsApiBox';
export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>test landing page</h1>
      </header>
      <MainNavigation />
      <CatsApiBox />
      <Canvas draw={drawArc} predraw={predraw} postdraw={postdraw} />
      <FriendsBar />
      <LandingFooter />
    </div>
  );
}

