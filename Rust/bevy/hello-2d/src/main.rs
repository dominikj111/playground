pub mod utils;
use utils::greetings::you_are_the_best;
use bevy::{ prelude::*, sprite::MaterialMesh2dBundle };

fn main() {
	println!("4 + 2 = {}", utils::add_two(4));
	println!("Hello, world! {}", you_are_the_best("Dominik"));

	// App::new().run();
	// App::new().add_plugins(DefaultPlugins).run();

	App::new().add_plugins(DefaultPlugins).add_systems(Startup, setup).run();
}

fn setup(mut commands: Commands, mut meshes: ResMut<Assets<Mesh>>, mut materials: ResMut<Assets<ColorMaterial>>) {
	commands.spawn(Camera2dBundle::default());

	// Circle
	commands.spawn(MaterialMesh2dBundle {
		mesh: meshes.add(shape::Circle::new(50.0).into()).into(),
		material: materials.add(ColorMaterial::from(Color::PURPLE)),
		transform: Transform::from_translation(Vec3::new(-150.0, 0.0, 0.0)),
		..default()
	});

	// Rectangle
	commands.spawn(SpriteBundle {
		sprite: Sprite {
			color: Color::rgb(0.25, 0.25, 0.75),
			custom_size: Some(Vec2::new(50.0, 100.0)),
			..default()
		},
		transform: Transform::from_translation(Vec3::new(-50.0, 0.0, 0.0)),
		..default()
	});

	// Quad
	commands.spawn(MaterialMesh2dBundle {
		mesh: meshes.add(shape::Quad::new(Vec2::new(50.0, 100.0)).into()).into(),
		material: materials.add(ColorMaterial::from(Color::LIME_GREEN)),
		transform: Transform::from_translation(Vec3::new(50.0, 0.0, 0.0)),
		..default()
	});

	// Hexagon
	commands.spawn(MaterialMesh2dBundle {
		mesh: meshes.add(shape::RegularPolygon::new(50.0, 6).into()).into(),
		material: materials.add(ColorMaterial::from(Color::TURQUOISE)),
		transform: Transform::from_translation(Vec3::new(150.0, 0.0, 0.0)),
		..default()
	});
}