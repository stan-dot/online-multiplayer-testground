export function sanitizeExec(r: RegExpExecArray | null): RegExpExecArray {
  if (r === null) {
    let arr: string[] = [];
    let a2 = arr as RegExpExecArray;
    a2.input = '';
    a2.index = -1;
    return a2;
  }
  return r!;
}
