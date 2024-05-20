use bevy::asset::Handle;
use bevy::input::keyboard::KeyCode;
use bevy::prelude::ColorMaterial;
use bevy::prelude::Resource;
use std::collections::HashSet;

use crate::prelude::*;

#[derive(Default, Resource, Debug)]
pub struct State {
    pub board: Board<Entity<&'static Handle<ColorMaterial>>>,
    pub keyboard_pressed: HashSet<KeyCode>,
}

#[derive(Default, Resource, Debug)]
pub struct StateTrack(pub (State, State), pub bool);
