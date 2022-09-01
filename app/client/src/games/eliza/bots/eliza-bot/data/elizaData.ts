// https://github.com/PatInshuti/ELIZA-api/blob/main/node_modules/eliza-as-promised/lib/elizadata.js

import { Synonym } from '../types/Synonym';
import { UnaryTransformer } from './UnaryTransformer';

export const elizaInitials: string[] = [
  'How do you do.  Please tell me your problem.',
  // additions (not original)
  "Please tell me what's been bothering you.",
  'Is something troubling you ?',
];

export const elizaFinals: string[] = [
  'Goodbye.  It was nice talking to you.',
  // additions (not original)
  'Goodbye.  This was really a nice talk.',
  "Goodbye.  I'm looking forward to our next session.",
  "This was a good session, wasn't it -- but time is over now.   Goodbye.",
  'Maybe we could discuss this moreover in our next session ?   Goodbye.',
];

export const elizaQuits: string[] = ['bye', 'goodbye', 'done', 'exit', 'quit'];

export const elizaPres: UnaryTransformer[] = [
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

export const elizaPosts: UnaryTransformer[] = [
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

export const elizaSynons: Synonym[] = [
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
