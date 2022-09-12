import { Bot } from '../../types/Bot';
import { ElizaOptions } from './types/ElizaOptions';
import MemoryManager from './MemoryManger';
import TextTransformer from './TextTransformer';
import { ElizaData } from './types/ElizaData';
import { getRandomFromGenericArray } from './utils/getRandomFromGenericArray';

export default class ElizaBot implements Bot {
  name: string;
  data: ElizaData;
  preExp: RegExpExecArray;
  postExp: RegExpExecArray;
  lastchoice: any;
  quit: boolean;
  memoryManger: MemoryManager;
  textTransformer: TextTransformer;
  _dataParsed: boolean;
  options: ElizaOptions;
  constructor(data: ElizaData, noRandomFlag: boolean) {
    this.options = {
      capitalizeFirstLetter: true,
      randomResponses: noRandomFlag ? false : true,
      debug: false,
      version: '1.1 (original)',
    };
    this.data = data;
    this._dataParsed = false;
    this.memoryManger = new MemoryManager(20);
    this.textTransformer = new TextTransformer(); // todo tbh that might just be static, as it's stateless
    if (!this._dataParsed) this.textTransformer._init();
    this.reset();
  }

  getFinal(): string {
    return getRandomFromGenericArray(this.data.finals);
  }

  getInitial(): string {
    return getRandomFromGenericArray(this.data.welcomes);
  }

  // todo this was async, might not quite work that way. the problems of oop...
  public getResponse(statement: string): string {
    const reply = this.textTransformer.transform(statement);
    if (this.quit) {
      return this.getFinal();
    }
    return reply;
  }

  private reset() {
    this.quit = false;
    this.memoryManger.reset();
    this.lastchoice = [];
    for (var k = 0; k < this.data.keyWords.length; k++) {
      this.lastchoice[k] = [];
      var rules = this.data.keyWords[k][2];
      for (var i = 0; i < rules.length; i++) this.lastchoice[k][i] = -1;
    }
  }
}
