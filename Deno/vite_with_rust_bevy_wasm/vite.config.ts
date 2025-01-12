import { defineConfig } from "vite";
import deno from "@deno/vite-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [deno()],
  build: {
    target: "esnext",
  },
  optimizeDeps: {
    exclude: [
      "@hello-wasm/pkg/hello_wasm.js",
      "@hello-3d-shapes-wasm/pkg/hello_3d_shapes.js",
    ],
  },
});
