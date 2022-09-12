import { Circle } from './Circle';

const canvas: HTMLCanvasElement = document.getElementById(
  'canvas',
) as HTMLCanvasElement;

const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;

const circles: Circle[] = [
  {
    id: 'first one',
    x: 40,
    y: 40,
    radius: 10,
    color: 'rgb(255,0,0)',
  },
  {
    id: 'second one',
    x: 70,
    y: 70,
    radius: 10,
    color: 'rgb(0,255,0)',
  },
];

circles.forEach(circle => {
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = circle.color;
  ctx.fill();
});

function isIntersect(point: Point, circle: Circle): boolean {
  return (
    Math.sqrt((point.x - circle.x) ** 2 + (point.y - circle.y) ** 2) <
    circle.radius
  );
}

type Point = {
  x: number;
  y: number;
};

canvas.addEventListener('click', (e: MouseEvent) => {
  const pos: Point = {
    x: e.clientX,
    y: e.clientY,
  };
  circles.forEach(circle => {
    if (isIntersect(pos, circle)) {
      alert('click on circle: ' + circle.id);
    }
  });
});
