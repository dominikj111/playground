use clap::Parser;

#[derive(Parser)]
#[command(version)]
pub struct Args {
    /// What day challenge to go?
    #[arg(short, long)]
    pub day: u8,

    /// Path to data file
    #[arg(short, long, default_value = "")]
    pub input: String,
}

pub fn parse() -> Args {
    Args::parse()
}
