mod utils;

use std::cmp;
use std::io::{self, BufRead, BufReader, Cursor};
#[allow(unused_imports)]
use utils::{break_to_rgb_sets, game_id_of, sum_rgb_sets};

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
    let rgb_cube_set = (12, 13, 14);
    let mut sum_of_valid_ids = 0;
    for line in input.lines() {
        match line {
            Ok(line_sentence) => {
                if line_sentence.is_empty() {
                    continue;
                }
                let game_id = game_id_of(&line_sentence);
                let rgb_game_round_sets = break_to_rgb_sets(&line_sentence);

                // NOTE:
                // To calculate the sum of rgb per game is even more interesting and more logical form data perspective.
                // At the moment, splitting each game by `;` doesn't make much sense.
                // let rgb_sum_per_game = sum_rgb_sets(rgb_game_round_sets);

                let mut valid_game = true;

                for rgb_game_round_set in rgb_game_round_sets {
                    if rgb_game_round_set.0 > rgb_cube_set.0
                        || rgb_game_round_set.1 > rgb_cube_set.1
                        || rgb_game_round_set.2 > rgb_cube_set.2
                    {
                        valid_game = false;
                    }
                }

                if valid_game {
                    sum_of_valid_ids += game_id;
                }

                // if rgb_sum_per_game.0 <= rgb_cube_set.0
                //     && rgb_sum_per_game.1 <= rgb_cube_set.1
                //     && rgb_sum_per_game.2 <= rgb_cube_set.2
                // {
                //     sum_of_valid_ids += game_id;
                // }
            }
            Err(_) => {
                continue;
            }
        }
    }
    format!("{}", sum_of_valid_ids)
}

fn go_part_two(input: impl BufRead) -> String {
    let mut sum_of_games_power: u32 = 0;
    for line in input.lines() {
        match line {
            Ok(line_sentence) => {
                if line_sentence.is_empty() {
                    continue;
                }
                let rgb_game_round_sets = break_to_rgb_sets(&line_sentence);

                // Find RGB maximum values
                let rgb_maximums = rgb_game_round_sets.iter().fold((0, 0, 0), |acc, x| {
                    (
                        cmp::max(acc.0, x.0),
                        cmp::max(acc.1, x.1),
                        cmp::max(acc.2, x.2),
                    )
                });

                sum_of_games_power += cmp::max(1, rgb_maximums.0 as u32)
                    * cmp::max(1, rgb_maximums.1 as u32)
                    * cmp::max(1, rgb_maximums.2 as u32);
            }
            Err(_) => {
                continue;
            }
        }
    }
    format!("{}", sum_of_games_power)
}

#[cfg(test)]
mod tests {
    use super::*;

    const GAME_SAMPLE_1: &'static str = include_str!("./test_inputs/game_sample_1.txt");

    #[test]
    fn go_test() {
        assert_eq!(go_with_input(1, GAME_SAMPLE_1), "8");
        assert_eq!(go_with_input(2, GAME_SAMPLE_1), "2286");
    }
}
