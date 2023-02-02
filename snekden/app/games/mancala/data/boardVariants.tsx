import { DEFAULT_BOARD_GENERATION } from './defaults';
import { BoardGeneratorVariant } from '../types/BoardGeneratorVariant';

const long: BoardGeneratorVariant = {
  name: 'long',
  front: 8,
  back: 8,
  fillFrontFieldsDivision: 8,
  fullBack: false,
  amount: 4
};
const rapid: BoardGeneratorVariant = {
  name: 'rapid',
  front: 6,
  back: 6,
  fillFrontFieldsDivision: 2,
  fullBack: false,
  amount: 3
};
const defenseVariant: BoardGeneratorVariant = {
  name: 'defense',
  front: 2,
  back: 4,
  fillFrontFieldsDivision: 2,
  fullBack: true,
  amount: 0
};
const variantMini: BoardGeneratorVariant = {
  name: 'mini',
  front: 2,
  back: 2,
  fillFrontFieldsDivision: 2,
  fullBack: false,
  amount: 0
};
export const boardVariants: BoardGeneratorVariant[] = [DEFAULT_BOARD_GENERATION, variantMini, defenseVariant, rapid, long];
