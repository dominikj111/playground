mod model;

pub const BEVYPUNK_RED: Color = Color::rgba(255. / 255., 98. / 255., 81. / 255., 1.0);
pub const BEVYPUNK_YELLOW: Color = Color::rgba(252. / 255., 226. / 255., 8. / 255., 1.0);

pub const COLOR_PRIMARY: Color = BEVYPUNK_RED;
pub const COLOR_SECONDARY: Color = BEVYPUNK_YELLOW;

use bevy::window::PrimaryWindow;
pub use model::{MenuAssetCache, MyData};

import_use!(vfx, interface);

pub mod prelude {
    // Bevy + Bevy_Lunex
    pub use bevy::prelude::*;
    pub use bevy_lunex::prelude::*;

    // STD + Usefull stuff
    // pub use bevy::window::PrimaryWindow;
    pub use std::borrow::Borrow;

    // Global access to this data
    pub use crate::interface::*;
    pub use crate::MenuAssetCache;
    pub use crate::MyData;
    pub use crate::{COLOR_PRIMARY, COLOR_SECONDARY};
}

use prelude::*;

fn main() {
    App::new()
        .add_plugins((
            DefaultPlugins.set(WindowPlugin {
                primary_window: Some(Window {
                    title: "Bevypunk".into(),
                    mode: bevy::window::WindowMode::Windowed,
                    ..default()
                }),
                ..default()
            }),
            bevy::diagnostic::FrameTimeDiagnosticsPlugin,
        ))
        .add_plugins(LunexUiPlugin2D::<MyData>::new())
        .add_plugins(LunexUiDebugPlugin2D::<MyData>::new())
        .add_plugins(InterfacePlugin::<MyData>::new())
        .add_systems(PreStartup, presetup)
        .add_systems(Startup, setup)
        .run();
}

fn presetup(mut commands: Commands, asset_server: Res<AssetServer>) {
    commands.insert_resource(MenuAssetCache {
        font: asset_server.load("fonts/rajdhani/Rajdhani-Medium.ttf"),
        font_bold: asset_server.load("fonts/rajdhani/Rajdhani-Bold.ttf"),
        main_logo: asset_server.load("images/bevypunk.png"),
        main_board: asset_server.load("images/board.png"),
        main_background: asset_server.load("images/main_background.png"),
        settings_background: asset_server.load("images/generic_background.png"),
        button: asset_server.load("images/components/button.png"),
        switch_base: asset_server.load("images/components/switch/base.png"),
        switch_head: asset_server.load("images/components/switch/head.png"),
    });
}

fn setup(
    mut commands: Commands,
    asset_server: Res<AssetServer>,
    assets: Res<MenuAssetCache>,
    mut textures: ResMut<Assets<TextureAtlas>>,
    window: Query<Entity, (With<Window>, With<PrimaryWindow>)>,
) {
    // commands.spawn(AudioBundle {
    //     source: asset_server.load("sounds/main_menu.ogg"),
    //     settings: PlaybackSettings::LOOP.with_volume(bevy::audio::Volume::new_relative(0.5)),
    // });

    commands.spawn(camera());

    commands.spawn((
        Cursor::new()
            .with_os_cursor(false)
            .add_sprite_offset(Vec2::splat(14.0))
            .add_sprite_offset(Vec2::new(10.0, 12.0))
            .add_sprite_offset(Vec2::splat(40.0)),
        SpriteSheetBundle {
            texture_atlas: textures.add(TextureAtlas::from_grid(
                asset_server.load("images/components/cursor.png"),
                Vec2::splat(80.0),
                3,
                1,
                None,
                None,
            )),
            transform: Transform {
                translation: Vec3::new(0.0, 0.0, 800.0),
                scale: Vec3::new(0.5, 0.5, 1.0),
                ..default()
            },
            sprite: TextureAtlasSprite {
                color: COLOR_SECONDARY.with_a(2.0).with_l(0.68),
                anchor: bevy::sprite::Anchor::TopLeft,
                ..default()
            },
            ..default()
        },
    ));

    // Create new UiTree (a UI context / DOM)
    let mut tree: UiTree<MyData> = UiTree::new("Interface");
    // Construct the route Menu first
    rt::Menu::construct(&mut commands, &assets, &mut tree).unwrap();

    println!("{}", tree.tree());

    // Insert the UI into the window
    let window = window.single();
    commands.entity(window).insert(tree.bundle());
}
