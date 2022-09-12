import { FixesReturn } from './types/FixesReturn';
import { getPatterns } from './transformers/getPatterns';
import { sanitizeExec } from './transformers/sanitizeExec';
import { ElizaData } from './types/ElizaData';
import { DecompEncoding, ElizaKeyword } from './types/Encoding';
import { PostTransform } from './types/PostTransform';
import { sortKeywords } from './utils/sortKeywords';
import { unifyTextString } from './transformers/unifyTextString';

export default class TextTransformer {
  constructor() {}

  static execRule(data: ElizaData, random: boolean, debug?: boolean): string {
    var rule = data.keyWords[k];
    var decomps = rule[2];
    var paramre = /\(([0-9]+)\)/;
    for (var i = 0; i < decomps.length; i++) {
      var m = this.sentence.match(decomps[i][0]);
      if (m != null) {
        var reasmbs = decomps[i][1];
        var memflag = decomps[i][2];
        var ri = random ? 0 : Math.floor(Math.random() * reasmbs.length);
        if (
          (random && this.lastchoice[k][i] > ri) ||
          this.lastchoice[k][i] == ri
        ) {
          ri = ++this.lastchoice[k][i];
          if (ri >= reasmbs.length) {
            ri = 0;
            this.lastchoice[k][i] = -1;
          }
        } else {
          this.lastchoice[k][i] = ri;
        }
        var rpl = reasmbs[ri];
        if (this.debug)
          alert(
            'match:\nkey: ' +
              data.keyWords[k][0] +
              '\nrank: ' +
              data.keyWords[k][1] +
              '\ndecomp: ' +
              decomps[i][0] +
              '\nreasmb: ' +
              rpl +
              '\nmemflag: ' +
              memflag,
          );
        if (rpl.search('^goto ', 'i') == 0) {
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
        rpl = this._postTransform(rpl, data.postTransforms);
        if (memflag) this.memoryManger.addToMemory(rpl);
        else return rpl;
      }
    }
    return '';
  }

  _postTransform(
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

  transform(text): string {
    var rpl = '';
    this.quit = false;
    // unify text string
    text = unifyTextString(text);
    // split text in part sentences and loop through them
    var parts = text.split('.');
    for (var i = 0; i < parts.length; i++) {
      var part = parts[i];
      if (part !== '') {
        // check for quit expression
        for (var q = 0; q < this.data.farewells.length; q++) {
          if (this.data.farewells[q] == part) {
            this.quit = true;
            return this.getFinal();
          }
        }
        var m = this.preExp.exec(part);
        if (m) {
          var lp = '';
          var rp = part;
          while (m) {
            lp += rp.substring(0, m.index) + this.pres[m[1]];
            rp = rp.substring(m.index + m[0].length);
            m = this.preExp.exec(rp);
          }
          part = lp + rp;
        }
        this.sentence = part;
        // loop trough keywords
        for (let keyword in this.data.keyWords) {
          if (part.search(new RegExp('\\b' + keyword[0] + '\\b', 'i')) >= 0) {
            rpl = this._execRule(k);
          }
          if (rpl != '') return rpl;
        }
        for (var k = 0; k < this.data.keyWords.length; k++) {
          if (
            part.search(
              new RegExp('\\b' + this.data.keyWords[k][0] + '\\b', 'i'),
            ) >= 0
          ) {
            rpl = this._execRule(k);
          }
          if (rpl != '') return rpl;
        }
      }
    }
    // nothing matched try mem
    rpl = this.memoryManger.get(this.options.randomResponses);
    // if nothing in mem, so try xnone
    if (rpl == '') {
      this.sentence = ' ';
      const k = this._getRuleIndexByKey('xnone');
      if (k) rpl = this._execRule(k);
    }
    // return reply or default string
    return rpl != '' ? rpl : 'I am at a loss for words.';
  }

  _getRuleIndexByKey(key): ElizaKeyword | undefined {
    return this.data.keyWords.find((k: ElizaKeyword) => k[0] === key);
  }

  private getFixes(arr: any[]): FixesReturn {
    let newArr = [];
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
    newArr['####'] = '####';
    return {
      arr: newArr,
      regExp: /####/,
    };
  }

  private _init(): void {
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

    var i = this.rulesToRegexes(synPatterns);
    this.data.keyWords.sort(sortKeywords);

    let preExp = {};
    let pres = {};
    let postExp = {};
    let posts = {};
    if (this.data.pres && this.data.pres.length) {
      const res: FixesReturn = this.getFixes(this.data.pres);
    }
    if (this.data.posts && this.data.posts.length) {
      const res = this.getFixes(this.data.posts);
    }
    this._dataParsed = true;
  }

  private rulesToRegexes(synPatterns: Map<string, string>) {
    for (var k = 0; k < this.data.keyWords.length; k++) {
      var rules = this.data.keyWords[k][2];
      this.data.keyWords[k][3] = k; // save original index for sorting
      for (var i = 0; i < rules.length; i++) {
        var r = rules[i];
        // check mem flag and store it as decomp's element 2
        if (r[0].charAt(0) == '$') {
          var ofs = 1;
          while (r[0].charAt[ofs] == ' ') ofs++;
          r[0] = r[0].substring(ofs);
          r[2] = true;
        } else {
          r[2] = false;
        }
        let m: RegExpExecArray = this.expandSynonyms(r, synPatterns);
        m = this.expandAsteriskExpressions(r, m);
        const wsre = /\s+/g;
        r[0] = r[0].replace(wsre, '\\s+');
        wsre.lastIndex = 0;
      }
    }
  }

  private expandSynonyms(
    r: DecompEncoding,
    synPatterns: Map<string, string>,
  ): RegExpExecArray {
    const sre: RegExp = /@(\S+)/;
    var m: RegExpExecArray = sanitizeExec(sre.exec(r[0]));
    while (m) {
      const sp = synPatterns[m[1]] ? synPatterns[m[1]] : m[1];
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
