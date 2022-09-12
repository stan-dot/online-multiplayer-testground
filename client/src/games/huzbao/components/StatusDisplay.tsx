import { HuzbaoGameState } from "../engine/types/boardTypes";

export function StatusDisplay(props: { game: HuzbaoGameState }): JSX.Element {
  const time: Date = new Date(props.game.stats.startingTime - Date.now());
  return <div id='data bar'>
    <ul>
      <li>moves done {props.game.stats.movesDone}</li>
      <li>taken gems {props.game.stats.takenGems}</li>
      <li>number of rounds{props.game.stats.roundCounter}</li>
      <li>time since start {time.getTime()} </li>
    </ul>
  </div>;
}
