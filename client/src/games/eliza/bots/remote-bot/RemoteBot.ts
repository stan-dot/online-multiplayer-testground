import { Bot } from '../../types/Bot';
import axios, { AxiosResponse } from 'axios';

export class RemoteBot extends Bot {
  private url: string;

  constructor(url: string, name?: string) {
    super(name ?? 'Remote bot');
    this.url = url;
  }

  public async getResponse(s: string): Promise<string> {
    const text: string = await this.remoteApiInterface(s);
    return text;
  }

  private async remoteApiInterface(s: string): Promise<string> {
    const response: AxiosResponse = await axios.get(this.url);
    return response.data;
  }
  public getDescription(): string {
    return 'Talks to a chatbot on a remote server';
  }
}
