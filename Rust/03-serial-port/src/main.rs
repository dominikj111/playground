use std::io::{ self, Write, BufWriter, BufRead, BufReader };
use std::time::Duration;

fn main() {
	let ports = serialport::available_ports().expect("No ports found!");
	for p in ports {
		println!("{}", p.port_name);
	}

	let port_name = "/dev/cu.usbserial-A9DDX36W";

	let port = serialport
		::new(port_name, 9_600)
		.timeout(Duration::from_millis(2000))
		.open()
		.expect("Failed to open port");

	let mut port = BufReader::new(port);
	let mut line_buffer = String::new();

	line_buffer.clear();
	port.read_line(&mut line_buffer).expect("Read failed!");
	print!("{}", line_buffer);

	let config = vec!["1\r\n", "4\r\n", "5\r\n", "1\r\n", "4\r\n", "1\r\n"];

	for entry in config.iter() {
		// get_mut is required because BufReader does not implement io::Write
		port.get_mut()
			// use write_all because write does not guarantee that every byte gets written
			.write_all(entry.as_bytes())
			.expect("Write failed!");

		std::thread::sleep(Duration::from_millis(1500));

		if entry.as_bytes() == "1\r\n".as_bytes() {
			line_buffer.clear();
			port.read_line(&mut line_buffer).expect("Read failed!");
			print!("{}", line_buffer);
		}
	}

	println!("End of world!");
}
