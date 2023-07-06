use regex::Regex;
use std::io::{ self, BufRead };

// Test command: ls -la | make run | grep "staff"

fn main() {
	let stdin = io::stdin();
	let re: Regex = Regex::new("Cargo|Makefile").unwrap();

	for (index, result) in stdin.lock().lines().enumerate() {
		match result {
			Ok(line) => {
				println!("Line {}: {}", index, if re.is_match(line.as_str()) { line } else { String::from("not a match") });
			}
			Err(error) => {
				eprintln!("Error reading line {}: {}", index + 1, error);
			}
		}
	}
}
