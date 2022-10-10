export default class MemoryManager {
  private memory: string[];
  private size: number;
  constructor(size: number) {
    this.memory = [];
    this.size = size;
  }
  public addToMemory(s: string): void {
    this.memory.push(s);
    if (this.memory.length > this.size) {
      this.memory.shift();
    }
  }

  public get(random: boolean): string {
    if (this.memory.length === 0) {
      return '';
    }

    if (random) {
      const n = Math.floor(Math.random() * this.memory.length);
      const rpl = this.memory[n];
      for (var i = n + 1; i < this.memory.length; i++)
        this.memory[i - 1] = this.memory[i];
      this.memory.length--;
      return rpl;
    }

    return this.memory.shift() ?? '';
  }

  public reset(): void{
    this.memory = [];
  }
}
