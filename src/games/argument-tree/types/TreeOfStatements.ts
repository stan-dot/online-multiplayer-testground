export type Statement = {
  title: string;
  id: string;
  supportingChildren: Statement[];
  opposingChildren: Statement[];
};

export type TreeOfStatements = {
  statements: Statement[];
};
