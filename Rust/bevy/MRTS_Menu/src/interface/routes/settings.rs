use crate::prelude::*;

/// # Settings
/// The callable route struct containing the whole settings menu.
#[derive(Default)]
pub struct Settings;
impl Settings {
    pub fn construct<T: Component + Default>(
        commands: &mut Commands,
        assets: &MenuAssetCache,
        tree: &mut UiTree<T>,
    ) -> Result<(), LunexError> {
        let settings = RelativeLayout::new()
            .with_rel_1(Vec2::splat(-1.0))
            .with_rel_2(Vec2::splat(101.0))
            .build_as(tree, "Settings")?;

        let image = SolidLayout::new()
            .with_scaling(SolidScale::Fill)
            .with_size(1280.0, 720.0)
            .build_in(tree, &settings)?;

        image
            .fetch_mut(tree)?
            .get_container_mut()
            .set_render_depth(Modifier::Set(90.0));
        commands.spawn(ImageElementBundle::new(
            image,
            ImageParams::default().with_depth(-0.5),
            assets.settings_background.clone(),
            Vec2::new(1280.0, 720.0),
        ));

        let return_button = WindowLayout::empty()
            .rel((85., 85.))
            .size_rel((10.0, 5.0))
            .build_as(tree, settings.end("Return"))?;

        ui::Button::new("Return").construct(
            commands,
            assets,
            tree,
            return_button.end(".Button"),
            (lg::InputMouseClick::new(), ReturnButton),
        )?;

        let k = 1.4;

        let switch_button = WindowLayout::empty()
            .rel((50., 40. + 5. * k))
            .size_abs((80.0 * k, 40.0 * k))
            .build_as(tree, settings.end(""))?;
        ui::Switch::new(false).construct(
            commands,
            assets,
            tree,
            switch_button.end(".Switch"),
            (),
        )?;

        let switch_button = WindowLayout::empty()
            .rel((50., 40. + 5. * k * 2.))
            .size_abs((80.0 * k, 40.0 * k))
            .build_as(tree, settings.end(""))?;
        ui::Switch::new(false).construct(
            commands,
            assets,
            tree,
            switch_button.end(".Switch"),
            (),
        )?;

        let switch_button = WindowLayout::empty()
            .rel((50., 40. + 5. * k * 3.))
            .size_abs((80.0 * k, 40.0 * k))
            .build_as(tree, settings.end(""))?;
        ui::Switch::new(false).construct(
            commands,
            assets,
            tree,
            switch_button.end(".Switch"),
            (),
        )?;

        let switch_button = WindowLayout::empty()
            .rel((50., 40. + 5. * k * 4.))
            .size_abs((80.0 * k, 40.0 * k))
            .build_as(tree, settings.end(""))?;
        ui::Switch::new(false).construct(
            commands,
            assets,
            tree,
            switch_button.end(".Switch"),
            (),
        )?;

        Ok(())
    }
}

/// All of custom settings logic
mod script {
    use crate::prelude::*;

    #[derive(Component, Clone, Copy)]
    pub(super) struct ReturnButton;
    pub(super) fn return_button_action<T: Component + Default>(
        mut commands: Commands,
        assets: Res<MenuAssetCache>,
        mut trees: Query<&mut UiTree<T>>,
        query: Query<&lg::InputMouseClick, (With<Widget>, With<ReturnButton>)>,
    ) {
        for mut tree in &mut trees {
            for clicked in &query {
                if clicked.left {
                    tree.drop_branch("Settings").unwrap();
                    rt::Menu::construct(&mut commands, &assets, &mut tree).unwrap();
                    return;
                }
            }
        }
    }

    #[derive(Component, Clone, Copy)]
    pub(super) struct HorizontalMarker;
}
use script::*;
script_plugin!(
    SettingsPlugin,
    // requires to run before LunexUpdates or there will be a blink if the menu is changed
    add_systems(
        Update,
        return_button_action::<T>
            .after(lg::InputSystemSet)
            .before(LunexUiSystemSet2D)
    )
);
