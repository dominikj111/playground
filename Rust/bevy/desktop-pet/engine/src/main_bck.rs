pub mod systems;
pub mod utilities;

use bevy::prelude::*;
use desktop_pet_shared::random_int;
use systems::{camera::CameraPlugin, world::CoreWorldPlugin};
use utilities::bubble_sort;

// use adventure::systems::entity::PrismPlugin;

fn main() {
    println!("Hello, world!");

    let mut vec = vec![3, 2, 1];
    println!("{:?}", vec);
    bubble_sort(&mut vec);
    println!("{:?}", vec);

    println!("{}", random_int(0, 10));

    App::new()
        .add_plugins(DefaultPlugins)
        .add_plugins(CoreWorldPlugin)
        .add_plugins(CameraPlugin)
        // .add_plugins(PrismPlugin)
        .run();
}
