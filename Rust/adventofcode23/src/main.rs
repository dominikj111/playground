use clap::Parser;
use colored::*;
use std::thread;
use std::time::Duration;
use std::{cmp::min, fmt::Write};

use indicatif::{ProgressBar, ProgressState, ProgressStyle};

use std::io::{self, BufRead};

use regex::Regex;

#[derive(Parser, Debug)]
#[command(author, version, about, long_about = None)]
struct Args {
    /// Name of the person to greet
    #[arg(short, long, default_value = "")]
    name: String,

    /// Number of times to greet
    #[arg(short, long, default_value_t = 1)]
    count: u8,
}

fn main() {
    let args = Args::parse();

    if !args.name.is_empty() {
        for _ in 0..args.count {
            println!("Hello {}!", args.name.bold().cyan());
        }
    }

    let mut downloaded = 0;
    let total_size = 23123123;

    let pb = ProgressBar::new(total_size);
    pb.set_style(ProgressStyle::with_template("{spinner:.green} [{elapsed_precise}] [{wide_bar:.cyan/blue}] {bytes}/{total_bytes} ({eta})")
        .unwrap()
        .with_key("eta", |state: &ProgressState, w: &mut dyn Write| write!(w, "{:.1}s", state.eta().as_secs_f64()).unwrap())
        .progress_chars("#>-"));

    while downloaded < total_size {
        let new = min(downloaded + 223211, total_size);
        downloaded = new;
        pb.set_position(new);
        thread::sleep(Duration::from_millis(12));
    }

    pb.finish_with_message("downloaded");

    let stdin = io::stdin();
    let mut sum = 0;
    // let mut i = 0;
    for line in stdin.lock().lines() {
        match extract_first_last_number(&line.unwrap()) {
            Some((first, last)) => {
                sum += format!("{}{}", first, last).parse::<u32>().unwrap_or_default();
            }
            None => {
                
            }
        }
        // let line = line.expect("Could not read line from standard in");
        // println!("LINE {}:{}", i, line);
        // i += 1;
    }

    println!("sum: {}", sum);
}

fn extract_first_last_number(hay: &str) -> Option<(u32, u32)> {
    let re = Regex::new(r"(\d)(\w*(\d)|$)?").unwrap();
    let Some(caps) = re.captures(hay) else {
        return None;
    };

    let possible_first = caps.get(1).map_or(None, |m| m.as_str().parse::<u32>().ok());
    let possible_second = caps.get(3).map_or(None, |m| m.as_str().parse::<u32>().ok());

    if possible_first.is_some() && possible_second.is_some() {
        return Some((possible_first.unwrap(), possible_second.unwrap()));
    }

    if possible_first.is_some() && possible_second.is_none() {
        return Some((possible_first.unwrap(), possible_first.unwrap()));
    }

    None
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn extract_first_last_number_test() {
        assert_eq!(extract_first_last_number("16b").unwrap(), (1, 6));
        assert_eq!(extract_first_last_number("a56").unwrap(), (5, 6));
        assert_eq!(extract_first_last_number("512").unwrap(), (5, 2));
        assert_eq!(extract_first_last_number("3ad2").unwrap(), (3, 2));
        assert_eq!(extract_first_last_number("3aas2").unwrap(), (3, 2));
        assert_eq!(extract_first_last_number("1aa2s").unwrap(), (1, 2));
        assert_eq!(extract_first_last_number("b1a4as0").unwrap(), (1, 0));
        assert_eq!(extract_first_last_number("ab3a2s1s").unwrap(), (3, 1));
        assert_eq!(extract_first_last_number("ab3ass"), Some((3, 3)));
        assert_eq!(extract_first_last_number("abass"), None);
    }
}
