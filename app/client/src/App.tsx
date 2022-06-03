import React from 'react';
import { FriendsBar } from './components/FriendsBar';
import { GameField } from './components/GameField';
import { LandingFooter } from './components/LandingFooter';
import { MainNavigation } from './components/MainNavigation';
import { DescriptionPage } from './components/DescriptionPage';
import { GameCard } from './types/GameCard';

export default function App() {
  const [gameIsOn, setGameIsOn] = React.useState(false);
  const [currentGameCard, setCurrentGameCard] = React.useState({} as GameCard)
  const changeGame = (card: GameCard): void => {
    console.log('changing the game to', card);
    setCurrentGameCard(card);
    setGameIsOn(true);
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>test landing page</h1>
      </header>
      <button onClick={() => setGameIsOn(false)}>Close current game</button>
      <MainNavigation gameCardCallback={changeGame} />
      {gameIsOn ? <GameField gameCard={currentGameCard} /> : `here'll be your game`}
      <DescriptionPage />
      <FriendsBar />
      <LandingFooter />
    </div>
  );
}


