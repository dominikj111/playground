const fs   = require("fs");
const path = require("path");

const compiled = new WebAssembly.Module(
  fs.readFileSync(path.resolve(__dirname, "..", "build", "as_nbody.wasm"))
);

const imports = {
  env: {
    abort: (_, line, column) => {
      throw Error("abort called at " + line + ":" + column);
    }
  }
};

Object.defineProperty(module, "exports", {
  get: () => new WebAssembly.Instance(compiled, imports).exports
});
