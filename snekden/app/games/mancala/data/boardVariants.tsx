import { BoardVariant } from '../types/BoardVariant';

const long: BoardVariant = {
  name: 'long',
  front: 8,
  back: 8,
  fillFrontFieldsDivision: 8,
  fullBack: false,
  amount: 4
};
const rapid: BoardVariant = {
  name: 'rapid',
  front: 6,
  back: 6,
  fillFrontFieldsDivision: 2,
  fullBack: false,
  amount: 3
};
const defenseVariant: BoardVariant = {
  name: 'defense',
  front: 2,
  back: 4,
  fillFrontFieldsDivision: 2,
  fullBack: true,
  amount: 0
};
const variantMini: BoardVariant = {
  name: 'mini',
  front: 2,
  back: 2,
  fillFrontFieldsDivision: 2,
  fullBack: false,
  amount: 0
};


const DEFAULT_BOARD_GENERATION: BoardVariant = {
  name: 'standard',
  front: 8,
  back: 8,
  fillFrontFieldsDivision: 2,
  fullBack: true,
  amount: 2,
};

export const boardVariants: BoardVariant[] = [DEFAULT_BOARD_GENERATION, variantMini, defenseVariant, rapid, long];
