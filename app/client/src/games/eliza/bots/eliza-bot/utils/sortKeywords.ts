import { ElizaKeyword } from '../types/Encoding';

// sort keywords by rank (highest first)
export function sortKeywords(a: ElizaKeyword, b: ElizaKeyword) {
  // sort by rank
  if (a[1] > b[1]) return -1;
  else if (a[1] < b[1]) return 1;
  // or original index
  else if (a[3] > b[3]) return 1;
  else if (a[3] < b[3]) return -1;
  else return 0;
}
