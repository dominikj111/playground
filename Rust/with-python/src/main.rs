#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")] // hide console window on Windows in release

use eframe::egui;

use pyo3::prelude::*;
use pyo3::types::IntoPyDict;

fn main() -> Result<(), eframe::Error> {
    env_logger::init(); // Log to stderr (if you run with `RUST_LOG=debug`).
    let options = eframe::NativeOptions {
        viewport: egui::ViewportBuilder::default().with_inner_size([320.0, 240.0]),
        ..Default::default()
    };
    eframe::run_native(
        "My egui App",
        options,
        Box::new(|cc| {
            // This gives us image support:
            egui_extras::install_image_loaders(&cc.egui_ctx);

            Box::<MyApp>::default()
        }),
    )
}

struct MyApp {
    name: String,
    age: u32,
    python_version: String,
    user: String,
}

impl Default for MyApp {
    fn default() -> Self {
        Self {
            name: "Arthur".to_owned(),
            age: 42,
            python_version: "".to_owned(),
            user: "".to_owned(),
        }
    }
}

impl eframe::App for MyApp {
    fn update(&mut self, ctx: &egui::Context, _frame: &mut eframe::Frame) {
        egui::CentralPanel::default().show(ctx, |ui| {
            ui.heading("My egui Application");
            ui.horizontal(|ui| {
                let name_label = ui.label("Your name: ");
                ui.text_edit_singleline(&mut self.name)
                    .labelled_by(name_label.id);
            });
            ui.add(egui::Slider::new(&mut self.age, 0..=120).text("age"));
            if ui.button("Increment").clicked() {
                self.age += 1;
            }
            if ui.button("Run Python").clicked() {
                let _ = Python::with_gil(|py| -> Result<(), PyErr> {
                    let sys = py.import_bound("sys")?;
                    let version: String = sys.getattr("version")?.extract()?;

                    let locals = [("os", py.import_bound("os")?)].into_py_dict_bound(py);
                    let code = "os.getenv('USER') or os.getenv('USERNAME') or 'Unknown'";
                    let user: String = py.eval_bound(code, None, Some(&locals))?.extract()?;

                    self.python_version = version;
                    self.user = user;
                    Ok(())
                });
            }
            ui.label(format!("Hello '{}', age {}", self.name, self.age));
            ui.label(format!("Python version: {}", self.python_version));
            ui.label(format!("User: {}", self.user));

            ui.image(egui::include_image!(
                "../../../../third_party/egui/crates/egui/assets/ferris.png"
            ));
        });
    }
}
