import { ElizaKeyword } from './Encoding';
import { UnaryTransformer } from './UnaryTransformer';
import { PostTransform } from './PostTransform';
import { Synonym } from './Synonym';

export type ElizaData = {
  keyWords: ElizaKeyword[];
  postTransforms: PostTransform[];
  synonyms: Synonym[];
  finals: string[];
  welcomes: string[];
  quits: string[];
  posts: UnaryTransformer[];
  pres: UnaryTransformer[];
};
