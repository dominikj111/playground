pub mod utils;
use utils::greetings::you_are_the_best;

use clap::Parser;

/// Simple program to say hello in ASCII text
#[derive(Parser, Debug)]
#[command(author, version, about, long_about = None)]
struct Args {
	/// Name of the person to greet
	#[arg(short, long, default_value_t = String::from("Justin"))]
	name: String,

	/// Number of times to greet
	#[arg(short, long, default_value_t = 1)]
	count: u8,
}

extern crate cfonts;
use cfonts::{ say, Options, Align, BgColors, Colors, Fonts, Rgb };
use std::io::{ stdin };

fn main() {
	let args = Args::parse();

	for _ in 0..args.count {
		println!("Hello {}!", args.name);
	}

	loop {
		println!("\nTell me your name:");

		let mut input = String::new();
		stdin().read_line(&mut input).unwrap();

		let greeting = you_are_the_best(input.trim());

		say(Options {
			text: greeting,
			font: Fonts::FontShade,
			colors: vec![Colors::Rgb(Rgb::Val(255, 56, 56)), Colors::Green],
			background: BgColors::Black,
			align: Align::Center,
			letter_spacing: 2,
			max_length: 20,
			..Options::default()
		});
	}
}
