use crate::prelude::*;
use bevy::prelude::*;

pub fn update_state_system(
    // keyboard: Res<Keyboard>,
    meshes: ResMut<Assets<Mesh>>,
    mut resources: ResMut<crate::state::State>,
    // query: Query<(&Position, &Dimension)>,
) {
    // if keyboard.pressed.contains(&keyboard::KeyCode::ArrowUp) {
    //     resources.change_speed += 1.;
    // } else if keyboard.pressed.contains(&keyboard::KeyCode::ArrowDown) {
    //     resources.change_speed -= 1.;
    // }
}
