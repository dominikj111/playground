use rocket::fs::{relative, FileServer};
use rocket::http::{ContentType, Status};

#[macro_use]
extern crate rocket;

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

#[launch]
fn rocket() -> _ {
    rocket::build()
        .mount("/", routes![hello, json])
        .mount("/file", FileServer::from(relative!("static")))
}
