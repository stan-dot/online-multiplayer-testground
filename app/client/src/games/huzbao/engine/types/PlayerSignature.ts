export enum PlayerType {
  AI,
  HUMAN,
}
export type PlayerSignature = {
  name: string;
  id: string;
  type: PlayerType;
};
