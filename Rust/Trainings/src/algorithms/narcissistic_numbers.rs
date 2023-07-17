/**
 * A Narcissistic Number (or Armstrong Number) is a positive number which is the sum of its own digits, each raised to the power of the number of digits in a given base. In this Kata, we will restrict ourselves to decimal (base 10).
 *
 * For example, take 153 (3 digits), which is narcissistic:
 * 1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153
 *
 * and 1652 (4 digits), which isn't:
 * 1^4 + 6^4 + 5^4 + 2^4 = 1 + 1296 + 625 + 16 = 1938
 *
 * The Challenge:
 * Your code must return true or false (not 'true' and 'false') depending upon whether the given number is a Narcissistic number in base 10.
 *
 */

pub fn narcissistic(num: u64) -> bool {
	// let digits: Vec<u8> = num
	// 	.to_string()
	// 	.chars()
	// 	.map(|c| c.to_digit(10).unwrap() as u8)
	// 	.collect();

	// let exponent = digits.len() as u32;
	// let maybe_narcissistic = digits.iter().fold(0, |acc, &x| acc + (x as u128).pow(exponent) as u64);

	// num == maybe_narcissistic

	num ==
		num
			.to_string()
			.chars()
			.map(|x| x.to_digit(10).unwrap() as u64)
			.map(|x| x.pow(num.to_string().len() as u32))
			.sum::<u64>()
}

#[cfg(test)]
mod tests {
	use super::*;

	fn dotest(input: u64, expected: bool) {
		let actual = narcissistic(input);
		assert_eq!(actual, expected, "\nIncorrect answer for n={}\nExpected: {expected}\nActual: {actual}", input)
	}

	#[test]
	fn basic_tests() {
		dotest(7, true);
		dotest(371, true);
		dotest(122, false);
		dotest(4887, false);
		dotest(1000000000006, false);
	}
}
