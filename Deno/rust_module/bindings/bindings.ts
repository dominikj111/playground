function encode(v: string | Uint8Array): Uint8Array {
  if (typeof v !== "string") return v;
  return new TextEncoder().encode(v);
}

function decode(v: Uint8Array): string {
  return new TextDecoder().decode(v);
}

function readPointer(v: Deno.PointerObject, length: number): Uint8Array {
  const ptr = new Deno.UnsafePointerView(v);
  const lengthBe = new Uint8Array(length);
  ptr.copyInto(lengthBe);
  return lengthBe;
}

const url = new URL("../native/target/debug", import.meta.url);

let uri = url.pathname;

if (!uri.endsWith("/")) {
  uri += "/";
}

// https://docs.microsoft.com/en-us/windows/win32/api/libloaderapi/nf-libloaderapi-loadlibrarya#parameters
if (Deno.build.os === "windows") {
  uri = uri.replace(/\//g, "\\");
  // Remove leading slash
  if (uri.startsWith("\\")) {
    uri = uri.slice(1);
  }
}

const { symbols } = Deno.dlopen(
  {
    darwin: uri + "libnative.dylib",
    windows: uri + "native.dll",
    linux: uri + "libnative.so",
    freebsd: uri + "libnative.so",
    netbsd: uri + "libnative.so",
    aix: uri + "libnative.so",
    solaris: uri + "libnative.so",
    illumos: uri + "libnative.so",
  }[Deno.build.os],
  {
    current_memory_usage_as_mb: { parameters: [], result: "f32" },
    print_buffer: { parameters: [], result: "void" },
    sum: { parameters: ["usize", "usize"], result: "usize" },
    get_bombs: { parameters: ["u8"], result: "buffer" },
    concat_and_add: {
      parameters: ["buffer", "usize", "buffer", "usize", "u8"],
      result: "buffer",
    },
    return_buffer: { parameters: [], result: "pointer" },
    create_boxed_buffer: {
      parameters: [],
      result: "pointer",
    },
    create_boxed_buffer_from_vec: {
      parameters: [],
      result: "pointer",
    },
    drop_boxed_buffer: {
      parameters: ["pointer"],
      result: "void",
    },
    say_hello_cstring: {
      parameters: ["buffer", "usize"],
      result: "buffer",
    },
    say_hello_u8_bytes: {
      parameters: ["buffer", "usize"],
      result: "buffer",
    },
  }
);

export function current_memory_usage_as_mb() {
  return symbols.current_memory_usage_as_mb();
}

export function print_buffer() {
  symbols.print_buffer();
}

export function sum(a: number, b: number): number {
  return symbols.sum(a, b) as number;
}

export function get_bombs(count: number) {
  const ptr = symbols.get_bombs(count);

  if (ptr === null) {
    throw "pointer is null";
  }

  // the result string length depends on the used utf8 characters

  if (count === 0) {
    // the flower has length 4
    return decode(readPointer(ptr, 4));
  }

  // '({bomb} + {space}) * count + {5 characters}'
  return decode(readPointer(ptr, (4 + 1) * count + 5));
}

export function concat_and_add(a0: Uint8Array, a1: Uint8Array, add: number) {
  const rawResult = symbols.concat_and_add(
    a0,
    a0.byteLength,
    a1,
    a1.byteLength,
    add
  );

  if (rawResult === null) {
    throw "pointer is null";
  }

  return readPointer(rawResult, 4);
}

export function return_static_buffer() {
  const ptr = symbols.return_buffer();

  if (ptr === null) {
    throw "pointer is null";
  }

  return readPointer(ptr, 8);
}

export function get_boxed_buffer() {
  const ptr = symbols.create_boxed_buffer();

  if (ptr === null) {
    throw "pointer is null";
  }

  const result = readPointer(ptr, 8);

  return { result, pointer: ptr };
}

export function create_boxed_buffer_from_vec() {
  const ptr = symbols.create_boxed_buffer_from_vec();

  if (ptr === null) {
    throw "pointer is null";
  }

  const result = readPointer(ptr, 3);

  return { result, pointer: ptr };
}

export function drop_boxed_buffer(ptr: Deno.PointerObject) {
  symbols.drop_boxed_buffer(ptr);
}

export function say_hello_cstring(name: string): string {
  const ptr = symbols.say_hello_cstring(encode(name), name.length);

  if (ptr === null) {
    throw "pointer is null";
  }

  return decode(readPointer(ptr, 24 + name.length));
}

export function say_hello_u8_bytes(name: string): string {
  const ptr = symbols.say_hello_u8_bytes(encode(name), name.length);

  if (ptr === null) {
    throw "pointer is null";
  }

  return decode(readPointer(ptr, 24 + name.length));
}
