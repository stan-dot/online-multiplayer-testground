import React from 'react';
import { FriendsBar } from './components/FriendsBar';
import { GameField } from './components/GameField';
import { LandingFooter } from './components/LandingFooter';
import { MainNavigation } from './components/MainNavigation';
import { DescriptionPage } from './components/DescriptionPage';
import { GameCard } from './types/GameCard';
import { SocketWrapper } from './wrappers/Socket.wrapper';
import { availableGames } from './data/games';

export default function App() {
  const [gameIsOn, setGameIsOn] = React.useState(true);
  const gameName: string = 'ConwaysGame';
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
            <h1>test landing page</h1>
          </header>
          <MainNavigation gameCardCallback={changeGame} />
          above there 'll be your game
          <DescriptionPage />
          {/* <FriendsBar /> */}
          <LandingFooter />
        </>
      }
      {/* </SocketWrapper> */}
    </div>
  );
}


