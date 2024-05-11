use std::collections::HashSet;

mod model;
pub use model::{Board, Entity};

mod utils;
pub use utils::random_color;

use bevy::{
    input::{
        keyboard::{self, Key, KeyboardInput},
        ButtonState,
    },
    prelude::*,
    sprite::{Material2d, MaterialMesh2dBundle},
    utils::info,
};

pub fn main() {
    App::new()
        .add_plugins(DefaultPlugins)
        .add_systems(Startup, setup)
        .add_systems(PreUpdate, (keyboard_event_system, update_state_system))
        .run();
}

fn setup(
    mut commands: Commands,
    mut meshes: ResMut<Assets<Mesh>>,
    mut materials: ResMut<Assets<ColorMaterial>>,
) {
    commands.spawn(Camera2dBundle::default());

    // commands.spawn(MaterialMesh2dBundle {
    //     mesh: meshes.add(Rectangle::default()).into(),
    //     transform: Transform {
    //         translation: Vec3::new(6., 0., 0.),
    //         scale: Vec3::splat(128.),
    //         ..default()
    //     },
    //     material: materials.add(Color::GREEN),
    //     ..default()
    // });

    for i in 0..3 {
        for j in 0..3 {
            let material = materials.add(random_color());
            let entity = Entity::new_with_data((i, j), &material);

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
                Position { x: 3., y: 0. },
                Dimension { w: 2., h: 0. },
            ));
        }
    }

    commands.insert_resource(Keyboard {
        pressed: HashSet::new(),
    });
    commands.insert_resource(State { ..State::default() });
}

#[derive(Component)]
struct Position {
    x: f32,
    y: f32,
}

#[derive(Component)]
struct Dimension {
    w: f32,
    h: f32,
}

#[derive(Resource)]
struct State {
    change_speed: f32,
    last_update: u64,
}

impl Default for State {
    fn default() -> State {
        State {
            change_speed: 1.,
            last_update: 0,
        }
    }
}

#[derive(Resource)]
struct Keyboard {
    pressed: HashSet<KeyCode>,
}

fn keyboard_event_system(
    mut keyboard_input_events: EventReader<KeyboardInput>,
    mut keyboard: ResMut<Keyboard>,
) {
    for event in keyboard_input_events.read() {
        match event.state {
            ButtonState::Pressed => {
                keyboard.pressed.insert(event.key_code);
            }
            ButtonState::Released => {
                keyboard.pressed.remove(&event.key_code);
            }
        }
    }
}

fn update_state_system(
    keyboard: Res<Keyboard>,
    meshes: ResMut<Assets<Mesh>>,
    mut resources: ResMut<State>,
    query: Query<(&Position, &Dimension)>,
) {
    if keyboard.pressed.contains(&keyboard::KeyCode::ArrowUp) {
        resources.change_speed += 1.;
    } else if keyboard.pressed.contains(&keyboard::KeyCode::ArrowDown) {
        resources.change_speed -= 1.;
    }
}

use rand::Rng;

fn update_colours_system(
    // mut query: Query<(&Position, &Dimension)>,
    mut handels: Query<&Handle<ColorMaterial>, (With<Position>, With<Dimension>)>,
) {
    let handled_material = handels.single_mut();

    info!("{:?}", handled_material.id());

    // let mut typed_material: ColorMaterial = asset_material.into();
    // typed_material.color = Color::rgb(1.0, 0.5, 0.1);
    // *handled_material = typed_material.into();

    // let mut typed_material: ColorMaterial = material.into();
    // typed_material.color = Color::rgb(1.0, 0.5, 0.1);

    // for handel in handels.iter_mut() {
    //     let mut rng = rand::thread_rng();
    //     let r = rng.gen_range(0..=255) as f32;
    //     let g = rng.gen_range(0..=255) as f32;
    //     let b = rng.gen_range(0..=255) as f32;

    //     // let mut colourMaterial: ColorMaterial = handel.c;
    //     // colourMaterial.color = Color::rgb_from_array([r, g, b]);
    // }

    // info!("{:?}", handels.iter().count());

    // for (mut position, dimension) in &mut query  {
    //     position.x += resources.change_speed;
    //     position.y += resources.change_speed;
    // }

    // info!("{:?}", meshes.iter().count());
    // info!("{:?}", query.iter().count());
    // info!("{:?}", query);
    // for (mut position, mut dimension) in query.iter_mut() {
    //     info!("X: {:?}", position.x);
    //     info!("W: {:?}", dimension.w);
    // }
    // for key in keyboard.pressed.iter() {
    //     info!("{:?}", key);
    // }
}
