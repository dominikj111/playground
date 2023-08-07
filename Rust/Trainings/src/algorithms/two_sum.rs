use std::collections::HashMap;

/**
 * Write a function that takes an array of numbers (integers for the tests) and a target number.
 * It should find two different items in the array that, when added together, give the target value.
 * The indices of these items should then be returned in a tuple / list (depending on your language) like so: (index1, index2).
 *
 * For the purposes of this kata, some tests may have multiple answers; any valid solutions will be accepted.
 * The input will always be valid (numbers will be an array of length 2 or greater, and all of the items will be numbers; target will always be the sum of two different items from that array).
 *
 * Based on: http://oj.leetcode.com/problems/two-sum/
 *
 * two_sum(&[1, 2, 3], 4) // return (0, 2) or (2, 0)
 *
 */

pub fn two_sum(numbers: &[i32], target: i32) -> (usize, usize) {
	let mut complements: HashMap<&i32, usize> = HashMap::new();

	for (index, num) in numbers.iter().enumerate() {
		let complement = target - num;

		if complements.contains_key(&complement) {
			return (*complements.get(&complement).unwrap(), index);
		}

		complements.insert(num, index);
	}

	panic!("Target not found");
}

#[cfg(test)]
mod tests {
	use std::panic;
	use super::two_sum;

	#[test]
	fn sample() {
		do_test(&[1, 2, 3], 4);
		do_test(&[1234, 5678, 9012], 14690);
		do_test(&[2, 2, 3], 4);
	}

	#[test]
	fn test_panicking_function() {
        let origin_hook = panic::take_hook();
        panic::set_hook(Box::new(|_| {}));
		
        let result = panic::catch_unwind(|| do_test(&[2, 6, 3], 4));
		assert!(result.is_err());

        panic::set_hook(origin_hook);
	}

	fn do_test(nums: &[i32], sum: i32) {
		let len = nums.len();
		let user_tuple = two_sum(nums, sum);
		assert!(
			user_tuple.0 < len && user_tuple.1 < len,
			"\nnumbers: {:?}\ntarget: {}\nresult: {:?}\nresult tuple has an index out of bounds",
			nums,
			sum,
			user_tuple
		);
		assert!(
			user_tuple.0 != user_tuple.1,
			"\nnumbers: {:?}\ntarget: {}\nresult: {:?}\nresult tuple must have two different indices",
			nums,
			sum,
			user_tuple
		);
		let num1 = nums[user_tuple.0];
		let num2 = nums[user_tuple.1];
		let user_sum = num1 + num2;
		assert!(
			user_sum == sum,
			"\nnumbers: {:?}\ntarget: {}\nresult: {:?}\nnumber as index {}: {}\nnumber as index {}: {}\nsum of the two numbers: {}\nsum of the two numbers did not equal target",
			nums,
			sum,
			user_tuple,
			user_tuple.0,
			num1,
			user_tuple.1,
			num2,
			user_sum
		)
	}
}
