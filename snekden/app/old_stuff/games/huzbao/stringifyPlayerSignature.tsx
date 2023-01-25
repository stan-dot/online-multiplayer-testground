import { PlayerSignature } from './engine/types/PlayerSignature';
import { BoardGeneratorVariant } from './types/BoardGeneratorVariant';

export function stringifyPlayerSignature(s: PlayerSignature): string {
  return `${s.name} id: ${s.id} ${s.type}`;
}


export function stringifyBoardGeneratorVariant(b: BoardGeneratorVariant): string {
  return `${b.name} size:${b.front} front, ${b.back} back ${b.fullBack}`;
}
