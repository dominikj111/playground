pub mod greetings_utils;
pub use greetings_utils::greetings;

fn add_numbers(a: i32, b: i32) -> i32 {
	a + b
}

pub fn add_two(a: i32) -> i32 {
	internal_adder(a, 2)
}

fn internal_adder(a: i32, b: i32) -> i32 {
	a + b
}

#[cfg(test)]
mod tests {
	use super::*;

	#[test]
	fn internal() {
		assert_eq!(4, internal_adder(2, 2));
	}
}
