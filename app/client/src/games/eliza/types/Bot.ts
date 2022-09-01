export abstract class Bot {
  readonly name: string;
  constructor(name: string) {
    this.name = name;
  }
  public getResponse(s: string): string {
    return s;
  }
}
