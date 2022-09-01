// regexp/replacement pairs to be performed as final cleanings
// here: cleanings for multiple bots talking to each other

export type PostTransform = {
  original: RegExp;
  final: string;
  lastIndex: number;
};
