const NUMBERS: [&str; 9] = [
    "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
];

fn find_number_in_sentence(
    characters: impl Iterator<Item = char>,
    concat: fn(&str, &str) -> String,
    include_worded_numbers: bool,
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
                if include_worded_numbers {
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
/// assert_eq!(find_start_number("12and3", true), 1);
/// assert_eq!(find_start_number("onetwo9three", true), 1);
/// assert_eq!(find_start_number("onetwo9three", false), 9);
/// assert_eq!(find_start_number("fiveight", true), 5);
/// assert_eq!(find_start_number("five4ight", true), 5);
/// assert_eq!(find_start_number("five4ight", false), 4);
/// ```
pub fn find_start_number(sentence: &str, include_worded_numbers: bool) -> u32 {
    match find_number_in_sentence(
        sentence.chars(),
        |x, y| format!("{}{}", x, y),
        include_worded_numbers,
    ) {
        Some(number) => number,
        None => panic!("No number found in sentence: {}", sentence),
    }
}

/// It extract last found representation of a digit or worded number from a sentence,
/// where the number may be one of 1 - 9 (or one - nine).
///
/// # Examples
/// ```
/// assert_eq!(find_end_number("12and3", true), 3);
/// assert_eq!(find_end_number("onetwo5three", true), 3);
/// assert_eq!(find_end_number("onetwo5three", false), 5);
/// assert_eq!(find_end_number("fiveight", true), 8);
/// assert_eq!(find_end_number("fiv1eight", true), 8);
/// assert_eq!(find_end_number("fiv1eight", false), 1);
/// ```
pub fn find_end_number(sentence: &str, include_worded_numbers: bool) -> u32 {
    match find_number_in_sentence(
        sentence.chars().rev(),
        |x, y| format!("{}{}", y, x),
        include_worded_numbers,
    ) {
        Some(number) => number,
        None => panic!("No number found in sentence: {}", sentence),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_find_start_number() {
        assert_eq!(find_start_number("x12and3", true), 1);
        assert_eq!(find_start_number("yonetwothree", true), 1);
        assert_eq!(find_start_number("fiveight", true), 5);
        assert_eq!(find_start_number("two1nine", true), 2);
        
        assert_eq!(find_start_number("x12and3", false), 1);
        assert_eq!(find_start_number("yone3twothree", false), 3);
        assert_eq!(find_start_number("five7ight", false), 7);
        assert_eq!(find_start_number("two1nine", false), 1);
    }

    #[test]
    fn test_find_end_number() {
        assert_eq!(find_end_number("12and3a", true), 3);
        assert_eq!(find_end_number("eightwothreeb", true), 3);
        assert_eq!(find_end_number("threeight", true), 8);
        assert_eq!(find_end_number("two1nine", true), 9);

        assert_eq!(find_end_number("12and3a", false), 3);
        assert_eq!(find_end_number("eightwo2threeb", false), 2);
        assert_eq!(find_end_number("thre9eight", false), 9);
        assert_eq!(find_end_number("two1nine", false), 1);
    }
}
