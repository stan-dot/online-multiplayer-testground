import { Statement } from './TopicTypes';

export type StatementModificationCallbacksObject = {
  delete: (n: Statement) => void;
  update: (n: Statement) => void;
  add: (n: string) => Statement;
};
