import { SegmentChecker } from './SegmentChecker';
import { c1, c2, getStartingPointForRectangleText } from '../data/constants';

// todo to react to callbacks will need full Statement. this might be remade into an interface
export class Shape {
  public color: string;
  public points: number[][];
  public text: string | null;
  private segments: SegmentChecker[] = [];
  constructor(points: number[][], text?: string, color?: string) {
    this.points = points;
    this.text = text ?? null;
    this.color = color ?? c1;
    const unsanitizedSegments: (SegmentChecker | null)[] = this.points.map(
      (v: number[], index: number) => this.addSegmentChecker(v, index),
    );
    this.segments = unsanitizedSegments.filter(
      segment => segment !== null,
    ) as SegmentChecker[];
  }

  /*
   * For each line segment comprising the shape, compute whether a ray
   * originating at the point clicked and going in the -y direction
   * would intersect that segment. For symmetry, include the starting
   * point of the segment but exclude the finishing point. If the number
   * of intersections is odd, then the point is interior to the shape.
   * If a segment is vertical, assume it doesn't intersect.
   */
  private addSegmentChecker(
    point: number[],
    index: number,
  ): SegmentChecker | null {
    let x1 = point[0];
    let y1 = point[1];
    let next = this.points[(index + 1) % this.points.length];
    let x2 = next[0];
    let y2 = next[1];
    if (x1 !== x2) {
      const newSegment: SegmentChecker = (x: number, y: number) => {
        const t = (x - x1) / (x2 - x1);
        return t >= 0 && t < 1 && y > t * y2 + (1 - t) * y1;
      };
      return newSegment;
    }
    return null;
  }

  public toggle(): void {
    this.color = this.color === c1 ? c2 : c1;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    this.points.map((point, index) => {
      if (index === 0) {
        ctx.moveTo(point[0], point[1]);
      } else {
        ctx.lineTo(point[0], point[1]);
      }
    });
    ctx.fill();
    const fontSize = 12;
    ctx.font = `${fontSize}px Arial`;

    if (this.text) {
      const startingPoint: number[] = getStartingPointForRectangleText(
        this.points,
      );
      ctx.textAlign = 'center';
      ctx.fillText(this.text, startingPoint[0], startingPoint[1]);
      // ctx.fillText(this.text, 50, 50);
    }
    this.toggle();
  }

  /**
   *
   * @param arr 2 numbers - pixels of how much to offset
   */
  public clone(offset: number[]): Shape {
    const newPoints: number[][] = this.points.map((v: number[]) => {
      return [v[0] + offset[0], v[1] + offset[1]];
    });
    return new Shape(newPoints);
  }

  public interior(x: number, y: number): boolean {
    let z = 0;
    this.segments.map(checker => {
      if (checker(x, y)) z++;
    });
    return z % 2 === 1;
  }
}
