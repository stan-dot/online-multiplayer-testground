type PossibleFocus = "nature" | "party" | "relax" | "sustainable";

type Search = {
  focus: PossibleFocus;
  stars: number;
  price: number;
  persons: number;
  vaccinationsNeeded: string[];
  language: string;
  lengthDays: number;
};
