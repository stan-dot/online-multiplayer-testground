import MemoryManager from './MemoryManger';
import { unifyTextString } from './utils/unifyTextString';
import { ElizaData } from './types/ElizaData';
import { DecompEncoding, ElizaKeyword } from './types/Encoding';
import { FixesReturn } from './types/FixesReturn';
import { PostTransform } from './types/PostTransform';
import { TransformerOptions } from './types/TransformerOptions';
import { TransformResponse } from './types/TransformResponse';
import { makeCamelCase } from './utils/makeCamelCase';
import { parseInitialData } from './utils/parseInitialData';
import { getFixes } from './utils/getFixes';
import { MAIN_DATA } from './data/elizaData';

export default class TextTransformer {
  private lastchoice: any;
  private options: TransformerOptions = { debug: true, randomResponses: false };
  private preRegex: RegExp = new RegExp('');
  private postRegex: RegExp = new RegExp('');
  private memoryManger: MemoryManager;
  private data: ElizaData;
  private pres: Map<string, string>;
  private posts: Map<string, string>;

  constructor() {
    const memorySize = 20;
    this.memoryManger = new MemoryManager(memorySize);
    this.data = parseInitialData(MAIN_DATA);
    const presResponse: FixesReturn = getFixes(this.data.pres);
    this.pres = presResponse.arr;
    this.preRegex = presResponse.regExp;
    const postResponse: FixesReturn = getFixes(this.data.posts);
    this.posts = postResponse.arr;
    this.postRegex = postResponse.regExp;
  }

  /**
   * Executed when want some response
   * @param text
   * @returns
   */
  public transform(text: string): TransformResponse {
    var reply: string = '';
    const parts: string[] = unifyTextString(text).split('.');
    parts
      .filter(p => p !== '')
      .forEach((part, i) => {
        // check for quit expression
        this.data.quits.forEach((farewell, i) => {
          if (farewell === part) {
            return {
              text: '',
              quit: true,
            };
          }
        });
        let m = this.preRegex.exec(part);
        // m = this.preRegexes.reduce(
        //   (_previous: string, current: string) => current.exec,
        // );
        if (m) {
          var leftSubPart = '';
          var rightSubPart = part;
          while (m) {
            leftSubPart +=
              // https://github.com/PatInshuti/ELIZA-api/blob/main/node_modules/eliza-as-promised/lib/elizabot.js#:~:text=lp%2B%3Drp.substring(0%2Cm.index)%2Bthis.pres%5Bm%5B1%5D%5D%3B
              rightSubPart.substring(0, m.index) + this.pres.get(m[1]);
            rightSubPart = rightSubPart.substring(m.index + m[0].length);
            m = this.preRegex.exec(rightSubPart);
          }
          part = leftSubPart + rightSubPart;
        }
        this.data.keyWords.forEach((keyword, i) => {
          const keyWordSpecificRegex = new RegExp(`\\b ${keyword[0]}\\b`, 'i');
          if (part.search(keyWordSpecificRegex) >= 0) {
            reply = this.executeRegexRule(i, part);
          }
          if (reply != '') return { text: reply, quit: false };
        });
      });

    // nothing matched try mem
    reply = this.memoryManger.get(this.options.randomResponses ?? false);
    // if nothing in mem, so try xnone
    if (reply == '') {
      const sentence = ' ';
      const k: number = this._getRuleIndexByKey('xnone');
      if (k) reply = this.executeRegexRule(k, sentence);
    }
    // return reply or default string
    const response: TransformResponse = {
      text: reply !== '' ? reply : 'I am at a loss for words.',
      quit: false,
    };
    return response;
  }

  public reset(): void {
    this.memoryManger.reset();
    this.lastchoice = [];
    this.data.keyWords.forEach((v, i) => {
      this.lastchoice[i] = [];
      this.data.keyWords[i][2].forEach((v, j) => {
        this.lastchoice[i][j]--;
      });
    });
  }

  /**
   *
   * @param ruleNumber
   * @param sentence
   * @returns
   */
  private executeRegexRule(ruleNumber: number, sentence: string): string {
    const rule: ElizaKeyword = this.data.keyWords[ruleNumber];
    const decomps: DecompEncoding[] = rule[2];
    const paramre: RegExp = /\(([0-9]+)\)/;
    decomps.forEach((encoding, index) => {
      var m = sentence.match(encoding[0]);
      if (m != null) {
        const reasmbs: string[] = encoding[1];
        const memflag: boolean = encoding[2] ?? false;
        let responseIndex: number = this.options.randomResponses
          ? 0
          : Math.floor(Math.random() * reasmbs.length);
        /**
         * changing the last choice in dependence ot response index
         *  */
        if (
          (this.options.randomResponses &&
            this.lastchoice[ruleNumber][index] > responseIndex) ||
          this.lastchoice[ruleNumber][index] == responseIndex
        ) {
          responseIndex = ++this.lastchoice[ruleNumber][index];
          if (responseIndex >= reasmbs.length) {
            responseIndex = 0;
            this.lastchoice[ruleNumber][index] = -1;
          }
        } else {
          this.lastchoice[ruleNumber][index] = responseIndex;
        }
        var rpl: string = reasmbs[responseIndex];
        // this.debugComment(ruleNumber, encoding, rpl, memflag);
        if (rpl.search('^goto ') == 0) {
          let ki = this._getRuleIndexByKey(rpl.substring(5));
          if (ki) return this.executeRegexRule(ki, sentence);
        }
        // substitute positional params
        var m1: RegExpExecArray | null = paramre.exec(rpl);
        if (m1) {
          var lp = '';
          var rp = rpl;
          while (m1) {
            var param = m[parseInt(m1[1])];
            var m2 = this.postRegex.exec(param);
            if (m2) {
              var lp2 = '';
              var rp2 = param;
              while (m2) {
                lp2 += rp2.substring(0, m2.index) + this.posts.get(m2[1]);
                rp2 = rp2.substring(m2.index + m2[0].length);
                m2 = this.postRegex.exec(rp2);
              }
              param = lp2 + rp2;
            }
            lp += rp.substring(0, m1.index) + param;
            rp = rp.substring(m1.index + m1[0].length);
            m1 = paramre.exec(rp);
          }
          rpl = lp + rp;
        }
        rpl = this._postTransformOwnReply(rpl, this.data.postTransforms);
        if (memflag) this.memoryManger.addToMemory(rpl);
        else return rpl;
      }
    });
    return '';
  }

  private debugComment(
    ruleNumber: number,
    encoding: DecompEncoding,
    rpl: string,
    memflag: boolean,
  ) {
    if (this.options.debug)
      alert(
        'match:\nkey: ' +
          this.data.keyWords[ruleNumber][0] +
          '\nrank: ' +
          this.data.keyWords[ruleNumber][1] +
          '\ndecomp: ' +
          encoding[0] +
          '\nreasmb: ' +
          rpl +
          '\nmemflag: ' +
          memflag,
      );
  }

  private _postTransformOwnReply(
    s: string,
    postTransforms: PostTransform[],
    capitalize?: boolean,
  ): string {
    // final cleanings
    s = s.replace(/\s{2,}/g, ' ');
    s = s.replace(/\s+\./g, '.');
    if (postTransforms.length) {
      postTransforms.forEach((v, i) => {
        s = s.replace(v.original, v.final);
        postTransforms[i].lastIndex = 0;
      });
    }
    // capitalize first char (v.1.1: work around lambda function)
    if (capitalize) {
      s = makeCamelCase(s);
    }
    return s;
  }

  private _getRuleIndexByKey(key: string): number {
    var index = 0;
    this.data.keyWords.find(
      (k: ElizaKeyword, index: number) => k[0] === key && index++,
    );
    return index;
  }
}
