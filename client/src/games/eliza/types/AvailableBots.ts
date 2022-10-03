import { EchoBot } from "../bots/echo-bot/EchoBot";
import ElizaBot from "../bots/eliza-bot/ElizaBot";
import { RemoteBot } from "../bots/remote-bot/RemoteBot";
import { Bot } from "./Bot";

export enum AvailableBots {
  ECHO = 'ECHO',
  ELIZA = 'ELIZA',
  REMOTE = 'REMOTE',
  NULL = 'NULL'
}


// export const AvailableBots: ((s:string)=> Bot[]){
//   new ElizaBot(),
//     new EchoBot(),
//     new RemoteBot(),
// }
