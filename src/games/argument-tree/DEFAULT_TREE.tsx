import { Statement, TreeOfStatements } from "./TreeOfStatements";

export const DEFAULT_TREE: TreeOfStatements = {
  statements: [

    {
      title: 'The clock has been showing 1:30 for some time now.',
      id: '2',
      supportingChildren: ['3'],
      opposingChildren: [],
    },
    {
      title: 'It must be different time than 1:30',
      id: '1',
      supportingChildren: ['2'],
      opposingChildren: ['4'],
    },
    {
      title: "I've been observing this clock for a couple of hourse",
      id: '3',
      supportingChildren: [],
      opposingChildren: [],
    },
    {
      title: 'even a broken clock is right twice a day',
      id: '4',
      supportingChildren: [],
      opposingChildren: [],
    },

  ],
};
