import { BotCaller } from '../../snekden/app/games/mancala/bot/BotCaller';
import { BoardGeneratorVariant } from '../../snekden/app/games/mancala/types/BoardGeneratorVariant';
import { stringifyBoardGeneratorVariant, stringifyPlayerSignature } from "../../snekden/app/games/mancala/stringifyPlayerSignature";

export function MenuPicker(props: {
  name: string;
  items: BotCaller[] | BoardGeneratorVariant[];
  callback: Function;
}) {
  const isBoard: boolean = Object.hasOwn(props.items[0], 'fullBack');
  return (
    <div>
      <label htmlFor={props.name}>Choose a{props.name}:</label>
      <select name={props.name} id={props.name}>
        {props.items.map((v: BotCaller | BoardGeneratorVariant) => (
          <option value={v.name} onClick={props.callback(v)}>
            <p>
              {isBoard
                ? stringifyBoardGeneratorVariant(v as BoardGeneratorVariant)
                : stringifyPlayerSignature((v as BotCaller).signature)}
            </p>
          </option>
        ))}
      </select>
    </div>
  );
}
