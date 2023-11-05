import {
  assertEquals,
  assertGreater,
} from "https://deno.land/std@0.204.0/assert/mod.ts";

import {
  current_memory_usage_as_mb,
  sum,
  get_bombs,
  concat_and_add,
  return_static_buffer,
  get_boxed_buffer,
  create_boxed_buffer_from_vec,
  drop_boxed_buffer,
  say_hello_cstring,
  say_hello_u8_bytes,
} from "../bindings/bindings.ts";

Deno.test("Manuall memory management", () => {
  assertEquals(current_memory_usage_as_mb(), 0);

  for (let i = 0; i < 100000; i++) {
    const { pointer } = get_boxed_buffer();
    drop_boxed_buffer(pointer);
  }

  assertEquals(current_memory_usage_as_mb(), 0);

  for (let i = 0; i < 100000; i++) {
    get_boxed_buffer();
  }

  assertGreater(current_memory_usage_as_mb(), 0);
});

Deno.test("Concat and modify two arrays", () => {
  assertEquals(
    concat_and_add(new Uint8Array([8, 8]), new Uint8Array([3, 4]), 4),
    new Uint8Array([12, 12, 7, 8])
  );
});

Deno.test("Sum two numbers and return result", () => {
  assertEquals(sum(5, 2), 7);
});

Deno.test("Return CString", () => {
  assertEquals(get_bombs(0), "🌸");
  assertEquals(get_bombs(10), "💣 💣 💣 💣 💣 💣 💣 💣 💣 💣 BOOM!");
});

Deno.test("Pass, modify and return CString", () => {
  assertEquals(say_hello_cstring("YOU"), "Hello YOU in the Rust land!");
});

Deno.test("Pass, modify and return u8 bytes", () => {
  assertEquals(say_hello_u8_bytes("YOU"), "Hello YOU in the Rust land!");
});

Deno.test("Get by Rust forgotten boxed array", () => {
  assertEquals(
    get_boxed_buffer().result,
    new Uint8Array([8, 7, 6, 5, 4, 3, 2, 1])
  );
});

Deno.test("Get by Rust forgotten Vector", () => {
  assertEquals(
    create_boxed_buffer_from_vec().result,
    new Uint8Array([8, 7, 6])
  );
});

Deno.test("Get static array", () => {
  assertEquals(
    return_static_buffer(),
    new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8])
  );
});
