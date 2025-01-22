use bevy::prelude::*;

pub struct CoreWorldPlugin;

impl Plugin for CoreWorldPlugin {
    fn build(&self, app: &mut App) {
        app.add_systems(Startup, setup_world)
            .add_systems(Update, (update_lighting, update_crystal_effects));
    }
}

#[derive(Component)]
struct Crystal {
    color_shift: f32,
    height: f32,
    material: Handle<StandardMaterial>,
}

fn setup_world(
    mut commands: Commands,
    mut meshes: ResMut<Assets<Mesh>>,
    mut materials: ResMut<Assets<StandardMaterial>>,
) {
    // Ground plane - larger and with more interesting material
    commands.spawn((
        Mesh3d(meshes.add(Mesh::from(Plane3d::new(
            Vec3::Y,               // Normal pointing up
            Vec2::new(25.0, 25.0), // Half-size of the plane
        )))),
        MeshMaterial3d(materials.add(StandardMaterial {
            base_color: Color::srgb(0.2, 0.2, 0.3),
            metallic: 0.5,
            perceptual_roughness: 0.7,
            ..default()
        })),
        Transform::from_xyz(0.0, -0.5, 0.0),
    ));

    // Add some crystal formations
    spawn_crystal_formation(
        &mut commands,
        &mut meshes,
        &mut materials,
        Vec3::new(-5.0, 0.0, -3.0),
    );
    spawn_crystal_formation(
        &mut commands,
        &mut meshes,
        &mut materials,
        Vec3::new(4.0, 0.0, -6.0),
    );
    spawn_crystal_formation(
        &mut commands,
        &mut meshes,
        &mut materials,
        Vec3::new(-3.0, 0.0, 5.0),
    );

    // Add some geometric platforms
    spawn_platform(
        &mut commands,
        &mut meshes,
        &mut materials,
        Vec3::new(3.0, 0.5, 3.0),
    );
    spawn_platform(
        &mut commands,
        &mut meshes,
        &mut materials,
        Vec3::new(-4.0, 1.0, -5.0),
    );

    // Directional light for shadows
    commands.spawn((
        DirectionalLight {
            color: Color::srgb(1.0, 1.0, 1.0),
            shadows_enabled: true,
            illuminance: 15000.0,
            shadow_depth_bias: 0.05,
            shadow_normal_bias: 0.05,
        },
        Transform::from_xyz(5.0, 10.0, 5.0).looking_at(Vec3::ZERO, Vec3::Y),
    ));

    // Ambient light
    commands.insert_resource(AmbientLight {
        color: Color::srgb(0.2, 0.2, 0.3),
        brightness: 0.25,
    });

    // Point lights for atmosphere
    spawn_point_light(
        &mut commands,
        Vec3::new(5.0, 2.0, 5.0),
        Color::srgb(1.0, 0.5, 0.5),
    );
    spawn_point_light(
        &mut commands,
        Vec3::new(-5.0, 2.0, -5.0),
        Color::srgb(0.5, 0.5, 1.0),
    );
}

fn spawn_crystal_formation(
    commands: &mut Commands,
    meshes: &mut ResMut<Assets<Mesh>>,
    materials: &mut ResMut<Assets<StandardMaterial>>,
    position: Vec3,
) {
    for i in 0..5 {
        let height = (1.5 + i as f32 * 0.5) * 0.5;
        let offset = Vec3::new(
            (i as f32 * 0.3).sin() * 0.5,
            height * 0.5,
            (i as f32 * 0.4).cos() * 0.5,
        );

        let material = materials.add(StandardMaterial {
            base_color: Color::srgb(0.8, 0.8, 1.0),
            metallic: 0.9,
            perceptual_roughness: 0.1,
            emissive: Color::srgb(0.2, 0.2, 0.5).into(),
            ..default()
        });

        commands.spawn((
            Mesh3d(meshes.add(Mesh::from(Cuboid::new(0.2, height, 0.2)))),
            MeshMaterial3d(material.clone()),
            Transform::from_translation(position + offset)
                .with_rotation(Quat::from_rotation_y(i as f32 * 0.5)),
            Crystal {
                color_shift: i as f32 * 0.2,
                height,
                material,
            },
        ));
    }
}

fn spawn_platform(
    commands: &mut Commands,
    meshes: &mut ResMut<Assets<Mesh>>,
    materials: &mut ResMut<Assets<StandardMaterial>>,
    position: Vec3,
) {
    commands.spawn((
        Mesh3d(meshes.add(Mesh::from(Cuboid::new(2.0, 0.2, 2.0)))),
        MeshMaterial3d(materials.add(StandardMaterial {
            base_color: Color::srgb(0.3, 0.3, 0.4),
            metallic: 0.3,
            perceptual_roughness: 0.8,
            ..default()
        })),
        Transform::from_translation(position),
    ));
}

fn spawn_point_light(commands: &mut Commands, position: Vec3, color: Color) {
    commands.spawn((
        PointLight {
            color,
            intensity: 1000.0,
            shadows_enabled: true,
            ..default()
        },
        Transform::from_translation(position),
    ));
}

fn update_lighting(time: Res<Time>, mut query: Query<&mut DirectionalLight>) {
    for mut light in &mut query {
        light.illuminance = 8000.0 + (time.elapsed_secs().sin() * 2000.0);
    }
}

fn update_crystal_effects(
    time: Res<Time>,
    mut materials: ResMut<Assets<StandardMaterial>>,
    mut query: Query<(&Crystal, &mut Transform)>,
) {
    for (crystal, mut transform) in query.iter_mut() {
        if let Some(material) = materials.get_mut(&crystal.material) {
            let t = time.elapsed_secs() + crystal.color_shift;
            material.emissive = Color::srgb(
                (t * 0.5).sin() * 0.3 + 0.2,
                (t * 0.3).sin() * 0.3 + 0.2,
                (t * 0.7).sin() * 0.3 + 0.5,
            )
            .into();

            // Subtle crystal movement
            transform.rotation = Quat::from_rotation_y(t * 0.1 + crystal.color_shift);
            transform.translation.y = crystal.height * 0.5 + (t + crystal.color_shift).sin() * 0.05;
        }
    }
}
