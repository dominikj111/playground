
/**
 * Middle Earth is about to go to war. The forces of good will have many battles with the forces of evil.
 * Different races will certainly be involved. Each race has a certain worth when battling against others.
 * On the side of good we have the following races, with their associated worth:
 *
 * Hobbits: 1
 * Men: 2
 * Elves: 3
 * Dwarves: 3
 * Eagles: 4
 * Wizards: 10
 *
 * On the side of evil we have:
 *
 * Orcs: 1
 * Men: 2
 * Wargs: 2
 * Goblins: 2
 * Uruk Hai: 3
 * Trolls: 5
 * Wizards: 10
 *
 * Although weather, location, supplies and valor play a part in any battle, if you add up the worth of the side of good and compare it with the worth of the side of evil,
 * the side with the larger worth will tend to win.
 *
 * Thus, given the count of each of the races on the side of good, followed by the count of each of the races on the side of evil,
 * determine which side wins.
 *
 * Input:
 *
 * The function will be given two parameters. Each parameter will be a string of multiple integers separated by a single space.
 * Each string will contain the count of each race on the side of good and evil.
 * The first parameter will contain the count of each race on the side of good in the following order:
 * Hobbits, Men, Elves, Dwarves, Eagles, Wizards.
 *
 * The second parameter will contain the count of each race on the side of evil in the following order:
 * Orcs, Men, Wargs, Goblins, Uruk Hai, Trolls, Wizards.
 *
 * All values are non-negative integers.
 * The resulting sum of the worth for each side will not exceed the limit of a 32-bit integer.
 *
 * Output:
 * Return "Battle Result: Good triumphs over Evil" if good wins,
 * "Battle Result: Evil eradicates all trace of Good" if evil wins,
 * or "Battle Result: No victor on this battle field" if it ends in a tie.
 *
 */

const GOOD_BOYS: [u8; 6] = [
	1, // Hobbits
	2, // Men
	3, // Elves
	3, // Dwarves
	4, // Eagles
	10, // Wizards
];

const BAD_BOYS: [u8; 7] = [
	1, // Orcs
	2, // Men
	2, // Wargs
	2, // Goblins
	3, // Uruk Hai
	5, // Trolls
	10, // Wizards
];

pub fn good_vs_evil(good: &str, evil: &str) -> String {
	let mut good_sum = 0;
	let mut evil_sum = 0;

	for (index, item) in good
		.split_whitespace()
		.map(|x| x.parse::<u8>().unwrap())
		.enumerate() {
		good_sum += (GOOD_BOYS[index] as u32) * (item as u32);
	}

	for (index, item) in evil
		.split_whitespace()
		.map(|x| x.parse::<u8>().unwrap())
		.enumerate() {
		evil_sum += (BAD_BOYS[index] as u32) * (item as u32);
	}

	if good_sum > evil_sum {
		return String::from("Battle Result: Good triumphs over Evil");
	}

	if good_sum < evil_sum {
		return String::from("Battle Result: Evil eradicates all trace of Good");
	}

	String::from("Battle Result: No victor on this battle field")
}

#[cfg(test)]
mod tests {
	use super::*;

	#[test]
	fn returns_expected() {
		assert_eq!(good_vs_evil("0 0 0 0 0 10", "0 0 0 0 0 0 0"), "Battle Result: Good triumphs over Evil");
		assert_eq!(good_vs_evil("0 0 0 0 0 0", "0 0 0 0 0 0 10"), "Battle Result: Evil eradicates all trace of Good");
		assert_eq!(good_vs_evil("0 0 0 0 0 10", "0 0 0 0 0 0 10"), "Battle Result: No victor on this battle field");
	}
}
