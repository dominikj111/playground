use desktop_pet_engine::bevy::prelude::*;
use desktop_pet_engine::systems::{camera::CameraPlugin, world::CoreWorldPlugin};
use desktop_pet_shared::random_int;

fn main() {
    println!("Hello, test2!");

    println!("{}", random_int(0, 10));

    App::new()
        .add_plugins(DefaultPlugins)
        .add_plugins(CoreWorldPlugin)
        .add_plugins(CameraPlugin)
        .run();
}
