import { Bot } from '../../types/Bot';
import MemoryManager from './MemoryManger';
import TextTransformer from './TextTransformer';
import { TransformResponse } from './types/TransformResponse';
import { ElizaData } from './types/ElizaData';
import { ElizaOptions } from './types/ElizaOptions';
import { getRandomFromGenericArray } from './utils/getRandomFromGenericArray';

export default class ElizaBot implements Bot {
  public name: string;
  private data: ElizaData;
  private textTransformer: TextTransformer;
  private options: ElizaOptions;

  constructor(data: ElizaData, noRandomFlag: boolean) {
    this.options = {
      capitalizeFirstLetter: true,
      randomResponses: noRandomFlag ? false : true,
      debug: false,
      version: '1.1 (original)',
    };
    this.name = 'elizaBot';
    this.data = data;
    this.textTransformer = new TextTransformer(); // todo tbh that might just be static, as it's stateless
    this.reset();
  }
  private getFinal(): string {
    return getRandomFromGenericArray(this.data.finals);
  }

  private getInitial(): string {
    return getRandomFromGenericArray(this.data.welcomes);
  }

  // todo this was async, might not quite work that way. the problems of oop...
  public getResponse(question: string): string {
    const reply: TransformResponse = this.textTransformer.transform(question);
    if (reply.quit) {
      this.reset();
      return this.getFinal();
    }
    return reply.text;
  }

  private reset() {
    this.textTransformer.reset();
  }
}
