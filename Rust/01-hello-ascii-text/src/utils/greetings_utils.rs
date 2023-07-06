pub mod greetings {
	pub fn you_are_the_best<T: AsRef<str>>(name: T) -> String {
		format!("  You are the BEST! {} ...  ", name.as_ref())
	}
}

#[cfg(test)]
mod tests {
	use super::*;

	#[test]
	fn internal() {
		assert_eq!("  You are the BEST! Alice ...  ", greetings::you_are_the_best("Alice"));
	}
}
