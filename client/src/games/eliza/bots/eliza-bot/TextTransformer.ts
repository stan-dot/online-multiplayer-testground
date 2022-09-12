import { FixesReturn } from './types/FixesReturn';
import { getPatterns } from './transformers/getPatterns';
import { sanitizeExec } from './transformers/sanitizeExec';
import { ElizaData } from './types/ElizaData';
import { DecompEncoding, ElizaKeyword } from './types/Encoding';
import { PostTransform } from './types/PostTransform';
import { sortKeywords } from './utils/sortKeywords';
import { unifyTextString } from './transformers/unifyTextString';
import { TransformResponse } from './TransformResponse';
import MemoryManager from './MemoryManger';

type TransformerOptions = {
  debug?: boolean;
  randomResponses?: boolean;
};

export default class TextTransformer {
  private lastchoice: any;
  private options: TransformerOptions = { debug: true, randomResponses: false };
  private preExp: RegExpExecArray;
  private postExp: RegExpExecArray;
  private _dataParsed: boolean;
  private memoryManger: MemoryManager;
  private sentence: string;
  private data: ElizaData;
  constructor() {}

  public reset(): void {
    this.memoryManger.reset();
    this.lastchoice = [];
    for (var k = 0; k < this.data.keyWords.length; k++) {
      this.lastchoice[k] = [];
      var rules = this.data.keyWords[k][2];
      for (var i = 0; i < rules.length; i++) this.lastchoice[k][i] = -1;
    }
  }

  private _execRule(ruleNumber: number): string {
    var rule = this.data.keyWords[ruleNumber];
    var decomps = rule[2];
    var paramre = /\(([0-9]+)\)/;
    for (var i = 0; i < decomps.length; i++) {
      var m = this.sentence.match(decomps[i][0]);
      if (m != null) {
        var reasmbs = decomps[i][1];
        var memflag = decomps[i][2];
        var ri = this.options.randomResponses
          ? 0
          : Math.floor(Math.random() * reasmbs.length);
        if (
          (this.options.randomResponses &&
            this.lastchoice[ruleNumber][i] > ri) ||
          this.lastchoice[ruleNumber][i] == ri
        ) {
          ri = ++this.lastchoice[ruleNumber][i];
          if (ri >= reasmbs.length) {
            ri = 0;
            this.lastchoice[ruleNumber][i] = -1;
          }
        } else {
          this.lastchoice[ruleNumber][i] = ri;
        }
        var rpl = reasmbs[ri];
        if (this.options.debug)
          alert(
            'match:\nkey: ' +
              this.data.keyWords[ruleNumber][0] +
              '\nrank: ' +
              this.data.keyWords[ruleNumber][1] +
              '\ndecomp: ' +
              decomps[i][0] +
              '\nreasmb: ' +
              rpl +
              '\nmemflag: ' +
              memflag,
          );
        if (rpl.search('^goto ') == 0) {
          let ki = this._getRuleIndexByKey(rpl.substring(5));
          if (ki) return this._execRule(ki);
        }
        // substitute positional params (v.1.1: work around lambda function)
        var m1 = paramre.exec(rpl);
        if (m1) {
          var lp = '';
          var rp = rpl;
          while (m1) {
            var param = m[parseInt(m1[1])];
            // postprocess param
            var m2 = this.postExp.exec(param);
            if (m2) {
              var lp2 = '';
              var rp2 = param;
              while (m2) {
                lp2 += rp2.substring(0, m2.index) + this.posts[m2[1]];
                rp2 = rp2.substring(m2.index + m2[0].length);
                m2 = this.postExp.exec(rp2);
              }
              param = lp2 + rp2;
            }
            lp += rp.substring(0, m1.index) + param;
            rp = rp.substring(m1.index + m1[0].length);
            m1 = paramre.exec(rp);
          }
          rpl = lp + rp;
        }
        rpl = this._postTransform(rpl, this.data.postTransforms);
        if (memflag) this.memoryManger.addToMemory(rpl);
        else return rpl;
      }
    }
    return '';
  }

  public init(): void {
    // parse data and convert it from canonical form to internal use
    const synPatterns: Map<string, string> = getPatterns(this.data.synonyms);
    // check for keywords or install empty structure to prevent any errors
    if (!this.data.keyWords) {
      this.data.keyWords = [['###', 0, [['###', []]], 0]];
    }
    // check for elizaQuits and install default if missing
    if (!this.data.farewells) {
      this.data.farewells = [];
    }

    this.convertRulesToRegexes(synPatterns);
    this.data.keyWords.sort(sortKeywords);

    let preExp = {};
    let pres = {};
    let postExp = {};
    let posts = {};
    if (this.data.pres && this.data.pres.length) {
      const res: FixesReturn = this.getFixes(this.data.pres);
    }
    if (this.data.posts && this.data.posts.length) {
      const res: FixesReturn = this.getFixes(this.data.posts);
    }
    this._dataParsed = true;
  }

  public transform(text: string): TransformResponse {
    var rpl = '';
    const parts = unifyTextString(text).split('.');
    for (var i = 0; i < parts.length; i++) {
      var part = parts[i];
      if (part !== '') {
        // check for quit expression
        for (var q = 0; q < this.data.farewells.length; q++) {
          if (this.data.farewells[q] == part) {
            return {
              text: '',
              quit: true,
            };
          }
        }
        var m = this.preExp.exec(part);
        m = this.preExp.reduce((previous:string, current:string)=> current.exec)
        if (m) {
          var lp = '';
          var rp = part;
          while (m) {
            lp += rp.substring(0, m.index) + this.preExp[m[1]];
            rp = rp.substring(m.index + m[0].length);
            m = this.preExp.exec(rp);
          }
          part = lp + rp;
        }
        this.sentence = part;
        // loop trough keywords
        for (let keyword in this.data.keyWords) {
          if (part.search(new RegExp(`\\b ${keyword[0]}\\b`, 'i')) >= 0) {
            rpl = this._execRule(k);
          }
          if (rpl != '') return { text: rpl, quit: false };
        }
        for (var k = 0; k < this.data.keyWords.length; k++) {
          if (
            part.search(
              new RegExp(`\\b${this.data.keyWords[k][0]} \\b`, 'i'),
            ) >= 0
          ) {
            rpl = this._execRule(k);
          }
          if (rpl != '') return { text: rpl, quit: false };
        }
      }
    }
    // nothing matched try mem
    rpl = this.memoryManger.get(this.options.randomResponses ?? false);
    // if nothing in mem, so try xnone
    if (rpl == '') {
      this.sentence = ' ';
      const k:number = this._getRuleIndexByKey('xnone');
      if (k) rpl = this._execRule(k);
    }
    // return reply or default string
    const response: TransformResponse = {
      text: rpl !== '' ? rpl : 'I am at a loss for words.',
      quit: false,
    };
    return response;
  }

  private _postTransform(
    s: string,
    postTransforms: PostTransform[],
    capitalize?: boolean,
  ): string {
    // final cleanings
    s = s.replace(/\s{2,}/g, ' ');
    s = s.replace(/\s+\./g, '.');
    if (postTransforms.length) {
      for (var i = 0; i < postTransforms.length; i += 1) {
        s = s.replace(postTransforms[i].original, postTransforms[i].final);
        postTransforms[i].lastIndex = 0;
      }
    }
    // capitalize first char (v.1.1: work around lambda function)
    if (capitalize) {
      s = this.makeCamelCase(s);
    }
    return s;
  }

  private makeCamelCase(s: string): string {
    var re = /^([a-z])/;
    var m = re.exec(s);
    if (m) s = m[0].toUpperCase() + s.substring(1);
    return s;
  }

  private _getRuleIndexByKey(key: string): number {
    var index = 0;
    this.data.keyWords.find(
      (k: ElizaKeyword, index: number) => k[0] === key && index++,
    ) ;
    return index;
  }

  private getFixes(arr: any[]): FixesReturn {
    let newArr: any[] = [];
    if (arr && arr.length) {
      var a = new Array();
      for (var i = 0; i < arr.length; i += 2) {
        a.push(arr[i]);
        newArr[arr[i]] = arr[i + 1];
      }
      return {
        arr: newArr,
        regExp: new RegExp('\\b(' + a.join('|') + ')\\b'),
      };
    }
    // default (should not match)
    // newArr['####'] = '####';
    return {
      arr: newArr,
      regExp: /####/,
    };
  }

  private convertRulesToRegexes(synPatterns: Map<string, string>): void {
    for (var k = 0; k < this.data.keyWords.length; k++) {
      this.addRule(k, synPatterns);
    }
  }

  private addRule(k: number, synPatterns: Map<string, string>) {
    const rules: DecompEncoding[] = this.data.keyWords[k][2];
    this.data.keyWords[k][3] = k; // save original index for sorting
    for (var i = 0; i < rules.length; i++) {
      var r = rules[i];
      // check mem flag and store it as decomp's element 2
      if (r[0].charAt(0) == '$') {
        var ofs = 1;
        while (r[0].charAt(ofs) === ' ') ofs++;
        r[0] = r[0].substring(ofs);
        r[2] = true;
      } else {
        r[2] = false;
      }
      let m: RegExpExecArray = this.expandSynonyms(r, synPatterns);
      m = this.expandAsteriskExpressions(r, m);
      const wsre: RegExp = /\s+/g;
      r[0] = r[0].replace(wsre, '\\s+');
      wsre.lastIndex = 0;
    }
  }

  private expandSynonyms(
    r: DecompEncoding,
    synPatterns: Map<string, string>,
  ): RegExpExecArray {
    const sre: RegExp = /@(\S+)/;
    var m: RegExpExecArray = sanitizeExec(sre.exec(r[0]));
    while (m) {
      const sp = synPatterns.get(m[1]) ?? m[1];
      r[0] =
        r[0].substring(0, m.index) + sp + r[0].substring(m.index + m[0].length);
      m = sanitizeExec(sre.exec(r[0]));
    }
    return m;
  }

  private expandAsteriskExpressions(
    r: DecompEncoding,
    m: RegExpExecArray,
  ): RegExpExecArray {
    const are3 = /^\s*\*\s*$/;
    // early return
    if (are3.test(r[0])) {
      r[0] = '\\s*(.*)\\s*';
      return m;
    }
    // are
    const are = /(\S)\s*\*\s*(\S)/;
    m = sanitizeExec(are.exec(r[0]));
    if (m) {
      var lp = '';
      var rp = r[0];
      while (m) {
        lp += rp.substring(0, m.index + 1);
        if (m[1] != ')') lp += '\\b';
        lp += '\\s*(.*)\\s*';
        if (m[2] != '(' && m[2] != '\\') lp += '\\b';
        lp += m[2];
        rp = rp.substring(m.index + m[0].length);
        m = sanitizeExec(are.exec(rp));
      }
      r[0] = lp + rp;
    }
    // are 1
    const are1 = /^\s*\*\s*(\S)/;
    m = sanitizeExec(are1.exec(r[0]));
    if (m) {
      var lp = '\\s*(.*)\\s*';
      if (m[1] != ')' && m[1] != '\\') lp += '\\b';
      r[0] = lp + r[0].substring(m.index - 1 + m[0].length);
    }

    // are 2
    const are2 = /(\S)\s*\*\s*$/;
    m = sanitizeExec(are2.exec(r[0]));
    if (m) {
      var lp = r[0].substring(0, m.index + 1);
      if (m[1] != '(') lp += '\\b';
      r[0] = lp + '\\s*(.*)\\s*';
    }
    return m;
  }
}
