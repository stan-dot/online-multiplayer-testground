export function makeCamelCase(s: string): string {
  const re: RegExp = /^([a-z])/;
  const m: RegExpExecArray | null = re.exec(s);
  if (m) s = m[0].toUpperCase() + s.substring(1);
  return s;
}
