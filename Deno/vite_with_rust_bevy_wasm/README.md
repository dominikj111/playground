# Deno + Vite + Rust/WASM Project

This project is a Proof of Concept (POC) demonstrating the integration of Deno and Vite.js for frontend development, combined with Rust/WebAssembly components. The project showcases how to build and integrate Rust applications into a web environment using WebAssembly.

## Project Structure

The project consists of two main Rust subprojects:

1. `hello-wasm`: A simple Rust library that compiles to WebAssembly and demonstrates basic JavaScript interop by triggering an alert function.

2. `hello-3d-shapes-wasm`: A Rust/Bevy application that can be:
   - Run standalone using `cargo run`
   - Compiled to WebAssembly for browser rendering

## Prerequisites

- Deno
- Rust
- wasm-pack
- Cargo

## Building and Running

### 1. Build WebAssembly Components

First, build the WebAssembly modules:

```bash
# Build hello-wasm
(cd hello-3d-shapes-wasm && wasm-pack build --target web)

# Build hello-3d-shapes-wasm
(cd hello-wasm && wasm-pack build --target web)
```

### 2. Copy WASM Files to Public Directory

The WebAssembly files need to be accessible from the browser:

```bash
cp hello-wasm/pkg/hello_wasm_bg.wasm public
cp hello-3d-shapes-wasm/pkg/hello_3d_shapes_bg.wasm public
```

### 3. Run Development Server

Start the development server:

```bash
deno run dev
```

This will serve the site featuring:
- A canvas-rendered Bevy application
- WebAssembly-powered alert functionality

## Features

- Frontend built with Deno and Vite.js
- Rust to WebAssembly compilation
- Bevy game engine integration
- Browser-based 3D rendering
- JavaScript-Rust interoperability

## Development

The project uses:
- Vite.js for frontend tooling
- Deno for JavaScript/TypeScript runtime
- Rust/Bevy for 3D graphics
- WebAssembly for running Rust code in the browser

## Project Structure

```
project/
├── src/                  # Frontend source code
├── public/              # Public assets and WASM files
├── hello-wasm/         # Simple Rust WASM demo
├── hello-3d-shapes-wasm/ # Bevy-based 3D application
├── index.html          # Entry point
└── vite.config.ts      # Vite configuration
```

(cd hello-3d-shapes-wasm && wasm-pack build --target web) && (cd hello-wasm && wasm-pack build --target web) && cp hello-wasm/pkg/hello_wasm_bg.wasm public && cp hello-3d-shapes-wasm/pkg/hello_3d_shapes_bg.wasm public && deno run dev