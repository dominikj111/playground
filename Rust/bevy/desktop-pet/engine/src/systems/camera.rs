use bevy::prelude::*;

pub struct CameraPlugin;

impl Plugin for CameraPlugin {
    fn build(&self, app: &mut App) {
        app.add_systems(Startup, setup_camera)
            .add_systems(Update, (update_camera,));
    }
}

#[derive(Component)]
pub struct MainCamera {
    pub target_position: Vec3,
    pub side_view: bool,
}

fn setup_camera(mut commands: Commands) {
    commands.spawn((
        Camera3d::default(),
        Transform::from_xyz(-8.0, 8.0, 8.0).looking_at(Vec3::ZERO, Vec3::Y),
        MainCamera {
            target_position: Vec3::ZERO,
            side_view: true,
        },
    ));
}

fn update_camera(
    time: Res<Time>,
    mut query: Query<(&mut Transform, &MainCamera), With<MainCamera>>,
) {
    for (mut transform, camera) in query.iter_mut() {
        if camera.side_view {
            // Smooth camera movement
            let current_pos = transform.translation;
            let target_pos = camera.target_position + Vec3::new(-8.0, 8.0, 8.0);
            transform.translation = current_pos.lerp(target_pos, time.delta_secs() * 2.0);
            transform.look_at(camera.target_position, Vec3::Y);
        }
    }
}
