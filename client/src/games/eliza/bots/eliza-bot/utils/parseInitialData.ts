import { ElizaData } from '../types/ElizaData';
import { DecompEncoding, ElizaKeyword } from '../types/Encoding';
import { Synonym } from '../types/Synonym';
import { sortKeywords } from './sortKeywords';

export function parseInitialData(data: ElizaData): ElizaData {
  // parse data and convert it from canonical form to internal use
  const synPatterns: Map<string, string> = getPatterns(data.synonyms);
  // check for keywords or install empty structure to prevent any errors
  if (data.keyWords) {
    data.keyWords = [['###', 0, [['###', []]], 0]];
  }
  data.keyWords.forEach((v, i) => {
    addRule(data.keyWords, i, synPatterns);
  });
  convertRulesToRegexes(data.keyWords, synPatterns);
  data.keyWords.sort(sortKeywords);
  // check for elizaQuits and install default if missing
  if (!data.quits) {
    data.quits = [];
  }
  if (!data.pres) {
    data.pres = [];
  }
  return data;
}

/**
 * tbh that might not be the best, maybe it should return m or rule
 * @param keywords
 * @param k
 * @param synPatterns
 */
function addRule(
  keywords: ElizaKeyword[],
  k: number,
  synPatterns: Map<string, string>,
): void {
  const rules: DecompEncoding[] = keywords[k][2];
  keywords[k][3] = k; // save original index for sorting
  rules.forEach((rule: DecompEncoding) => {
    // check mem flag and store it as decomp's element 2
    if (rule[0].charAt(0) == '$') {
      var ofs = 1;
      while (rule[0].charAt(ofs) === ' ') ofs++;
      rule[0] = rule[0].substring(ofs);
      rule[2] = true;
    } else {
      rule[2] = false;
    }
    let m: RegExpExecArray = expandSynonyms(rule, synPatterns);
    m = expandAsteriskExpressions(rule, m);
    const wsre: RegExp = /\s+/g;
    rule[0] = rule[0].replace(wsre, '\\s+');
    wsre.lastIndex = 0;
  });
}

/**
 * only run during init
 * @param synPatterns
 */
function convertRulesToRegexes(
  keywords: ElizaKeyword[],
  synPatterns: Map<string, string>,
): void {
  keywords.forEach((v, i) => {
    addRule(keywords, i, synPatterns);
  });
}

function expandSynonyms(
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

function expandAsteriskExpressions(
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
    var leftPart = '';
    var rightPart = r[0];
    while (m) {
      leftPart += rightPart.substring(0, m.index + 1);
      if (m[1] != ')') leftPart += '\\b';
      leftPart += '\\s*(.*)\\s*';
      if (m[2] != '(' && m[2] != '\\') leftPart += '\\b';
      leftPart += m[2];
      rightPart = rightPart.substring(m.index + m[0].length);
      m = sanitizeExec(are.exec(rightPart));
    }
    r[0] = leftPart + rightPart;
  }
  // are 1
  const are1 = /^\s*\*\s*(\S)/;
  m = sanitizeExec(are1.exec(r[0]));
  if (m) {
    var leftPart = '\\s*(.*)\\s*';
    if (m[1] != ')' && m[1] != '\\') leftPart += '\\b';
    r[0] = leftPart + r[0].substring(m.index - 1 + m[0].length);
  }
  // are 2
  const are2 = /(\S)\s*\*\s*$/;
  m = sanitizeExec(are2.exec(r[0]));
  if (m) {
    var leftPart = r[0].substring(0, m.index + 1);
    if (m[1] != '(') leftPart += '\\b';
    r[0] = leftPart + '\\s*(.*)\\s*';
  }
  return m;
}

function sanitizeExec(r: RegExpExecArray | null): RegExpExecArray {
  if (r === null) {
    let arr: string[] = [];
    let a2 = arr as RegExpExecArray;
    a2.input = '';
    a2.index = -1;
    return a2;
  }
  return r!;
}

function getPatterns(arr: Synonym[]): Map<string, string> {
  if (!arr) {
    return new Map();
  }
  const patterns: [string, string][] = arr.map((s: Synonym) => [
    s[0],
    `(${s[0]}|${s[1].join('|')})`,
  ]);
  return new Map(patterns);
}
