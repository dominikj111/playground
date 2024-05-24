mod utils;
pub use utils::random_color;

mod systems;
use systems::{system_listeners::keyboard_event_system, update_colours_system};

mod model;
mod state;
mod prelude {
    pub use crate::model::{tags, Board, Entity, Float64Value};
    pub use crate::state::{State, StateTrack};
    pub use crate::utils::random_color;
}

use crate::model::tags::BoardItem;
pub use crate::model::{Board, Entity, Float64Value};

use bevy::{prelude::*, sprite::MaterialMesh2dBundle};

pub fn main() {
    App::new()
        .add_plugins(DefaultPlugins)
        .add_systems(Startup, setup)
        .add_systems(PreUpdate, keyboard_event_system)
        .add_systems(Update, update_colours_system)
        .run();
}

fn setup(
    mut commands: Commands,
    mut meshes: ResMut<Assets<Mesh>>,
    mut materials: ResMut<Assets<ColorMaterial>>,
) {
    commands.spawn(Camera2dBundle::default());

    let app_state = state::State::default();

    for i in 0..3 {
        for j in 0..3 {
            let material = materials.add(random_color());

            commands.spawn((
                MaterialMesh2dBundle {
                    mesh: meshes.add(Rectangle::default()).into(),
                    transform: Transform {
                        translation: Vec3::new((i * 10) as f32, (j * 10) as f32, 10.),
                        scale: Vec3::splat(12.),
                        ..default()
                    },
                    material,
                    ..default()
                },
                BoardItem,
            ));
        }
    }

    commands.insert_resource(app_state);

    commands.spawn(MaterialMesh2dBundle {
        mesh: meshes.add(Rectangle::default()).into(),
        transform: Transform::default().with_scale(Vec3::splat(128.)),
        material: materials.add(Color::PURPLE),
        ..default()
    });
}
