import { PostTransform } from '../types/PostTransform';

export const elizaPostTransforms: PostTransform[] = [
  { original: / old old/g, final: ' old', lastIndex: 0 },
  { original: /\bthey were( not)? me\b/g, final: 'it was$1 me', lastIndex: 0 },
  { original: /\bthey are( not)? me\b/g, final: 'it is$1 me', lastIndex: 0 },
  { original: /Are they( always)? me\b/, final: 'it is$1 me', lastIndex: 0 },
  {
    original: /\bthat your( own)? (\w+)( now)? \?/,
    final: 'that you have your$1 $2 ?',
    lastIndex: 0,
  },
  { original: /\bI to have (\w+)/, final: 'I have $1', lastIndex: 0 },
  {
    original: /Earlier you said your( own)? (\w+)( now)?\./,
    final: 'Earlier you talked about your} $2.',
    lastIndex: 0,
  },
];
