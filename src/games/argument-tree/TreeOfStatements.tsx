
export type Statement = {
  title: string;
  id: string;
  supportingChildren: string[];
  opposingChildren: string[];
};

export type TreeOfStatements = {
  statements: Statement[];
};
