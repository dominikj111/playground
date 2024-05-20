// This mode updates the current state and applies the logic.
// The state on the begining of the process will become as a previous state.
// And updated will becode as a current state.

// use crate::prelude::*;
use bevy::prelude::*;

pub fn update_state_system(
    // keyboard: Res<Keyboard>,
    // meshes: ResMut<Assets<Mesh>>,
    state_track: Res<crate::state::StateTrack>,
) {
    let (prev_state, curr_state) = &state_track.0;
    let state_changed = &state_track.1;

    println!("prev_state: {:?}", prev_state);
    println!("curr_state: {:?}", curr_state);
    println!("change indicator: {:?}", state_changed);

    // if keyboard.pressed.contains(&keyboard::KeyCode::ArrowUp) {
    //     resources.change_speed += 1.;
    // } else if keyboard.pressed.contains(&keyboard::KeyCode::ArrowDown) {
    //     resources.change_speed -= 1.;
    // }

    // println!("prev_state: {:?}", prev_state);
    // println!("next_state: {:?}", next_state);
}
