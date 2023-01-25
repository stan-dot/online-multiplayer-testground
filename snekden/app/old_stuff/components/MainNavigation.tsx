import { availableGames } from '../games';
import { GameCard } from '../types/GameCard';

export function MainNavigation(props: { gameCardCallback: Function }) {
  return <nav>
    <ul>
      {availableGames.map((card: GameCard, index: number) => {
        return <li key={index.valueOf()}>
          <button onClick={() => props.gameCardCallback(card)}>
            {card.componentName}
          </button>
        </li>
      })}
    </ul>
  </nav>
}
