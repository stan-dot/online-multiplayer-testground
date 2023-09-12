type PossibleFocus = "nature" | "party" | "relax" | "sustainable";

export type HolidaySearch = {
  focus: PossibleFocus;
  stars: number;
  price: number;
  persons: number;
  vaccinationsNeeded: string[];
  language: string;
  lengthDays: number;
};
