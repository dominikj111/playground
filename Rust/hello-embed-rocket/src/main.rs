use rocket::fs::{relative, FileServer};
use rocket::http::{ContentType, Status};

#[macro_use]
extern crate rocket;

use std::borrow::Cow;
use std::ffi::OsStr;
use std::path::PathBuf;

use rust_embed::RustEmbed;

#[derive(RustEmbed)]
#[folder = "static/"]
struct Asset;

#[get("/hello")]
fn hello() -> &'static str {
    "Hello, world!"
}

#[get("/json")]
fn json() -> (Status, (ContentType, &'static str)) {
    (
        Status::ImATeapot,
        (ContentType::JSON, "{ \"hi\": \"world\" }"),
    )
}

#[get("/file/<file..>")]
fn file(file: PathBuf) -> Option<(ContentType, Cow<'static, [u8]>)> {
    let filename = file.display().to_string();
    let asset = Asset::get(&filename)?;
    let content_type = file
        .extension()
        .and_then(OsStr::to_str)
        .and_then(ContentType::from_extension)
        .unwrap_or(ContentType::Bytes);

    Some((content_type, asset.data))
}

#[launch]
fn rocket() -> _ {
    rocket::build().mount("/", routes![hello, json, file])
    // .mount("/file", FileServer::from(relative!("static")))
}
