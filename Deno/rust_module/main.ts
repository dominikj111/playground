import { print_buffer } from "./bindings/bindings.ts";

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  console.log("Next will print in native");
  // it will print utf8 buffer "😍ab" into the console
  print_buffer();
}
