use rand::Rng;

/**
 * https://help.smarkets.com/hc/en-gb/articles/214058369-How-to-calculate-implied-probability-in-betting
 */

fn main() {
    let mut my_money = 1000.0;
    let mut count_of_games = 0;
    let mut i = 0;
    let mut count_of_wins = 0;

    loop {
        let win_prob = rand::thread_rng().gen_range(0.0..100.0);
        let lose_prob = rand::thread_rng().gen_range(0.0..100.0 - win_prob);
        let draw_prob = 100.0 - win_prob - lose_prob;

        // println!(
        //     "win_prob: {}, lose_prob: {}, draw_prob: {}, SUM: {}",
        //     win_prob,
        //     lose_prob,
        //     draw_prob,
        //     win_prob + lose_prob + draw_prob
        // );

        // if win_prob + lose_prob + draw_prob != 100.0 {
        //     // println!("Sum of probabilities must be 100!\n");
        //     continue;
        // }

        // assert!(
        //     win_prob + lose_prob + draw_prob == 100.0,
        //     "\nSum of probabilities must be 100!\n"
        // );

        let win_odd = 100.0 / win_prob;
        let lose_odd = 100.0 / lose_prob;
        let draw_odd = 100.0 / draw_prob;
        let odds = [win_odd, lose_odd, draw_odd];

        // println!(
        //     "win_odd: {}, lose_odd: {}, draw_odd: {}",
        //     win_odd, lose_odd, draw_odd
        // );

        // select the goal and init the bet
        // random odd * amount

        let game_result = rand::thread_rng().gen_range(0.0..100.0);

        let win_odd_index;

        if game_result < win_prob {
            win_odd_index = 0;
        } else if game_result < win_prob + lose_prob {
            win_odd_index = 1;
        } else {
            win_odd_index = 2;
        }

        let my_bet_index = rand::thread_rng().gen_range(0..3);

        let bet_money = 10.0;

        count_of_games += 1;
        if win_odd_index == my_bet_index {
            my_money += bet_money * odds[win_odd_index];
            count_of_wins += 1;
        } else {
            my_money -= bet_money;
        }

        // println!("My money: {}", my_money);

        i += 1;

        if my_money <= 0.0 {
            break;
        }

        if i == 10000 {
            break;
        }
    }

    println!("Count of games: {}", count_of_games);
    println!("Count of wins: {}", count_of_wins);
    println!("Count of loss: {}", count_of_games - count_of_wins);

    println!("My money: {}", my_money);
    println!("Profit: {}", my_money - 1000.0);
}

fn round_to_decimal(value: f64, precision: u32) -> f64 {
    let base: u32 = 10;
    let pow = base.pow(precision);
    (value * pow as f64).round() / pow as f64
}

//tests

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_round_to_decimal() {
        assert_eq!(round_to_decimal(100.00000000000002, 5), 100.0);
    }
}
