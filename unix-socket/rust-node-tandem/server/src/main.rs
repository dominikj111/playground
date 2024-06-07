use std::io::prelude::*;
use std::os::unix::net::UnixListener;
use std::sync::mpsc::{self, Receiver, Sender};
use std::thread;

const SOCKET_FILE: &str = "../tandem.sock";

fn start_unix_socket_handler(tx: Sender<String>) {
    match std::fs::remove_file(SOCKET_FILE) {
        Ok(_) => {}
        Err(_) => {}
    }

    thread::spawn(move || {
        let unix_listener = UnixListener::bind(SOCKET_FILE).unwrap();
        loop {
            let (mut unix_stream, _socket_address) = unix_listener.accept().unwrap();
            let mut message = String::new();
            unix_stream.read_to_string(&mut message).unwrap();
            tx.send(message).unwrap();
        }
    });
}

fn main() {
    let (tx, rx): (Sender<String>, Receiver<String>) = mpsc::channel();
    start_unix_socket_handler(tx);

    println!("Hello, unix socket! Listening ...");

    loop {
        if let Ok(data) = rx.try_recv() {
            println!("Received data: {:?}", data);
        }
    }
}
