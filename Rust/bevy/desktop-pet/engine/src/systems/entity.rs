use bevy::prelude::*;
use common::components::*;

pub struct PrismPlugin;

impl Plugin for PrismPlugin {
    fn build(&self, app: &mut App) {
        app.add_systems(Startup, spawn_character).add_systems(
            Update,
            (move_character, update_character_effects, animate_character),
        );
    }
}

#[derive(Component)]
pub struct Character {
    pub speed: f32,
    pub is_moving: bool,
}

#[derive(Component)]
struct BodyPart {
    part_type: BodyPartType,
    offset: Vec3,
    base_rotation: Quat,
}

#[derive(PartialEq)]
enum BodyPartType {
    Head,
    Torso,
    LeftArm,
    RightArm,
    LeftLeg,
    RightLeg,
}

fn spawn_character(
    mut commands: Commands,
    mut meshes: ResMut<Assets<Mesh>>,
    mut materials: ResMut<Assets<StandardMaterial>>,
) {
    // Create the character root entity
    let character = commands
        .spawn((
            Transform::from_xyz(0.0, 1.0, 0.0),
            Character {
                speed: 5.0,
                is_moving: false,
            },
            TimeControl { scale: 1.0 },
            LightInteractive {
                reflection_factor: 1.0,
            },
        ))
        .id();

    // Torso
    let torso = spawn_body_part(
        &mut commands,
        &mut meshes,
        &mut materials,
        BodyPartType::Torso,
        Vec3::new(0.4, 0.6, 0.3),
        Vec3::ZERO,
        Color::srgb(0.6, 0.6, 0.8),
    );
    commands.entity(character).push_children(&[torso]);

    // Head
    let head = spawn_body_part(
        &mut commands,
        &mut meshes,
        &mut materials,
        BodyPartType::Head,
        Vec3::new(0.25, 0.25, 0.25),
        Vec3::new(0.0, 0.5, 0.0),
        Color::srgb(0.8, 0.8, 1.0),
    );
    commands.entity(torso).push_children(&[head]);

    // Arms
    let left_arm = spawn_body_part(
        &mut commands,
        &mut meshes,
        &mut materials,
        BodyPartType::LeftArm,
        Vec3::new(0.15, 0.4, 0.15),
        Vec3::new(-0.3, 0.1, 0.0),
        Color::srgb(0.5, 0.5, 0.7),
    );
    let right_arm = spawn_body_part(
        &mut commands,
        &mut meshes,
        &mut materials,
        BodyPartType::RightArm,
        Vec3::new(0.15, 0.4, 0.15),
        Vec3::new(0.3, 0.1, 0.0),
        Color::srgb(0.5, 0.5, 0.7),
    );
    commands.entity(torso).push_children(&[left_arm, right_arm]);

    // Legs
    let left_leg = spawn_body_part(
        &mut commands,
        &mut meshes,
        &mut materials,
        BodyPartType::LeftLeg,
        Vec3::new(0.2, 0.5, 0.2),
        Vec3::new(-0.15, -0.5, 0.0),
        Color::srgb(0.4, 0.4, 0.6),
    );
    let right_leg = spawn_body_part(
        &mut commands,
        &mut meshes,
        &mut materials,
        BodyPartType::RightLeg,
        Vec3::new(0.2, 0.5, 0.2),
        Vec3::new(0.15, -0.5, 0.0),
        Color::srgb(0.4, 0.4, 0.6),
    );
    commands.entity(torso).push_children(&[left_leg, right_leg]);
}

fn spawn_body_part(
    commands: &mut Commands,
    meshes: &mut ResMut<Assets<Mesh>>,
    materials: &mut ResMut<Assets<StandardMaterial>>,
    part_type: BodyPartType,
    size: Vec3,
    offset: Vec3,
    color: Color,
) -> Entity {
    commands
        .spawn((
            Mesh3d(meshes.add(Mesh::from(Cuboid::new(size.x, size.y, size.z)))),
            MeshMaterial3d(materials.add(StandardMaterial {
                base_color: color,
                metallic: 0.2,
                perceptual_roughness: 0.3,
                ..default()
            })),
            Transform::from_translation(offset),
            BodyPart {
                part_type,
                offset,
                base_rotation: Quat::IDENTITY,
            },
        ))
        .id()
}

fn move_character(
    time: Res<Time>,
    keyboard: Res<ButtonInput<KeyCode>>,
    mut query: Query<(&mut Transform, &mut Character)>,
) {
    for (mut transform, mut character) in query.iter_mut() {
        let mut direction = Vec3::ZERO;

        if keyboard.pressed(KeyCode::ArrowLeft) {
            direction.x -= 1.0;
        }
        if keyboard.pressed(KeyCode::ArrowRight) {
            direction.x += 1.0;
        }
        if keyboard.pressed(KeyCode::ArrowUp) {
            direction.z -= 1.0;
        }
        if keyboard.pressed(KeyCode::ArrowDown) {
            direction.z += 1.0;
        }

        character.is_moving = direction != Vec3::ZERO;

        if character.is_moving {
            transform.translation += direction.normalize() * character.speed * time.delta_secs();
            // Rotate character to face movement direction
            let target_rotation = if direction != Vec3::ZERO {
                Quat::from_rotation_y(-direction.z.atan2(direction.x))
            } else {
                transform.rotation
            };
            transform.rotation = transform.rotation.slerp(target_rotation, 0.2);
        }
    }
}

fn animate_character(
    time: Res<Time>,
    character_query: Query<(&Character, &Children)>,
    mut body_parts_query: Query<(&BodyPart, &mut Transform)>,
) {
    for (character, children) in character_query.iter() {
        let animation_speed = if character.is_moving { 5.0 } else { 2.0 };
        let t = time.elapsed_secs() * animation_speed;

        for child in children.iter() {
            if let Ok((body_part, mut transform)) = body_parts_query.get_mut(*child) {
                match body_part.part_type {
                    BodyPartType::Head => {
                        // Gentle head bob
                        transform.rotation = Quat::from_euler(
                            EulerRot::XYZ,
                            (t * 0.5).sin() * 0.1,
                            (t * 0.3).sin() * 0.1,
                            0.0,
                        );
                    }
                    BodyPartType::LeftArm | BodyPartType::RightArm => {
                        // Arm swing
                        let swing = if character.is_moving {
                            (t + if body_part.part_type == BodyPartType::LeftArm {
                                0.0
                            } else {
                                std::f32::consts::PI
                            })
                            .sin()
                                * 0.5
                        } else {
                            (t * 0.5).sin() * 0.1
                        };
                        transform.rotation = Quat::from_rotation_x(swing);
                    }
                    BodyPartType::LeftLeg | BodyPartType::RightLeg => {
                        // Leg movement
                        if character.is_moving {
                            let swing = (t + if body_part.part_type == BodyPartType::LeftLeg {
                                0.0
                            } else {
                                std::f32::consts::PI
                            })
                            .sin()
                                * 0.5;
                            transform.rotation = Quat::from_rotation_x(swing);
                        } else {
                            transform.rotation = Quat::IDENTITY;
                        }
                    }
                    _ => {}
                }
            }
        }
    }
}

fn update_character_effects(time: Res<Time>, mut query: Query<&mut Transform, With<Character>>) {
    for mut transform in query.iter_mut() {
        // Add subtle floating effect
        transform.translation.y = 1.0 + (time.elapsed_secs() * 2.0).sin() * 0.05;
    }
}
