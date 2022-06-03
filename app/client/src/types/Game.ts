import { Player } from "../games/snake/Player";


// all games would need to implement this
export type GameCard = {
  img: HTMLImageElement;
  name: string;
  commonFriends: Player[];
}