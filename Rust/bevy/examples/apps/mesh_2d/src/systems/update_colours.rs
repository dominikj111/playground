use crate::prelude::*;
use bevy::prelude::*;

pub fn update_colours_system(
    handels: Query<&Handle<ColorMaterial>, With<tags::BoardItem>>,
    mut materials: ResMut<Assets<ColorMaterial>>,
    state: Res<crate::state::State>,
) {
    info!("{:?}", handels.iter().count());
    info!("board speed change: {:?}", state.board_speed_change.get());

    for handle in handels.iter() {
        if let Some(material) = materials.get_mut(handle) {
            material.color = random_color();
        }
    }
    std::thread::sleep(std::time::Duration::from_millis(1000));
}
