export function unifyTextString(text: string): string {
  return text
    .toLowerCase()
    .replace(/@#\$%\^&\*\(\)_\+=~`\{\[\}\]\|:;<>\/\\\t/g, ' ')
    .replace(/\s+-+\s+/g, '.')
    .replace(/\s*[,\.\?!;]+\s*/g, '.')
    .replace(/\s*\bbut\b\s*/g, '.')
    .replace(/\s{2,}/g, ' ');
}
