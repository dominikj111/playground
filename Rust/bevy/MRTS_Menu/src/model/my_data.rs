pub use bevy::prelude::Component;

#[derive(Debug, Clone, Component, Default)]
pub struct MyData {
    pub animate_trigger: bool,
    pub animate_slider: f32,
}
