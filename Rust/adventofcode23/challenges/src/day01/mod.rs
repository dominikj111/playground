mod utils;

use std::io::{self, BufRead, BufReader, Cursor};
use utils::{find_end_number, find_start_number};

pub fn go_without_input(part: u8) -> String {
    go(part, io::stdin().lock())
}

pub fn go_with_input(part: u8, input: &str) -> String {
    let cursor = Cursor::new(input);
    go(part, BufReader::new(cursor))
}

fn go(part: u8, input: impl BufRead) -> String {
    if [1, 2].contains(&part) == false {
        panic!("The part can be 1 or 2 only");
    }

    let include_worded_numbers = part == 2;
    let mut sum = 0;
    for line in input.lines() {
        match line {
            Ok(line_sentence) => {
                if line_sentence.is_empty() {
                    continue;
                }
                match format!(
                    "{}{}",
                    find_start_number(&line_sentence, include_worded_numbers),
                    find_end_number(&line_sentence, include_worded_numbers)
                )
                .parse::<u32>()
                {
                    Ok(number) => {
                        sum += number;
                    }
                    Err(_) => {
                        // nothing to do
                    }
                }
            }
            Err(_) => {
                continue;
            }
        }
    }
    format!("{}", sum)
}

#[cfg(test)]
mod tests {
    use super::*;

    const CALIBRATION_DOCUMENT_142: &'static str =
        include_str!("./test_inputs/calibration_document_142.txt");
    const CALIBRATION_DOCUMENT_281: &'static str =
        include_str!("./test_inputs/calibration_document_281.txt");

    #[test]
    fn go_test() {
        assert_eq!(go_with_input(1, CALIBRATION_DOCUMENT_142), "142");
        assert_eq!(go_with_input(2, CALIBRATION_DOCUMENT_281), "281");
    }
}
