mod utils;

use std::io::{self, BufRead, BufReader, Cursor};
use utils::{find_end_number, find_start_number};

pub fn go_without_input() -> String {
    go(io::stdin().lock())
}

pub fn go_with_input(input: &str) -> String {
    let cursor = Cursor::new(input);
    go(BufReader::new(cursor))
}

fn go(input: impl BufRead) -> String {
    let mut sum = 0;
    for line in input.lines() {
        match line {
            Ok(line_sentence) => {
                if line_sentence.is_empty() {
                    continue;
                }
                match format!(
                    "{}{}",
                    find_start_number(&line_sentence),
                    find_end_number(&line_sentence)
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
        assert_eq!(go_with_input(CALIBRATION_DOCUMENT_142), "142");
        assert_eq!(go_with_input(CALIBRATION_DOCUMENT_281), "281");
    }
}
