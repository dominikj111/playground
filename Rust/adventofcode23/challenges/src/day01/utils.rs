const NUMBERS: [&str; 9] = [
    "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
];

fn find_number_in_sentence(
    characters: impl Iterator<Item = char>,
    concat: fn(&str, &str) -> String,
) -> Option<u32> {
    let mut potential_number = String::new();
    let mut result_number = 0;

    for character in characters {
        match character {
            '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' => {
                result_number = character.to_string().parse::<u32>().unwrap();
                break;
            }
            _ => {
                // NOTE: This match branch is related to deal with the part 2 of the challenge, to get result of the part 1, comment it out.
                potential_number = concat(&potential_number, &character.to_string().as_str());
                for (i, number) in NUMBERS.iter().enumerate() {
                    if potential_number.contains(*number) {
                        result_number = i as u32 + 1;
                        break;
                    }
                }
            }
        }
        if result_number != 0 {
            break;
        }
    }

    if result_number == 0 {
        None
    } else {
        Some(result_number)
    }
}

/// It extract first found representation of a digit or worded number from a sentence,
/// where the number may be one of 1 - 9 (or one - nine).
///
/// # Examples
/// ```
/// assert_eq!(find_start_number("12and3"), 1);
/// assert_eq!(find_start_number("onetwothree"), 1);
/// assert_eq!(find_start_number("fiveight"), 5);
/// ```
pub fn find_start_number(sentence: &str) -> u32 {
    match find_number_in_sentence(sentence.chars(), |x, y| format!("{}{}", x, y)) {
        Some(number) => number,
        None => panic!("No number found in sentence: {}", sentence),
    }
}

/// It extract last found representation of a digit or worded number from a sentence,
/// where the number may be one of 1 - 9 (or one - nine).
///
/// # Examples
/// ```
/// assert_eq!(find_end_number("12and3"), 3);
/// assert_eq!(find_end_number("onetwothree"), 3);
/// assert_eq!(find_end_number("fiveight"), 8);
/// ```
pub fn find_end_number(sentence: &str) -> u32 {
    match find_number_in_sentence(sentence.chars().rev(), |x, y| format!("{}{}", y, x)) {
        Some(number) => number,
        None => panic!("No number found in sentence: {}", sentence),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_find_start_number() {
        assert_eq!(find_start_number("x12and3"), 1);
        assert_eq!(find_start_number("yonetwothree"), 1);
        assert_eq!(find_start_number("fiveight"), 5);
        assert_eq!(find_start_number("two1nine"), 2);
    }

    #[test]
    fn test_find_end_number() {
        assert_eq!(find_end_number("12and3a"), 3);
        assert_eq!(find_end_number("eightwothreeb"), 3);
        assert_eq!(find_end_number("threeight"), 8);
        assert_eq!(find_end_number("two1nine"), 9);
    }
}
