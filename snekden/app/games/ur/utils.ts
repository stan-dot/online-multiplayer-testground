/**
0,6.25
1,25
2,37.5
3,25
4,6.25
*/

export function getDiceRoll(): number {
  const d = 100 * Math.random();
  if (d < 6.25) return 0;
  if (d < 31.25) return 1;
  if (d < 68.75) return 2;
  if (d < 93.75) return 3;
  return 4;
}