
// all games would need to implement this
export type GameCard = {
  componentName: string;
  folder: string;
  img?: HTMLImageElement;
  options?: {
    usesCanvas?: boolean
    usesSockets?: boolean
    canvasWidth?: number
    canvasHeight?: number
  }
}