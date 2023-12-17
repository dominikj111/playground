/// Extract game ID from the sentence.
///
/// # Examples
/// ```
/// assert_eq!(game_id_of("Game 1: 3 blue, ..."), 1);
/// ```
pub fn game_id_of(sentence: &str) -> u32 {
    sentence
        .replace("Game ", "")
        .split(":")
        .collect::<Vec<&str>>()[0]
        .parse::<u32>()
        .expect("Could not parse the game ID")
}

/// Break the sentence into RGB sets.
///
/// # Examples
/// ```
/// assert_eq!(
///     break_to_rgb_sets("Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",),
///     [(0, 2, 1), (1, 3, 4), (0, 1, 1)]
/// );
/// ```
pub fn break_to_rgb_sets(sentence: &str) -> Vec<(u8, u8, u8)> {
    // ["1 blue, 2 green", "3 green, 4 blue, 1 red", "1 green, 1 blue"]
    let rgb_sentences = sentence.split(":").collect::<Vec<&str>>()[1]
        .split(";")
        .collect::<Vec<&str>>();

    let mut result: Vec<(u8, u8, u8)> = Vec::new();

    for rgb_sentence in rgb_sentences {
        // "1 blue, 2 green"
        let rgb_values = rgb_sentence.split(",").collect::<Vec<&str>>();
        let mut parsed_rgb_values = (0, 0, 0);

        // "1 blue, 2 green" -> parsed_rgb_values as (0, 2, 1)
        for rgb_value in rgb_values {
            let rgb_value_type = rgb_value.trim().split(" ").collect::<Vec<&str>>();
            match rgb_value_type[1] {
                "red" => {
                    parsed_rgb_values.0 = rgb_value_type[0]
                        .parse::<u8>()
                        .expect("Could not parse 'red' value");
                }
                "green" => {
                    parsed_rgb_values.1 = rgb_value_type[0]
                        .parse::<u8>()
                        .expect("Could not parse 'green' value");
                }
                "blue" => {
                    parsed_rgb_values.2 = rgb_value_type[0]
                        .parse::<u8>()
                        .expect("Could not parse 'blue' value");
                }
                _ => panic!("Invalid RGB value type"),
            }
        }

        result.push(parsed_rgb_values);
    }

    result
}

/// Sum in Vec provided RGB sets into single RGB set.
///
/// # Examples
/// ```
/// assert_eq!(sum_rgb_sets([(1, 2, 3), (4, 5, 6), (7, 8, 9)].to_vec()), (12, 15, 18));
/// ```
#[allow(dead_code)]
pub fn sum_rgb_sets(rgb_sets: Vec<(u8, u8, u8)>) -> (u8, u8, u8) {
    rgb_sets.iter().fold((0, 0, 0), |acc, &(r, g, b)| {
        (acc.0 + r, acc.1 + g, acc.2 + b)
    })
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn game_id_of_test() {
        assert_eq!(game_id_of("Game 1: 3 blue, ..."), 1);
        assert_eq!(game_id_of("Game 5: 6 red, 1 blue, 3 green; 2 ..."), 5);
        assert_eq!(game_id_of("Game 70: 1 blue, 1 green; 1 red; 1 red, 2 blue, 1 green; 1 green, 2 red; 2 blue, 2 red; 1 red"), 70);
        assert_eq!(game_id_of("Game 61: 5 blue, 9 red, 4 green; 5 green, 7 blue, 6 red; 7 green, 8 red; 7 blue, 4 red, 2 green; 8 red, 4 blue, 5 green; 3 green, 9 red, 7 blue"), 61);
    }

    #[test]
    fn break_to_rgb_sets_test() {
        assert_eq!(
            break_to_rgb_sets("Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue"),
            [(0, 2, 1), (1, 3, 4), (0, 1, 1)]
        );
        assert_eq!(
            break_to_rgb_sets("Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green"),
            [(6, 3, 1), (1, 2, 2)]
        );
        assert_eq!(
            break_to_rgb_sets("Game 70: 1 blue, 1 green; 1 red; 1 red, 2 blue, 1 green; 1 green, 2 red; 2 blue, 2 red; 1 red"),
            [(0, 1, 1), (1, 0, 0), (1, 1, 2), (2, 1, 0), (2, 0, 2), (1, 0, 0)]
        );
        assert_eq!(
            break_to_rgb_sets("Game 61: 5 blue, 9 red, 4 green; 5 green, 7 blue, 6 red; 7 green, 8 red; 7 blue, 4 red, 2 green; 8 red, 4 blue, 5 green; 3 green, 9 red, 7 blue"),
            [(9, 4, 5), (6, 5, 7), (8, 7, 0), (4, 2, 7), (8, 5, 4), (9, 3, 7)]
        );
    }

    #[test]
    fn sum_rgb_sets_test() {
        assert_eq!(
            sum_rgb_sets([(1, 2, 3), (4, 5, 6), (7, 8, 9)].to_vec()),
            (12, 15, 18)
        );
        assert_eq!(
            sum_rgb_sets(
                [
                    (0, 1, 1),
                    (1, 0, 0),
                    (1, 1, 2),
                    (2, 1, 0),
                    (2, 0, 2),
                    (1, 0, 0)
                ]
                .to_vec()
            ),
            (7, 3, 5)
        );
        assert_eq!(
            sum_rgb_sets(
                [
                    (9, 4, 5),
                    (6, 5, 7),
                    (8, 7, 0),
                    (4, 2, 7),
                    (8, 5, 4),
                    (9, 3, 7)
                ]
                .to_vec()
            ),
            (44, 26, 30)
        );
    }
}
