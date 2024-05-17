use bevy::asset::Handle;
use bevy::input::keyboard::KeyCode;
use bevy::prelude::ColorMaterial;
use bevy::prelude::Resource;
use std::collections::HashSet;

use crate::prelude::*;

#[derive(Resource)]
pub struct State {
    pub board: Board<Entity<&'static Handle<ColorMaterial>>>,
    pub keyboard_pressed: HashSet<KeyCode>,
}

impl Default for State {
    fn default() -> Self {
        State {
            keyboard_pressed: HashSet::new(),
            board: Board::new(),
        }
    }
}
