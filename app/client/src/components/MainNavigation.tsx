import { availableGames } from '../data/games';
import { GameCard } from '../types/GameCard';

export function MainNavigation(props: { gameCardCallback: Function }): JSX.Element {
  return <nav>
    <ul>
      {availableGames.map((card: GameCard, index: number) => {
        return <li key={index.valueOf()}>
          <button onClick={() => props.gameCardCallback(card)}>
            {card.componentName}
          </button>
        </li>
      })}
      <li><a href='#footer'>goto footer</a></li>
    </ul>
  </nav>
}
