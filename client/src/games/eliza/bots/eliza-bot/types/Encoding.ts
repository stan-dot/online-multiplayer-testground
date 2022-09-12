export type ElizaKeyword = [
  name: string,
  rank: number,
  mappings: DecompEncoding[],
  originalIndex: number,
];
export type DecompEncoding = [
  name: string,
  responses: string[],
  memoryFlag?: boolean,
];
