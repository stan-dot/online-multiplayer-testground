import React from 'react';
import { FriendsBar } from './components/FriendsBar';
import { GameField } from './components/GameField';
import { LandingFooter } from './components/LandingFooter';
import { MainNavigation } from './components/MainNavigation';
import { DescriptionPage } from './components/DescriptionPage';
import { GameCard } from './types/GameCard';
import { SocketWrapper } from './wrappers/Socket.wrapper';
import { availableGames } from './data/games';

// font and background
const colors = ['#80F', '#0AA']
export default function App() {
  const [gameIsOn, setGameIsOn] = React.useState(true);
  const gameName: string = 'ArgumentTree';
  const game: GameCard = availableGames.find(g => g.componentName === gameName) || availableGames[0];
  const [currentGameCard, setCurrentGameCard] = React.useState(game);
  // const [currentGameCard, setCurrentGameCard] = React.useState({} as GameCard)
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
          <button onClick={() => setGameIsOn(false)}>Close current game</button>
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
          {/* <FriendsBar /> */}
          <LandingFooter />
        </>
      }
      {/* </SocketWrapper> */}
    </div>
  );
}


