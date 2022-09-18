// https://github.com/PatInshuti/ELIZA-api/blob/main/node_modules/eliza-as-promised/lib/elizadata.js

import { Synonym } from '../types/Synonym';
import { UnaryTransformer } from '../types/UnaryTransformer';
import { PostTransform } from '../types/PostTransform';
import { elizaKeywords } from './elizaKeywords';
import { ElizaData } from '../types/ElizaData';

const elizaPostTransforms: PostTransform[] = [
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

const elizaInitials: string[] = [
  'How do you do.  Please tell me your problem.',
  // additions (not original)
  "Please tell me what's been bothering you.",
  'Is something troubling you ?',
];

const elizaFinals: string[] = [
  'Goodbye.  It was nice talking to you.',
  // additions (not original)
  'Goodbye.  This was really a nice talk.',
  "Goodbye.  I'm looking forward to our next session.",
  "This was a good session, wasn't it -- but time is over now.   Goodbye.",
  'Maybe we could discuss this moreover in our next session ?   Goodbye.',
];

const elizaQuits: string[] = ['bye', 'goodbye', 'done', 'exit', 'quit'];

const elizaPres: UnaryTransformer[] = [
  ['dont', "don't"],
  ['cant', "can't"],
  ['wont', "won't"],
  ['recollect', 'remember'],
  ['recall', 'remember'],
  ['dreamt', 'dreamed'],
  ['dreams', 'dream'],
  ['maybe', 'perhaps'],
  ['certainly', 'yes'],
  ['machine', 'computer'],
  ['machines', 'computer'],
  ['computers', 'computer'],
  ['were', 'was'],
  ["you're", 'you are'],
  ["i'm", 'i am'],
  ['same', 'alike'],
  ['identical', 'alike'],
  ['equivalent', 'alike'],
];

const elizaPosts: UnaryTransformer[] = [
  ['am', 'are'],
  ['your', 'my'],
  ['me', 'you'],
  ['myself', 'yourself'],
  ['yourself', 'myself'],
  ['i', 'you'],
  ['you', 'I'],
  ['my', 'your'],
  ["i'm", 'you are'],
];

const elizaSynons: Synonym[] = [
  ['be', ['am', 'is', 'are', 'was']],
  ['belief', ['feel', 'think', 'believe', 'wish']],
  ['cannot', ["can't"]],
  ['desire', ['want', 'need']],
  ['everyone', ['everybody', 'nobody', 'noone']],
  [
    'family',
    [
      'mother',
      'mom',
      'father',
      'dad',
      'sister',
      'brother',
      'wife',
      'children',
      'child',
    ],
  ],
  ['happy', ['elated', 'glad', 'better']],
  ['sad', ['unhappy', 'depressed', 'sick']],
];

export const MAIN_DATA: ElizaData = {
  keyWords: elizaKeywords,
  postTransforms: elizaPostTransforms,
  synonyms: elizaSynons,
  finals: elizaFinals,
  welcomes: elizaInitials,
  quits: elizaQuits,
  posts: elizaPosts,
  pres: elizaPres,
};
