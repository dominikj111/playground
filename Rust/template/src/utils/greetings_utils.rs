pub mod greetings {
	pub fn you_are_the_best<T: AsRef<str>>(name: T) -> String {
		format!("  You are the BEST! {} ...  ", name.as_ref())
	}
}
