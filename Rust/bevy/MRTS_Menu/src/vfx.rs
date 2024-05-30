use bevy::core_pipeline::bloom::{BloomCompositeMode, BloomPrefilterSettings, BloomSettings};
use bevy::core_pipeline::tonemapping::Tonemapping;
use bevy::prelude::*;

/// # Camera
/// Function that returns a [`Camera2dBundle`] with specific settings
pub fn camera() -> impl Bundle {
    (
        Camera2dBundle {
            transform: Transform {
                translation: Vec3 {
                    x: 0.,
                    y: 0.,
                    z: 1000.,
                },
                ..default()
            },
            camera: Camera {
                hdr: true,
                ..default()
            },
            tonemapping: Tonemapping::None,
            ..default()
        },
        BloomSettings {
            intensity: 0.20,
            low_frequency_boost: 0.8,
            low_frequency_boost_curvature: 0.95,
            high_pass_frequency: 0.9,
            prefilter_settings: BloomPrefilterSettings {
                threshold: 0.25,
                threshold_softness: 0.1,
            },
            composite_mode: BloomCompositeMode::Additive,
        },
    )
}
