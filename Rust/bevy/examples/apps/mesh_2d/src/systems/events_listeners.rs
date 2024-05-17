pub mod system_listeners {
    use bevy::prelude::*;
    use bevy::input::{keyboard::KeyboardInput, ButtonState};

    pub fn keyboard_event_system(
        mut keyboard_input_events: EventReader<KeyboardInput>,
        mut state: ResMut<crate::state::State>,
    ) {
        for event in keyboard_input_events.read() {
            match event.state {
                ButtonState::Pressed => {
                    state.keyboard_pressed.insert(event.key_code);
                }
                ButtonState::Released => {
                    state.keyboard_pressed.remove(&event.key_code);
                }
            }
        }
    }
}
