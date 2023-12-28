mod utils;

use std::io::{self, BufRead, BufReader, Cursor};

pub fn go_without_input(part: u8) -> String {
    go(part, io::stdin().lock())
}

pub fn go_with_input(part: u8, input: &str) -> String {
    let cursor = Cursor::new(input);
    go(part, BufReader::new(cursor))
}

fn go(part: u8, input: impl BufRead) -> String {
    match part {
        1 => go_part_one(input),
        2 => go_part_two(input),
        _ => panic!("The part can be 1 or 2 only"),
    }
}

fn go_part_one(input: impl BufRead) -> String {
    for line in input.lines() {
        match line {
            Ok(line_sentence) => {
                if line_sentence.is_empty() {
                    continue;
                }
            }
            Err(_) => {
                continue;
            }
        }
    }
    "".to_string()
}

fn go_part_two(input: impl BufRead) -> String {
    "".to_string()
}

#[cfg(test)]
mod tests {
    use super::*;

    // const GAME_SAMPLE_1: &'static str = include_str!("./test_inputs/game_sample_1.txt");

    #[test]
    fn go_test() {
        // assert_eq!(go_with_input(1, GAME_SAMPLE_1), "8");
        // assert_eq!(go_with_input(2, GAME_SAMPLE_1), "2286");
    }
}
