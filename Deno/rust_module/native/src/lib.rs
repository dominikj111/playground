use peak_alloc::PeakAlloc;
use std::ffi::{c_char, CString};

#[global_allocator]
static PEAK_ALLOC: PeakAlloc = PeakAlloc;

#[no_mangle]
pub extern "C" fn current_memory_usage_as_mb() -> f32 {
    PEAK_ALLOC.current_usage_as_mb()
}

// "😍ab"
static UTFHELLO: [u8; 6] = [0xF0, 0x9F, 0x98, 0x8D, 0x61, 0x62];

#[no_mangle]
pub extern "C" fn print_buffer() {
    let buffer_str = std::str::from_utf8(&UTFHELLO).unwrap();
    println!("{}", buffer_str);
}

#[no_mangle]
pub extern "C" fn sum(a: usize, b: usize) -> usize {
    a + b
}

#[no_mangle]
pub extern "C" fn get_bombs(length: u8) -> *mut c_char {
    if length == 0 {
        return CString::new("🌸").unwrap().into_raw();
    }

    let mut result = "💣 ".repeat(length as usize);
    result.push_str("BOOM!");

    CString::new(result).unwrap().into_raw()
}

#[no_mangle]
pub extern "C" fn concat_and_add(
    a: *mut u8,
    a_length: usize,
    b: *mut u8,
    b_length: usize,
    add: u8,
) -> *mut c_char {
    let a = unsafe { std::slice::from_raw_parts(a, a_length) };
    let b = unsafe { std::slice::from_raw_parts(b, b_length) };
    let mut result = [a, b].concat();
    result.iter_mut().for_each(|x| *x += add);
    CString::new(result).unwrap().into_raw()
}

static BUFFER: [u8; 8] = [1, 2, 3, 4, 5, 6, 7, 8];

#[no_mangle]
pub extern "C" fn return_buffer() -> *const u8 {
    BUFFER.as_ptr()
}

#[no_mangle]
pub extern "C" fn create_boxed_buffer() -> *const u8 {
    let result = Box::new([8, 7, 6, 5, 4, 3, 2, 1]);
    let ptr = result.as_ptr();
    // `result` will not be dropped automatically
    ::std::mem::forget(result);
    ptr
}

#[no_mangle]
pub extern "C" fn create_boxed_buffer_from_vec() -> *const u8 {
    let result = [8, 7, 6].to_vec();
    let ptr = result.as_ptr();
    // `result` will not be dropped automatically
    ::std::mem::forget(result);
    ptr
}

#[no_mangle]
pub extern "C" fn drop_boxed_buffer(ptr: *mut [u8; 8]) {
    unsafe {
        let boxed = Box::from_raw(ptr);

        // println!("{:?}", boxed); // -> [8, 7, 6, 5, 4, 3, 2, 1]

        // Not necessary since it would get dropped anyway at the end of the function,
        // but it makes the intent more explicit
        ::std::mem::drop(boxed);
    }
}

#[no_mangle]
pub extern "C" fn say_hello_u8_bytes(name: *mut u8, len: usize) -> *const u8 {
    let slice = unsafe { std::slice::from_raw_parts(name, len) };
    let str_name = std::str::from_utf8(slice).unwrap(); // Convert byte slice to string
    let result = format!("Hello {} in the Rust land!", str_name);
    let ptr = result.as_bytes().as_ptr();
    // `result` will not be dropped automatically
    ::std::mem::forget(result);
    ptr
}

#[no_mangle]
pub extern "C" fn say_hello_cstring(name: *mut u8, len: usize) -> *mut c_char {
    let slice = unsafe { std::slice::from_raw_parts(name, len) };
    let str_name = std::str::from_utf8(slice).unwrap(); // Convert byte slice to string
    CString::new(format!("Hello {} in the Rust land!", str_name))
        .unwrap()
        .into_raw()
}
