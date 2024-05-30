use bevy::{asset::Handle, text::Font, render::texture::Image};
pub use bevy::prelude::Resource;

#[derive(Resource)]
pub struct MenuAssetCache {
    pub font: Handle<Font>,
    pub font_bold: Handle<Font>,
    pub button: Handle<Image>,

    pub switch_base: Handle<Image>,
    pub switch_head: Handle<Image>,

    pub main_background: Handle<Image>,
    pub main_board: Handle<Image>,
    pub main_logo: Handle<Image>,
    pub settings_background: Handle<Image>,
}
