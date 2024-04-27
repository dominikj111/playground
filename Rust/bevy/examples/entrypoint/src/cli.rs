use clap::Parser;

#[derive(Parser)]
#[command(version)]
pub struct Args {
    /// App name to run. Available app names: 'hello_shapes', 'bloom_2d', 'mesh_2d'
    #[arg(long, default_value = "hello_shapes")]
    pub appname: String,
}

pub fn parse() -> Args {
    Args::parse()
}
