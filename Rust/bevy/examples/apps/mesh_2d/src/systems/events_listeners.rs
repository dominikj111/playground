// This mod changes anything in the current state, previous state is untouched.

pub mod system_listeners {
    use bevy::input::{keyboard::KeyboardInput, ButtonState};
    use bevy::prelude::*;

    pub fn keyboard_event_system(
        mut keyboard_input_events: EventReader<KeyboardInput>,
        mut state_track: ResMut<crate::state::StateTrack>,
    ) {
        let curr_state = &mut state_track.0.1;

        for event in keyboard_input_events.read() {
            match event.state {
                ButtonState::Pressed => {
                    curr_state.keyboard_pressed.insert(event.key_code);
                }
                ButtonState::Released => {
                    curr_state.keyboard_pressed.remove(&event.key_code);
                }
            }
        }
    }
}
