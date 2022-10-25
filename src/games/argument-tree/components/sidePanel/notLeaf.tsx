import { Statement } from "../../types/TreeOfStatements";


export function notLeaf(s: Statement): boolean {
  return s.opposingChildren.length > 0 || s.supportingChildren.length > 0;
}
