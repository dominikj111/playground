pub mod algorithms;

fn main() {
	println!("Hello World!");

	println!("narcissistic: {}", algorithms::narcissistic(153));
	println!("duplicate_encode: {}", algorithms::duplicate_encode("recede"));
	println!("break_camelcase: {}", algorithms::break_camelcase("ahojJakSeVede!"));
	println!("product_fib: {}", if algorithms::product_fib(4895).2 { "OK" } else { "NOK" });

	let a1 = vec![121, 144, 19, 161, 19, 144, 19, 11];
	let a2 = vec![11 * 11, 121 * 121, 144 * 144, 19 * 19, 161 * 161, 19 * 19, 144 * 144, 19 * 19];
	println!("Arrays are same: {}", if algorithms::are_two_arrays_same(a1, a2) { "corrent" } else { "incorrent" });

	println!("convert_samples");
	convert_samples();
}

use std::str;

fn convert_samples() {
	// -- FROM: vec of chars --
	let src1: Vec<char> = vec!['j', '{', '"', 'i', 'm', 'm', 'y', '"', '}'];
	// to String
	let string1: String = src1.iter().collect::<String>();
	// to str
	let str1: &str = &src1.iter().collect::<String>();
	// to vec of byte
	let byte1: Vec<u8> = src1
		.iter()
		.map(|c| *c as u8)
		.collect::<Vec<_>>();
	println!("Vec<char>:{:?} | String:{:?}, str:{:?}, Vec<u8>:{:?}", src1, string1, str1, byte1);

	// -- FROM: vec of bytes --
	// in rust, this is a slice
	// b - byte, r - raw string, br - byte of raw string
	let src2: Vec<u8> = br#"e{"ddie"}"#.to_vec();
	// to String
	// from_utf8 consume the vector of bytes
	let string2: String = String::from_utf8(src2.clone()).unwrap();
	// to str
	let str2: &str = str::from_utf8(&src2).unwrap();
	// to vec of chars
	let char2: Vec<char> = src2
		.iter()
		.map(|b| *b as char)
		.collect::<Vec<_>>();
	println!("Vec<u8>:{:?} | String:{:?}, str:{:?}, Vec<char>:{:?}", src2, string2, str2, char2);

	// -- FROM: String --
	let src3: String = String::from(r#"o{"livia"}"#);
	let str3: &str = &src3;
	let char3: Vec<char> = src3.chars().collect::<Vec<_>>();
	let byte3: Vec<u8> = src3.as_bytes().to_vec();
	println!("String:{:?} | str:{:?}, Vec<char>:{:?}, Vec<u8>:{:?}", src3, str3, char3, byte3);

	// -- FROM: str --
	let src4: &str = r#"g{'race'}"#;
	let string4 = String::from(src4);
	let char4: Vec<char> = src4.chars().collect();
	let byte4: Vec<u8> = src4.as_bytes().to_vec();
	println!("str:{:?} | String:{:?}, Vec<char>:{:?}, Vec<u8>:{:?}", src4, string4, char4, byte4);
}
