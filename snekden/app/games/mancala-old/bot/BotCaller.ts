// import { PlayerSignature } from '../engine/types/PlayerSignature';
import { HuzbaoBot } from './HuzbaoBot';

export type BotCaller = {
  name: string;
  // signature: PlayerSignature;
  signature:string;
  caller: (signature:string) => HuzbaoBot;
};
