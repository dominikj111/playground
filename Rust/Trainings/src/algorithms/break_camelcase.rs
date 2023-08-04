
/**
 * Complete the solution so that the function will break up camel casing, using a space between words.
 * Example:
 *      "camelCasing"  =>  "camel Casing"
 *      "identifier"   =>  "identifier"
 *      ""             =>  ""
 */

pub fn break_camelcase(words: &str) -> String {
	let mut new_string = String::new();

	for (_i, c) in words.chars().enumerate() {
		if c.is_uppercase() {
			new_string.push(' ');
			new_string.push(c);
		} else {
			new_string.push(c);
		}
	}

	return new_string;
}

#[cfg(test)]
mod tests {
	use super::*;

	#[test]
	fn test_solution() {
		assert_eq!(break_camelcase("camelCasing"), "camel Casing");
		assert_eq!(break_camelcase("camelCasingTest"), "camel Casing Test");
	}
}
