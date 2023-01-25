export abstract class Bot {
  readonly name: string;
  readonly description: string;
  constructor(name: string, description?: string) {
    this.name = name;
    this.description = description ?? 'No elaborate description here';
  }
  public getResponse(s: string): string | Promise<string> {
    return s;
  }
  public getDescription(): string{
    return this.description;
  }
}
