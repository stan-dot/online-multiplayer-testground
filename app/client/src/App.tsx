import React from 'react';
import { Canvas } from './utils/Canvas';
import { postdraw, predraw } from './utils/canvasOptionUtils';
import { drawArc } from './utils/canvasUtils';
import { CatFacts } from './games/cat-facts/CatFacts';
import { FriendsBar } from './components/FriendsBar';
import { LandingFooter } from './components/LandingFooter';
import { MainNavigation } from './components/MainNavigation';
export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>test landing page</h1>
      </header>
      <MainNavigation />
      <CatFacts />
      <Canvas draw={drawArc} predraw={predraw} postdraw={postdraw} />
      <FriendsBar />
      <LandingFooter />
    </div>
  );
}

