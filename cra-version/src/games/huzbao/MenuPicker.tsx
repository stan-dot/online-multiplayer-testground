import { BotCaller } from './bot/BotCaller';
import { BoardGeneratorVariant } from './types/BoardGeneratorVariant';
import { stringifyBoardGeneratorVariant, stringifyPlayerSignature } from "./stringifyPlayerSignature";

export function MenuPicker(props: {
  name: string;
  items: BotCaller[] | BoardGeneratorVariant[];
  callback: Function;
}): JSX.Element {
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
