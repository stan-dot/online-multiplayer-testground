import { Synonym } from '../types/Synonym';

export function getPatterns(arr: Synonym[]): Map<string, string> {
  if (!arr) {
    return new Map();
  }
  const patterns: [string, string][] = arr.map((s: Synonym) => [
    s[0],
    `(${s[0]}|${s[1].join('|')})`,
  ]);
  return new Map(patterns);
}
