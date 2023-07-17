export function sum(input: number[]): number {
  return input.reduce((acc: number, c: number) => acc + c, 0);
}

export function sameNumberOccurences(
  input: number[],
  occurences: number,
  value: number,
): boolean {
  return input.filter((x) => x === value).length === occurences;
}

export function allSameNumber(input: number[], value: number): boolean {
  return sameNumberOccurences(input, input.length, value);
}

/**
 * @param input - an array of elements which will split to own set
 * @param setsCount - count of distinguishable sets (input's elements)
 * @param commonCardinality - cardinality of an every set
 */
export function isSameCardinalityForSameElementsSets(
  input: number[],
  setsCount: number,
  commonCardinality: number,
): boolean {
  // NOTE: index signature => https://stackoverflow.com/a/57667278/6493531
  const setsCounter: { [key: string]: number } = input.reduce(
    (acc: { [key: string]: number }, c) => ({ ...acc, [c]: (acc[c] || 0) + 1 }),
    {},
  );
  const sets = Object.keys(setsCounter);
  return sets.length === setsCount &&
    sets.filter((sk) => setsCounter[sk] === commonCardinality).length ===
      sets.length;
}

export function containsSubarray(arr: number[], subArr: number[]): boolean {
  for (let i = 0; i < subArr.length; i += 1) {
    if (!arr.includes(subArr[i])) {
      return false;
    }
  }
  return true;
}
