use colored::Colorize;
use std::fs;

mod cli;
mod day01;
mod day02;

fn println_challenge_result(day: u8, part: u8, result: String) {
    let result_message = "The solution for day [day] challenge of part [part] is:"
        .replace("[day]", day.to_string().as_str())
        .replace("[part]", part.to_string().as_str())
        .cyan();
    let coloured_result = result.bold().cyan();
    println!("{} {}", result_message, coloured_result);
}

fn main() {
    let args = cli::parse();

    println!(); // break line

    match args.day {
        1 => {
            let result = if args.input.is_empty() {
                day01::go_without_input(args.part)
            } else {
                let contents = fs::read_to_string(args.input).expect("Cannot read the input file");
                day01::go_with_input(args.part, &contents)
            };
            println_challenge_result(args.day, args.part, result);
        }
        2 => {
            let result = if args.input.is_empty() {
                day02::go_without_input(args.part)
            } else {
                let contents = fs::read_to_string(args.input).expect("Cannot read the input file");
                day02::go_with_input(args.part, &contents)
            };
            println_challenge_result(args.day, args.part, result);
        }
        _ => panic!("Day {} not yet implemented", args.day),
    }

    println!(); // break line
}
