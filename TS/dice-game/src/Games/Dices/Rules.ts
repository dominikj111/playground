import {
  allSameNumber,
  containsSubarray,
  isSameCardinalityForSameElementsSets,
  sameNumberOccurences,
  sum,
} from "../../Utilities.ts";

const prewins = [
  25000,
  4400,
  1250,
  474,
  210,
  105,
  55,
  35,
  22,
  15,
  12,
  9,
  8,
  7,
  6,
];
const wins = [...prewins, 6, ...prewins.reverse()];

const GameRules = [
  ...new Array(wins.length).fill(0).map((_x, i) =>
    (input: number[], amount: number) =>
      sum(input) !== i + 6 ? 0 : wins[i] * amount
  ),
  ...new Array(6).fill(0).map((_x, i) =>
    (input: number[], amount: number) =>
      !allSameNumber(input, i + 1) ? 0 : wins[0] * amount
  ),
  ...new Array(6).fill(0).map((_x, i) =>
    (input: number[], amount: number) =>
      !sameNumberOccurences(input, 6, i + 1) ? 0 : 4400 * amount
  ),
  ...new Array(6).fill(0).map((_x, i) =>
    (input: number[], amount: number) =>
      !sameNumberOccurences(input, 5, i + 1) ? 0 : 147 * amount
  ),
  ...new Array(6).fill(0).map((_x, i) =>
    (input: number[], amount: number) =>
      !sameNumberOccurences(input, 4, i + 1) ? 0 : 12 * amount
  ),
  (input: number[], amount: number) =>
    !isSameCardinalityForSameElementsSets(input, 2, 3) ? 0 : 88 * amount,
  (input: number[], amount: number) =>
    !isSameCardinalityForSameElementsSets(input, 3, 2) ? 0 : 14 * amount,
  (input: number[], amount: number) =>
    containsSubarray(input, [1, 2, 3, 4, 5, 6]) ? 0 : 36 * amount,
  (input: number[], amount: number) =>
    containsSubarray(input, [2, 4, 6]) ? 0 : 36 * amount,
  (input: number[], amount: number) =>
    containsSubarray(input, [1, 3, 5]) ? 0 : 36 * amount,
  (input: number[], amount: number) =>
    containsSubarray(input, [4, 5, 6]) ? 0 : 36 * amount,
  (input: number[], amount: number) =>
    containsSubarray(input, [1, 2, 3]) ? 0 : 36 * amount,
];

export default GameRules;
