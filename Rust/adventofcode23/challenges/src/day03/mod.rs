mod model;
mod utils;

use std::io::{self, BufRead, BufReader, Cursor};
use utils::{get_marked_numbers, get_ratios_tied_by};

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
    let mut line_processing_window = vec!["".to_string(), "".to_string(), "".to_string()];
    let mut sum_of_passed: u32 = 0;

    for line in input.lines() {
        match line {
            Ok(line_sentence) => {
                if line_sentence.is_empty() {
                    continue;
                }

                line_processing_window.push(line_sentence.to_string());
                line_processing_window.remove(0);

                sum_of_passed += get_marked_numbers(&line_processing_window)
                    .iter()
                    .sum::<u32>();
            }
            Err(_) => {
                continue;
            }
        }
    }

    line_processing_window.push("".to_string());
    line_processing_window.remove(0);
    sum_of_passed += get_marked_numbers(&line_processing_window)
        .iter()
        .sum::<u32>();

    format!("{}", sum_of_passed)
}

fn go_part_two(input: impl BufRead) -> String {
    let mut line_processing_window = vec!["".to_string(), "".to_string(), "".to_string()];
    let mut sum_of_gear_ratios: u32 = 0;

    for line in input.lines() {
        match line {
            Ok(line_sentence) => {
                if line_sentence.is_empty() {
                    continue;
                }

                line_processing_window.push(line_sentence.to_string());
                line_processing_window.remove(0);
                sum_of_gear_ratios += get_ratios_tied_by('*', &line_processing_window)
                    .iter()
                    .map(|(x, y)| x * y)
                    .sum::<u32>();
            }
            Err(_) => {
                continue;
            }
        }
    }

    line_processing_window.push("".to_string());
    line_processing_window.remove(0);
    sum_of_gear_ratios += get_ratios_tied_by('*', &line_processing_window)
        .iter()
        .map(|(x, y)| x * y)
        .sum::<u32>();

    format!("{}", sum_of_gear_ratios)
}

#[cfg(test)]
mod tests {
    use super::*;

    const GAME_SAMPLE_1: &'static str = include_str!("./test_inputs/game_sample_1.txt");

    #[test]
    fn go_test() {
        assert_eq!(go_with_input(1, GAME_SAMPLE_1), "4361");
        assert_eq!(go_with_input(2, GAME_SAMPLE_1), "467835");
    }
}
