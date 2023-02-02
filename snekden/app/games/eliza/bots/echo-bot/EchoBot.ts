import { Bot } from '../../types/Bot';

export class EchoBot extends Bot {
  public getResponse(s: string): string {
    return `just an echo${s}`;
  }
  public getDescription(): string {
    return 'Just an echo'
  }
}
