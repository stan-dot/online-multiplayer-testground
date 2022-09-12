export function unifyTextString(text: any) {
  text = text.toLowerCase();
  text = text.replace(/@#\$%\^&\*\(\)_\+=~`\{\[\}\]\|:;<>\/\\\t/g, ' ');
  text = text.replace(/\s+-+\s+/g, '.');
  text = text.replace(/\s*[,\.\?!;]+\s*/g, '.');
  text = text.replace(/\s*\bbut\b\s*/g, '.');
  text = text.replace(/\s{2,}/g, ' ');
  return text;
}
