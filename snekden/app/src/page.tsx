import React from 'react';
import { DescriptionPage } from './components/DescriptionPage';
import { GameField } from './components/GameField';
import { MainNavigation } from './components/MainNavigation';
import { availableGames } from './data/games';
import { GameCard } from './types/GameCard';

// font and background
const colors = ['#80F', '#0AA']
export default function OldAp() {
  const [gameIsOn, setGameIsOn] = React.useState(true);
  const gameName: string = 'ArgumentTree';
  const game: GameCard = availableGames.find(g => g.componentName === gameName) || availableGames[0];
  const [currentGameCard, setCurrentGameCard] = React.useState(game);
  const changeGame = (card: GameCard): void => {
    setCurrentGameCard(card);
    setGameIsOn(true);
    console.log('changing the game');
  }
  return (
    <div className="App">
      {/* <SocketWrapper> */}
      {gameIsOn
        ?
        <>
          <button onClick={() => {
            console.clear();
            setGameIsOn(false);
          }}>Close current game</button>
          <GameField gameCard={currentGameCard} />
        </>
        :
        <>
          <header className="App-header">
            <h1>Welcome to Snekden</h1>
            <h3>Choose your games</h3>
          </header>
          <MainNavigation gameCardCallback={changeGame} />
          <DescriptionPage />
        </>
      }
      {/* </SocketWrapper> */}
    </div>
  );
}


