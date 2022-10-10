import { ladders, snakes } from "./constants";

export class Player {
  id: number;
  name: string;
  pos: number;
  img: string;
  constructor(id: any, name: any, pos: any, img: any) {
    this.id = id;
    this.name = name;
    this.pos = pos;
    this.img = img;
  }

  public updatePos(num: number): void {
    if (this.pos + num <= 99) {
      this.pos += num;
      this.pos = this.newPositionAfterTranslation(this.pos + 1) - 1;
    }
  }

  public draw(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
    const side = canvas.width / 10;
    const offsetX = side / 2;
    const offsetY = side / 2 + 20;

    const xPos = this.getX(canvas, side, offsetX);
    const yPos = this.getY(canvas, side, offsetY);

    let image = new Image();
    image.src = this.img;
    ctx.drawImage(image, xPos, yPos, 30, 40);
  }


  private getX(canvas: HTMLCanvasElement, side: number, offset: number): number {
    return Math.floor(this.pos / 10) % 2 == 0
      ? (this.pos % 10) * side - 15 + offset
      : canvas.width - ((this.pos % 10) * side + offset + 15);
  }

  private getY(canvas: HTMLCanvasElement, side: number, offset: number): number {
    return canvas.height - (Math.floor(this.pos / 10) * side + offset);
  }

  private newPositionAfterTranslation(pos: number): number {
    let newPos = pos;

    for (let i = 0; i < ladders.length; i++) {
      if (ladders[i][0] == pos) {
        newPos = ladders[i][1];
        break;
      }
    }

    for (let i = 0; i < snakes.length; i++) {
      if (snakes[i][0] == pos) {
        newPos = snakes[i][1];
        break;
      }
    }

    return newPos;
  }
}
