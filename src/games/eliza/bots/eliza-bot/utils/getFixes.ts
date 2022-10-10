import { FixesReturn } from '../types/FixesReturn';
import { UnaryTransformer } from '../types/UnaryTransformer';

export function getFixes(arr: UnaryTransformer[]): FixesReturn {
  let map: Map<string, string> = new Map([]);
  let arrayValidFlag: boolean = false;
  if (arr && arr.length) {
    arr.forEach((transformer: UnaryTransformer) => {
      map.set(transformer[0], transformer[1]);
    });
    arrayValidFlag = true;
  } else {
    map.set('####', '####');
  }
  return {
    arr: map,
    regExp: arrayValidFlag
      ? new RegExp('\\b(' + Array.from(map).join('|') + ')\\b')
      : /####/,
  };
}
